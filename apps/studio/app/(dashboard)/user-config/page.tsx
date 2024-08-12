"use client";

import { useEffect, useState } from "react";
import { encryptApiKey } from "@hubble/crypto/encryptApiKey";
import axios from "axios";
import { ModelItem } from "@hubble/ui/ModelItem";
import { saveAPIKey } from "@hubble/actions/saveAPIKey";
import { checkAddedKeys } from "@hubble/actions/checkAddedKeys";
import { Loader } from "@hubble/ui/Loader";

export default function Page() {
    const [input, setInput] = useState("");
    const [userKeys, setUserKeys] = useState([{}]);
    const [keyDidUpdate, setKeyDidUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saveButtonVisible, setSaveButtonVisible] = useState(false);
    const [model, setModel] = useState("Gemini");
    const [usableModels, setUsableModels] = useState([{}]);

    async function savedKeys() {
        const savedKeys = await checkAddedKeys();
        setUserKeys(savedKeys);
    }

    async function checkAPIKey(apiKey: string) {
        const urlModel = model === "Gemini" ? "gemini" : "getimgai";
        const res = await axios({
            url: `http://localhost:3301/api/v1/${urlModel}/check`,
            method: "POST",
            data: {
                query: {
                    API_KEY: apiKey,
                },
            },
        });

        return res.data;
    }

    useEffect(() => {
        // Make this entire page do SSR, then no need for this use effect
        savedKeys();
        setKeyDidUpdate(false);
    }, [keyDidUpdate]);

    return (
        <div>
            <div>Your API Keys Linked With This Account:</div>
            <div>{JSON.stringify(userKeys.map((e: any) => e.platform))}</div>
            <label>
                Add Your API Key for Model:
                <select
                    className="m-7"
                    value={model}
                    onChange={(e) => {
                        setModel(e.target.value);
                        setSaveButtonVisible(false);
                    }}
                >
                    <option value="Gemini">Gemini</option>
                    <option value="GetImgAI">GetImg.AI</option>
                </select>
            </label>{" "}
            <br />
            <input
                className="m-7"
                value={input}
                type="text"
                placeholder="API KEY"
                onChange={(e) => {
                    setInput(e.target.value);
                    setSaveButtonVisible(false);
                }}
            ></input>
            <button
                className="m-7"
                onClick={async () => {
                    setLoading(true);
                    const res = await checkAPIKey(input);
                    setLoading(false);
                    if (!res.success) {
                        alert("Invalid API Key!");
                        setSaveButtonVisible(false);
                    } else if (model === "Gemini") {
                        setUsableModels(res.response.models);
                        setSaveButtonVisible(true);
                    } else {
                        setUsableModels(res.response);
                        setSaveButtonVisible(true);
                    }
                }}
            >
                Check
            </button>
            {saveButtonVisible ? (
                <button
                    className="m-7"
                    onClick={async () => {
                        const encryptedCode = encryptApiKey(input);
                        setLoading(true);
                        type ModelPlatform = "Gemini" | "GetImgAI";
                        const modelPlatform = model as ModelPlatform; // telling model is type ModelPlatform
                        const res = await saveAPIKey(
                            encryptedCode,
                            modelPlatform,
                        );
                        setLoading(false);
                        if (!res) alert("Some Error Occured!");
                        else {
                            setKeyDidUpdate(true);
                            alert("API Key Saved Successfully!");
                        }
                    }}
                >
                    Save
                </button>
            ) : (
                ""
            )}
            <br />
            <br />
            {`Your Available Models For Current API Key: `}
            {saveButtonVisible
                ? usableModels.map((e: any, index) => (
                      <ModelItem
                          key={index}
                          displayName={
                              model === "Gemini" ? e.displayName : e.name
                          }
                          description={
                              model === "Gemini" ? e.description : e.family
                          }
                      />
                  ))
                : ""}
            {loading ? <Loader /> : ""}
        </div>
    );
}

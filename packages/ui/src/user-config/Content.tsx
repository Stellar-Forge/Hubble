/* eslint-disable no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { encryptApiKey } from "@hubble/crypto/crypto";
import axios from "axios";
import { ModelItem } from "@hubble/ui/ModelItem";
import { saveAPIKey } from "@hubble/actions/saveAPIKey";
import { checkAddedKeys } from "@hubble/actions/checkAddedKeys";
import { Loader } from "@hubble/ui/Loader";
import { toast } from "sonner";

export function Content() {
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

    // Define the API_Platform enum locally
    enum API_Platform {
        Google = "Google",
        OpenAI = "OpenAI",
        GetImgAI = "GetImgAI",
    }

    function mapPlatform(platform: string): API_Platform {
        if (platform === "Gemini") return API_Platform.Google;
        return API_Platform.GetImgAI;
    }

    useEffect(() => {
        // Make this entire page do SSR, then no need for this use effect
        savedKeys();
        setKeyDidUpdate(false);
    }, [keyDidUpdate]);

    const platform = mapPlatform(model);

    return (
        <div className="flex flex-col grow justify-center items-center">
            <label className="m-3">
                <h1 className="text-6xl font-bold drop-shadow-[2px_2px_1px_rgba(0,0,0,0.45)] transition hover:drop-shadow-[10px_10px_5px_rgba(0,0,0,0.45)] ease-out duration-500">
                    Add Your API Keys
                </h1>
            </label>
            <div className="m-5 w-full flex justify-center items-center">
                <select
                    className="border-2 border-black p-2 rounded-lg"
                    value={model}
                    onChange={(e) => {
                        setModel(e.target.value);
                        setSaveButtonVisible(false);
                    }}
                >
                    <option value="Gemini">Gemini</option>
                    <option value="GetImgAI">GetImg.AI</option>
                </select>
                <input
                    className="m-3 border-2 border-black p-2 rounded-lg w-1/2"
                    value={input}
                    type="text"
                    placeholder="API KEY"
                    onChange={(e) => {
                        setInput(e.target.value);
                        setSaveButtonVisible(false);
                    }}
                />
                <button
                    className="border-2 border-black p-2 rounded-lg"
                    onClick={async () => {
                        const isEmpty = (value: string) =>
                            value.trim().length === 0;
                        if (isEmpty(input)) toast.error("No API Key Entered!");
                        else {
                            setLoading(true);
                            const res = await checkAPIKey(input);
                            setLoading(false);
                            if (!res.success) {
                                toast.error("Invalid API Key!");
                                setSaveButtonVisible(false);
                            } else if (model === "Gemini") {
                                setUsableModels(res.response.models);
                                setSaveButtonVisible(true);
                            } else {
                                setUsableModels(res.response);
                                setSaveButtonVisible(true);
                            }
                        }
                    }}
                >
                    Check
                </button>
                {saveButtonVisible ? (
                    <button
                        className="ml-3 border-2 border-black p-2 rounded-lg"
                        onClick={async () => {
                            const isAlreadySaved = userKeys.some(
                                (e: any) => e.platform === platform,
                            );
                            if (isAlreadySaved)
                                toast.error(
                                    `You Have Already Saved An API Key For ${model}, Delete It First To Save A New API Key!`,
                                );
                            else {
                                const encryptedCode = encryptApiKey(input);
                                setLoading(true);
                                type ModelPlatform = "Gemini" | "GetImgAI";
                                const modelPlatform = model as ModelPlatform; // telling model is type ModelPlatform
                                const res = await saveAPIKey(
                                    encryptedCode,
                                    modelPlatform,
                                );
                                setLoading(false);
                                if (!res) toast.error("Some Error Occured!");
                                else {
                                    setKeyDidUpdate(true);
                                    toast.success(
                                        "API Key Saved Successfully!",
                                    );
                                }
                            }
                        }}
                    >
                        Save
                    </button>
                ) : (
                    ""
                )}
            </div>
            <div>Connected API Keys - </div>
            <div>{JSON.stringify(userKeys.map((e: any) => e.platform))}</div>
            {`Your Available Models For Current API Key: `}
            {saveButtonVisible
                ? usableModels.map((e: any, index) => (
                      <ModelItem
                          key={index}
                          displayName={
                              model === "Gemini" ? e.displayName : e.name
                          }
                      />
                  ))
                : ""}
            {loading ? <Loader /> : ""}
        </div>
    );
}

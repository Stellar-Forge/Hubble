/* eslint-disable no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { encryptApiKey } from "@hubble/crypto/crypto";
import axios from "axios";
import { saveAPIKey, deleteAPIKey } from "@hubble/actions/manageAPIKeys";
import { getSavedKeys } from "@hubble/actions/retrieveAPI";
import { LoadingAlert } from "@hubble/ui/Loader";
import { toast } from "sonner";
import { PlatformButton } from "./PlatformButton";

export function Content() {
    const [input, setInput] = useState("");
    const [userKeys, setUserKeys] = useState([{}]);
    const [keyDidUpdate, setKeyDidUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [saveButtonVisible, setSaveButtonVisible] = useState(false);
    const [model, setModel] = useState("Gemini");
    const [usableModels, setUsableModels] = useState([{}]);

    async function retrieveUserApiKeys() {
        const savedKeys = await getSavedKeys();
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
        retrieveUserApiKeys();
        setKeyDidUpdate(false);
    }, [keyDidUpdate]);

    const platform = mapPlatform(model);
    LoadingAlert(isLoading);

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
                            setIsLoading(true);
                            const res = await checkAPIKey(input);
                            setIsLoading(false);
                            if (!res.success) {
                                toast.error("Invalid API Key!");
                                setSaveButtonVisible(false);
                            } else if (model === "Gemini") {
                                setUsableModels(res.response.models);
                                setSaveButtonVisible(true);
                                toast.success("API Key Verified!");
                            } else {
                                setUsableModels(res.response);
                                setSaveButtonVisible(true);
                                toast.success("API Key Verified!");
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
                                    `You Have Already Saved An API Key For ${platform}, Delete It First To Save A New API Key!`,
                                );
                            else {
                                const encryptedCode = encryptApiKey(input);
                                setIsLoading(true);
                                type ModelPlatform = "Gemini" | "GetImgAI";
                                const modelPlatform = model as ModelPlatform; // telling model is type ModelPlatform
                                const res = await saveAPIKey(
                                    encryptedCode,
                                    modelPlatform,
                                );
                                setIsLoading(false);
                                if (!res) toast.error("Some Error Occured!");
                                else {
                                    setKeyDidUpdate(true);
                                    toast.success(
                                        "API Key Saved Successfully!",
                                    );
                                    await retrieveUserApiKeys();
                                    setSaveButtonVisible(false);
                                    setInput("");
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
            <div>
                {userKeys.map((e: any, index: any) => (
                    <PlatformButton
                        key={index}
                        platform={e.platform}
                        apiKey={e.API_Key}
                        deleteAPIKey={deleteAPIKey}
                        savedKeys={retrieveUserApiKeys}
                    />
                ))}
            </div>
        </div>
    );
}

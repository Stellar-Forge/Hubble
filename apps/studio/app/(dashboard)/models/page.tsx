"use client";

import { ModelItem } from "@hubble/ui/ModelItem";
import { useState } from "react";
import { getModelsInfo } from "@hubble/actions/retrieveAPI";
import { LoadingAlert } from "@hubble/ui/Loader";
import { toast } from "sonner";

export default function Models() {
    const [usableModels, setUsableModels] = useState([{}]);
    const [isLoading, setIsLoading] = useState(false);
    const [model, setModel] = useState("Gemini");

    LoadingAlert(isLoading, "Fetching Info...");

    return (
        <div>
            <div className="m-5 w-full flex justify-center items-center">
                <select
                    className="border-2 border-black p-2 rounded-lg"
                    value={model}
                    onChange={(e) => {
                        setModel(e.target.value);
                        setUsableModels([]);
                    }}
                >
                    <option value="Gemini">Gemini</option>
                    <option value="GetImgAI">GetImg.AI</option>
                </select>
                <button
                    onClick={async () => {
                        setIsLoading(true);
                        const res: any = await getModelsInfo(model);
                        setIsLoading(false);
                        console.log("Response Recieved Nigga: ", res);
                        if (!res.success) {
                            toast.error("Could Not Fetch Data!");
                        } else if (model === "Gemini") {
                            setUsableModels(res.response.models);
                            toast.success("Data Fetched!");
                        } else {
                            setUsableModels(res.response);
                            toast.success("Data Fetched!");
                        }
                    }}
                >
                    Fetch Info
                </button>
            </div>
            <div>
                {
                    <>
                        Your Available Models For Current API Key:
                        {usableModels.map((e: any, index) => (
                            <ModelItem
                                key={index}
                                displayName={
                                    model === "Gemini" ? e.displayName : e.name
                                }
                                description={e.description}
                            />
                        ))}
                    </>
                }
            </div>
        </div>
    );
}

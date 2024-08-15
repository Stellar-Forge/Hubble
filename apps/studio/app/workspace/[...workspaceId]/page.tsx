"use client";

import { useUpdateSelectedModel } from "@hubble/store/useUpdateSelectedModel";
import { useSelectedModel } from "@hubble/store/useSelectedModel";
import { ImageModel } from "./(models)/ImageModel";
import { TextModel } from "./(models)/TextModel";

export default function Page({ params }: any) {
    const _workspaceId = Number(params.workspaceId[0]);
    const workspaceId = _workspaceId - 1;

    const updateSelectedModel = useUpdateSelectedModel();
    const currentModel = useSelectedModel(workspaceId);

    const handleChange = (e: any) => {
        updateSelectedModel(e.target.value, workspaceId);
    };

    return (
        <div>
            <label>
                Model:
                <select value={currentModel} onChange={handleChange}>
                    <option value="Gemini">Gemini</option>
                    <option value="GetImgAI">GetIMG.AI</option>
                </select>
            </label>
            <p>You are currently using: {currentModel}</p>
            <br />
            {currentModel === "Gemini" ? (
                <TextModel params={params} />
            ) : (
                <ImageModel params={params} />
            )}
        </div>
    );
}

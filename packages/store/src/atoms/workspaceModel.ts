import { atom } from "recoil";

enum WorkspaceModel {
    Gemini,
    GetImgAI,
}

export const workspaceModel = atom({
    key: "workspaceModel",
    default: ["Gemini", "Gemini", "Gemini"],
});

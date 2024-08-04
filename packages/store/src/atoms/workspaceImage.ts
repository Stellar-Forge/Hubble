import { atom } from "recoil";

// stores b64 string in these 3 workspaces
export const workspaceImage = atom({
    key: "workspaceImage",
    default: ["", "", ""]
})
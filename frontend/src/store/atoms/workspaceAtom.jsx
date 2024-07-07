import { atom, selector } from "recoil";
import { selectedModelAtom } from "./selectedModelAtom";

let Workspaces = [{},{},{}]

export const currentWorkspaceAtom = atom({
    key: "currentWorkspaceAtom",
    default: 1
})

export const outputAtom = atom({
    key: "outputAtom",
    default: ""
})

export const workspaceSelector = selector({
    key: "workspaceSelector",
    get: ({get}) => {
        const currentOutput = get(outputAtom)
        const currentModel = get(selectedModelAtom)
        const currentWorkspace = get(currentWorkspaceAtom)
        Workspaces[currentWorkspace] = {
            model: currentModel,
            output: currentOutput
        }
        return Workspaces
    }
})
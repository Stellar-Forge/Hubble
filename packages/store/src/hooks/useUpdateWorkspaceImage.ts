import { useSetRecoilState } from "recoil";
import { workspaceImage } from "../atoms/workspaceImage";

export function useUpdateWorkspaceImage() {
    const setWorkspaceImage = useSetRecoilState(workspaceImage)

    function update(b64string: string, workspaceId: number) {
        setWorkspaceImage((currentWorkspace) => {
            let newWorkspaceImage = [...currentWorkspace]
            newWorkspaceImage[workspaceId] = b64string
            return newWorkspaceImage
        }) 
    }

    return update
}

export function useClearWorkspaceImage() {
    const setWorkspaceImage = useSetRecoilState(workspaceImage)

    function clear(workspaceId: number) {
        setWorkspaceImage((currentWorkspace) => {
            let newWorkspaceImage = [...currentWorkspace]
            newWorkspaceImage[workspaceId] = ""
            return newWorkspaceImage
        }) 
    }

    return clear
}
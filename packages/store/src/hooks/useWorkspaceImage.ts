import { useRecoilValue } from "recoil";
import { workspaceImage } from "../atoms/workspaceImage";

export function useWorkspaceImage() {
    const WorkspaceImage = useRecoilValue(workspaceImage)
    return WorkspaceImage
}
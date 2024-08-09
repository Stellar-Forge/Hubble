import { useRecoilValue } from "recoil";
import { workspaceModel } from "../atoms/workspaceModel";

export function useSelectedModel(workspaceId: number) {
    const currentModel = useRecoilValue(workspaceModel)
    return currentModel[workspaceId]
}
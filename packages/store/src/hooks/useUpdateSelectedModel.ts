import { useSetRecoilState } from "recoil";
import { workspaceModel } from "../atoms/workspaceModel";

export function useUpdateSelectedModel() {
    const setWorkspaceModel = useSetRecoilState(workspaceModel)

    function update(newModel: string, workspaceId: number) {
        setWorkspaceModel((currentWorkspaceModel) => {
            let newWorkspaceModel = [...currentWorkspaceModel]
            newWorkspaceModel[workspaceId] = newModel
            return newWorkspaceModel
        })
    }
    
    return update
}
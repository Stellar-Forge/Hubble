import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { workspaceAtom } from "../atoms/workspace";

export function useUpdateWorkspace() {
    const setWorkspace = useSetRecoilState(workspaceAtom)
    // const workspace = useRecoilValue(workspaceAtom)

    function update(workspaceId: number, output: string) {
        // using workspace useRecoilvalue
        // let WorkspaceArr : string[][] = [...workspace]
        // let SubWorkspaceArr : any  = WorkspaceArr[workspaceId]
        // let newSubWorkspaceArr = [...SubWorkspaceArr, output]
        // WorkspaceArr[workspaceId] = newSubWorkspaceArr
        // setWorkspace(WorkspaceArr)

        setWorkspace((workspace) => {
            let WorkspaceArr : string[][] = [...workspace]
            let SubWorkspaceArr : any  = WorkspaceArr[workspaceId]
            let newSubWorkspaceArr = [...SubWorkspaceArr, output]
            WorkspaceArr[workspaceId] = newSubWorkspaceArr
    
            return WorkspaceArr
        })
    
    }

    return update
}
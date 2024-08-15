import { useSetRecoilState } from "recoil";
import { workspaceAtom } from "../atoms/workspace";

export function useUpdateWorkspace() {
    const setWorkspace = useSetRecoilState(workspaceAtom);
    // const workspace = useRecoilValue(workspaceAtom)

    function update(workspaceId: number, output: string) {
        // using workspace useRecoilvalue
        // let WorkspaceArr : string[][] = [...workspace]
        // let SubWorkspaceArr : any  = WorkspaceArr[workspaceId]
        // let newSubWorkspaceArr = [...SubWorkspaceArr, output]
        // WorkspaceArr[workspaceId] = newSubWorkspaceArr
        // setWorkspace(WorkspaceArr)

        setWorkspace((workspace) => {
            let WorkspaceArr: string[][] = [...workspace];
            let SubWorkspaceArr: any = WorkspaceArr[workspaceId];
            let newSubWorkspaceArr = [...SubWorkspaceArr, output];
            WorkspaceArr[workspaceId] = newSubWorkspaceArr;

            return WorkspaceArr;
        });
    }

    return update;
}

export function useClearHistory() {
    const setWorkspace = useSetRecoilState(workspaceAtom);

    function clearWorkspace(workspaceId: number) {
        setWorkspace((workspace) => {
            let clearedWorkspace = [...workspace];
            clearedWorkspace[workspaceId] = [];
            return clearedWorkspace;
        });
    }

    return clearWorkspace;
}

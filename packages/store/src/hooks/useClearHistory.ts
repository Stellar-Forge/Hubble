"use client"

import { useSetRecoilState } from "recoil"
import { workspaceAtom } from "../atoms/workspace"

export function useClearHistory () {
    const setWorkspace = useSetRecoilState(workspaceAtom)

    function clearWorkspace(workspaceId: number) {
        setWorkspace((workspace) => {
            let clearedWorkspace = [...workspace]
            clearedWorkspace[workspaceId] = []
            return clearedWorkspace
        })
    }

    return clearWorkspace
}   
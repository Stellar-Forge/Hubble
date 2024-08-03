"use client"

import { useRecoilValue } from "recoil"
import { workspaceAtom } from "../atoms/workspace"

export function useWorkspace () {
    const value = useRecoilValue(workspaceAtom);
    return value;
}   
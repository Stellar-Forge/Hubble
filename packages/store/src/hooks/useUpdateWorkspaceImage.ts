import { useRecoilValue, useSetRecoilState } from "recoil";
import { workspaceImage } from "../atoms/workspaceImage";
import { useWorkspaceImage } from "./useWorkspaceImage";

export function useUpdateWorkspaceImage() {
    const setWorkspaceImage = useSetRecoilState(workspaceImage);

    function update(b64string: string, workspaceId: number) {
        setWorkspaceImage((currentWorkspace) =>
            currentWorkspace.map((workspace, index) =>
                index === workspaceId
                    ? { ...workspace, image: b64string }
                    : workspace,
            ),
        );
    }

    return update;
}

export function useUpdateWorkspaceUrl() {
    const setWorkspaceImage = useSetRecoilState(workspaceImage);

    function update(url: string, workspaceId: number) {
        setWorkspaceImage((currentWorkspace) =>
            currentWorkspace.map((workspace, index) =>
                index === workspaceId ? { ...workspace, url } : workspace,
            ),
        );
    }

    return update;
}

export function useClearWorkspaceImage() {
    const setWorkspaceImage = useSetRecoilState(workspaceImage);

    function clear(workspaceId: number) {
        setWorkspaceImage((currentWorkspace) =>
            currentWorkspace.map((workspace, index) =>
                index === workspaceId
                    ? { ...workspace, image: "", url: "" }
                    : workspace,
            ),
        );
    }

    return clear;
}

export function useUpdateWorkspaceStyle() {
    const setWorkspaceImage = useSetRecoilState(workspaceImage);

    function update(style: string, workspaceId: number) {
        setWorkspaceImage((currentWorkspace) =>
            currentWorkspace.map((workspace, index) =>
                index === workspaceId ? { ...workspace, style } : workspace,
            ),
        );
    }

    return update;
}

export function useUpdateWorkspaceOutputFormat() {
    const setWorkspaceImage = useSetRecoilState(workspaceImage);

    function update(output_format: string, workspaceId: number) {
        setWorkspaceImage((currentWorkspace) =>
            currentWorkspace.map((workspace, index) =>
                index === workspaceId
                    ? { ...workspace, output_format }
                    : workspace,
            ),
        );
    }

    return update;
}

export function useUpdateWorkspaceResponseFormat() {
    const setWorkspaceImage = useSetRecoilState(workspaceImage);

    function update(response_format: string, workspaceId: number) {
        setWorkspaceImage((currentWorkspace) =>
            currentWorkspace.map((workspace, index) =>
                index === workspaceId
                    ? { ...workspace, response_format }
                    : workspace,
            ),
        );
    }

    return update;
}

export function useUpdateWorkspaceWidth() {
    const setWorkspaceImage = useSetRecoilState(workspaceImage);

    function update(width: number, workspaceId: number) {
        setWorkspaceImage((currentWorkspace) =>
            currentWorkspace.map((workspace, index) =>
                index === workspaceId ? { ...workspace, width } : workspace,
            ),
        );
    }

    return update;
}

export function useUpdateWorkspaceHeight() {
    const setWorkspaceImage = useSetRecoilState(workspaceImage);

    function update(height: number, workspaceId: number) {
        setWorkspaceImage((currentWorkspace) =>
            currentWorkspace.map((workspace, index) =>
                index === workspaceId ? { ...workspace, height } : workspace,
            ),
        );
    }

    return update;
}

export function useUpdateWorkspaceIsUrl() {
    const setWorkspaceImage = useSetRecoilState(workspaceImage);

    function update(isUrl: boolean, workspaceId: number) {
        setWorkspaceImage((currentWorkspace) =>
            currentWorkspace.map((workspace, index) =>
                index === workspaceId ? { ...workspace, isUrl } : workspace,
            ),
        );
    }

    return update;
}

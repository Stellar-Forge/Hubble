import { useSession } from "next-auth/react";
import { useWorkspace } from "@hubble/store/useWorkspace";
import {
    useUpdateWorkspace,
    useClearHistory,
} from "@hubble/store/useUpdateWorkspace";
import React, { useRef, useState } from "react";
import { redirect } from "next/navigation";
import { saveResult } from "@hubble/actions/saveResult";
import { geminiTextPrompt } from "@hubble/actions/TextPrompt";
import { Loader } from "@hubble/ui/Loader";

export function TextModel({ params }: any) {
    const { data: session, status } = useSession();
    const userId = Number(session?.user?.id);
    console.log(`The used id: ${userId}`);
    if (!(status === "authenticated")) {
        redirect("/workspace");
    }

    const submitButtonRef: any = useRef();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const updateWorkspace = useUpdateWorkspace();
    const clearHistory = useClearHistory();

    const workspace = useWorkspace();
    const _workspaceId = Number(params.workspaceId[0]);
    const workspaceId = _workspaceId - 1;
    let currentWorkspace = workspace[workspaceId];

    console.log(`THE Current Workspace IS: ${currentWorkspace}`);

    console.log(workspaceId);

    const handleEnterKey = (e: any) => {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                e.preventDefault(); // Prevent the default behavior (form submission)
                setInput((prevInput) => prevInput + "\n");
            } else {
                e.preventDefault(); // Prevent the default behavior (form submission)
                submitButtonRef.current.click();
            }
        }
    };

    return (
        <div>
            <br />
            Prompt:
            <textarea
                value={input}
                placeholder="Prompt"
                className="bg-zinc-300 rounded-sm m-5 p-2 w-64 h-24"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleEnterKey}
            />
            <button
                className="bg-zinc-300 rounded-md m-5"
                ref={submitButtonRef}
                onClick={async () => {
                    setLoading(true);
                    const res = await geminiTextPrompt(input);
                    setLoading(false);
                    if (!res?.success) {
                        alert(res?.message);
                    } else {
                        updateWorkspace(workspaceId, res.response);
                    }
                }}
            >
                Submit
            </button>
            <button
                className="bg-zinc-300 rounded-md"
                onClick={async () => {
                    const totalHistory = currentWorkspace?.join("!@#$%^&*()");
                    setLoading(true);
                    const res = await saveResult(
                        totalHistory,
                        _workspaceId,
                        userId,
                    );
                    setLoading(false);
                    if (!res) {
                        alert("Some Error Occured during Saving!");
                    } else {
                        alert("Response History Saved Successfully");
                    }
                }}
            >
                Save History
            </button>
            <button
                className="bg-zinc-300 rounded-md m-5"
                onClick={() => clearHistory(workspaceId)}
            >
                Clear History
            </button>
            <br />
            Workspace:{" "}
            {currentWorkspace?.map((e, index) => (
                <React.Fragment key={index}>
                    <br />
                    {e}
                    <br />
                </React.Fragment>
            ))}
            {loading ? <Loader /> : ""}
        </div>
    );
}

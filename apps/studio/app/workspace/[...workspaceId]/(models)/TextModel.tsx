import { useSession } from "next-auth/react"
import { useWorkspace } from "@repo/store/useWorkspace";
import { useUpdateWorkspace, useClearHistory } from "@repo/store/useUpdateWorkspace";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { saveResult } from "../../../../../../packages/actions/saveResult";
import { geminiTextPrompt } from "../../../../../../packages/actions/sendPrompt";

export function TextModel({params} : any) {

  const { data: session, status } = useSession()
  const userId = Number(session?.user?.id)
  console.log(`The used id: ${userId}`)
  if (!(status === "authenticated")) {
    redirect("/workspace")
  }  

  const [input, setInput] = useState("")
  const updateWorkspace = useUpdateWorkspace()
  const clearHistory = useClearHistory()
  
  const workspace = useWorkspace()
  const _workspaceId = Number(params.workspaceId[0])
  const workspaceId = (_workspaceId-1)
  let currentWorkspace = workspace[workspaceId]

  console.log(`THE Current Workspace IS: ${currentWorkspace}`)

  console.log(workspaceId)
  return <div>
    <br/>Prompt:
    <input value={input} type="text" placeholder=" Prompt" className="bg-zinc-300 rounded-sm m-5" onChange={(e: any) => setInput(e.target.value)} />
    <button className="bg-zinc-300 rounded-md m-5" onClick={async () => {
      const res = await geminiTextPrompt(input)
      if (!res?.success) alert("Some Error Occured!")
      else {
        updateWorkspace(workspaceId, res.response)
      }
    }}>Submit</button>
    <button className="bg-zinc-300 rounded-md" onClick={
      async () => {
        const totalHistory = currentWorkspace?.join("!@#$%^&*()")
        const res = await saveResult(totalHistory, workspaceId, userId)
        if (!res) {
          alert("Some Error Occured during Saving!")
        } else {
        alert("Response History Saved Successfully")
        }
      }
    }>Save History</button>
    <button className="bg-zinc-300 rounded-md m-5" onClick={() => clearHistory(workspaceId)}>Clear History</button>
    <br/>
    Workspace: {currentWorkspace?.map((e, index) => (
      <React.Fragment key={index}>
        <br/>
        {e}
        <br/>
      </React.Fragment>
    ))}
  </div>
}  
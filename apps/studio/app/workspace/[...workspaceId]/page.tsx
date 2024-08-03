"use client"

import { useSession } from "next-auth/react"
import { useWorkspace } from "@repo/store/useWorkspace";
import { useUpdateWorkspace } from "@repo/store/useUpdateWorkspace";
import { useClearHistory } from "@repo/store/useClearHistory";
import React, { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import { saveResult } from "../../../../../packages/actions/saveResult";

export default function ({params} : any) {

  const { data: session, status } = useSession()
  const userId = Number(session?.user?.id)
  console.log(`The used id: ${userId}`)
  if (!(status === "authenticated")) {
    redirect("/api/auth/signin")
  }

  const [input, setInput] = useState("")
  const updateWorkspace = useUpdateWorkspace()
  const clearHistory = useClearHistory()
  
  const workspace = useWorkspace()
  const workspaceId = Number(params.workspaceId[0])
  let currentWorkspace = workspace[workspaceId]

  async function sendPrompt(input: string) {
    const res = await axios({
      url: "http://localhost:3301/api/v1/gemini/prompt",
      method: "POST",
      data: {
        query: {
          prompt: input
        }
      },
    })
    console.log(res.data)
    
    updateWorkspace(workspaceId, res.data.response.promptResult)
  }

  console.log(`THE Current Workspace IS: ${currentWorkspace}`)

  console.log(workspaceId)
  return <div>
    <br/>Prompt:
    <input value={input} type="text" placeholder=" Prompt" className="bg-zinc-300 rounded-sm m-5" onChange={(e: any) => setInput(e.target.value)} />
    <button className="bg-zinc-300 rounded-md m-5" onClick={() => sendPrompt(input)}>Submit</button>
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
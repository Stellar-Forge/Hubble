import axios from "axios"
import { useState } from "react"
import { ImageDisplay } from "../../../../components/ImageDisplay"
import { useWorkspaceImage } from "@repo/store/useWorkspaceImage";
import { useUpdateWorkspaceImage, useClearWorkspaceImage } from "@repo/store/useUpdateWorkspaceImage";

export function ImageModel({params}: any) {

    const [input, setInput] = useState("")

    const _workspaceId = Number(params.workspaceId[0])
    const workspaceId = (_workspaceId-1)

    const workspaceImage = useWorkspaceImage()
    const currentImage = workspaceImage[workspaceId]
    const updateWorkspaceImage = useUpdateWorkspaceImage()
    const clearWorksapceImage = useClearWorkspaceImage()
 
    async function sendPrompt(prompt: string) {
        const res = await axios({
            url: "http://localhost:3301/api/v1/getimgai/prompt",
            method: "POST",
            data: {
                query: {
                    "prompt": prompt
                }
            }
        })
        updateWorkspaceImage(res.data.response.image, workspaceId)
    }

    return <div>
        <br/>Prompt:
        <input value={input} type="text" placeholder=" Prompt" className="bg-zinc-300 rounded-sm m-5" onChange={(e: any) => setInput(e.target.value)} />
        <button className="bg-zinc-300 rounded-md m-5" onClick={() => sendPrompt(input)}>Submit</button>
        <button className="bg-zinc-300 rounded-md m-5" onClick={() => {
            clearWorksapceImage(workspaceId)
            }}>Clear History</button>
        <br/>
        Workspace:<br/>
        {currentImage === "" ? "" : <ImageDisplay base64String={currentImage}/>}
    </div>
}
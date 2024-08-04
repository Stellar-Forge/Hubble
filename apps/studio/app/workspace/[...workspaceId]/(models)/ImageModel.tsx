import axios from "axios"
import { useState } from "react"
import { ImageDisplay } from "../../../../components/ImageDisplay"
import { useWorkspaceImage } from "@repo/store/useWorkspaceImage";
import {    useUpdateWorkspaceImage, 
            useClearWorkspaceImage, 
            useUpdateWorkspaceStyle, 
            useUpdateWorkspaceOutputFormat,
            useUpdateWorkspaceResponseFormat,
            useUpdateWorkspaceWidth,
            useUpdateWorkspaceHeight,
            useUpdateWorkspaceUrl,
            useUpdateWorkspaceIsUrl } from "@repo/store/useUpdateWorkspaceImage";

export function ImageModel({params}: any) {

    interface QueryParams {
        prompt: string,
        style: string,
        width: number, 
        height: number, 
        output_format: string, 
        response_format: string
    }

    const [inputPrompt, setInputPrompt] = useState("")

    const _workspaceId = Number(params.workspaceId[0])
    const workspaceId = (_workspaceId-1)

    const workspaceImage = useWorkspaceImage()
    console.log(workspaceImage)
    const currentImage = workspaceImage[workspaceId]!.image
    const currentUrl = workspaceImage[workspaceId]!.url
    const currentStyle = workspaceImage[workspaceId]!.style
    const currentOutputFormat = workspaceImage[workspaceId]!.output_format
    const currentResponseFormat = workspaceImage[workspaceId]!.response_format
    const currentHeight = workspaceImage[workspaceId]!.height
    const currentWidth = workspaceImage[workspaceId]!.width
    const currentIsUrl = workspaceImage[workspaceId]!.isUrl

    
    const updateWorkspaceImage = useUpdateWorkspaceImage()
    const clearWorksapceImage = useClearWorkspaceImage()
    const updateWorkspaceStyle = useUpdateWorkspaceStyle()
    const updateWorkspaceOutputFormat = useUpdateWorkspaceOutputFormat()
    const updateWorkspaceResponseFormat = useUpdateWorkspaceResponseFormat()
    const updateWorkspaceWidth = useUpdateWorkspaceWidth()
    const updateWorkspaceHeight = useUpdateWorkspaceHeight()
    const updateWorkspaceUrl = useUpdateWorkspaceUrl()
    const updateWorkspaceIsUrl = useUpdateWorkspaceIsUrl()
    

    async function sendPrompt({ prompt, style, width, height, output_format, response_format }: QueryParams) {
        const res = await axios({
            url: "http://localhost:3301/api/v1/getimgai/prompt",
            method: "POST",
            data: {
                query: { prompt, style, width, height, output_format, response_format }
            }
        })
        if (response_format === "b64") {
            updateWorkspaceImage(res.data.response.image, workspaceId)
            updateWorkspaceIsUrl(false, workspaceId)
        }
        else {
            console.log(`The Response URL: ${res.data.response.url}`)
            updateWorkspaceUrl(res.data.response.url, workspaceId)
            updateWorkspaceIsUrl(true, workspaceId)
        }
    }

    return <div>
        <br/>Prompt:
        <input value={inputPrompt} type="text" placeholder=" Prompt" className="bg-zinc-300 rounded-sm m-5" onChange={(e: any) => setInputPrompt(e.target.value)} />
        <label>
          Style:
          <select className="mr-7" value={currentStyle} onChange={(e) => {updateWorkspaceStyle(e.target.value, workspaceId)}}>
            <option value="photorealism">Photorealism</option>
            <option value="anime">Anime</option>
            <option value="art">Art</option>
          </select>
        </label>
        <label>
          Output Format:
          <select className="mr-7" value={currentOutputFormat} onChange={(e) => {updateWorkspaceOutputFormat(e.target.value, workspaceId)}}>
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
          </select>
        </label>
        <label>
          Response Format:
          <select className="mr-7" value={currentResponseFormat} onChange={(e) => {updateWorkspaceResponseFormat(e.target.value, workspaceId)}}>
            <option value="b64">Image Preview (B64)</option>
            <option value="url">URL</option>
          </select>
        </label>
        <br/>
        Width:
        <input value={currentWidth} type="text" placeholder=" Prompt" className="bg-zinc-300 rounded-sm m-5" onChange={(e: any) => updateWorkspaceWidth(Number(e.target.value), workspaceId)} />
        Height:
        <input value={currentHeight} type="text" placeholder=" Prompt" className="bg-zinc-300 rounded-sm m-5" onChange={(e: any) => updateWorkspaceHeight(Number(e.target.value), workspaceId)} />
        <button className="bg-zinc-300 rounded-md mr-5 mb-9" onClick={() => sendPrompt(
            {
                prompt: inputPrompt,
                style: currentStyle,
                width: currentWidth,
                height: currentHeight,
                response_format: currentResponseFormat,
                output_format: currentOutputFormat
            }
            )}>Submit</button>
        <button className="bg-zinc-300 rounded-md m-5" onClick={() => {
            clearWorksapceImage(workspaceId)
            }}>Clear History</button>
        <br/>
        Workspace:<br/>
        <ImageDisplay isUrl={currentIsUrl} url={currentUrl} response_format={currentOutputFormat} base64String={currentImage}/>
    </div>
}
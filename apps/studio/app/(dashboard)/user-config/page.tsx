"use client"

import { useState } from "react"
import { encryptApiKey } from "@hubble/crypto/encryptApiKey";
import axios from "axios";
import { ModelItem } from "@hubble/ui/ModelItem";
import { saveAPIKey } from "@hubble/actions/saveAPIKey"
import { Loader } from "@hubble/ui/Loader";

export default function() {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [saveButtonVisible, setSaveButtonVisible] = useState(false)
    const [model, setModel] = useState("Gemini")
    const [usableModels, setUsableModels] = useState([{}])

    async function checkAPIKey(apiKey: string) {
        const urlModel = model === "Gemini" ? "gemini" : "getimgai"
        const res = await axios({
            url: `http://localhost:3301/api/v1/${urlModel}/check`,
            method: "POST",
            data: {
                query: {
                    API_KEY: apiKey
                } 
            }
        })
        
        return res.data
    }
    
    return <div>
        <label>
          Add Your API Key for Model:
          <select className="m-7" value={model} onChange={(e) => {
            setModel(e.target.value)
            setSaveButtonVisible(false)
            }}>
            <option value="Gemini">Gemini</option>
            <option value="GetImgAI">GetImg.AI</option>
          </select>
        </label> <br/>
        <input className="m-7" value={input} type="text" placeholder="API KEY" onChange={(e) => {
            setInput(e.target.value)
            setSaveButtonVisible(false)
            }}></input>
        <button className="m-7" onClick={async () => {
            setLoading(true)
            const res = await checkAPIKey(input)
            setLoading(false)
            if (!res.success) {
                alert("Invalid API Key!")
                setSaveButtonVisible(false)
            } else if (model === "Gemini") {
                setUsableModels(res.response.models)
                setSaveButtonVisible(true)
            } else {
                setUsableModels(res.response)
                setSaveButtonVisible(true)

            }
    
        }}>Check</button>
        {saveButtonVisible ? <button className="m-7" onClick={async () => {
            const encryptedCode = encryptApiKey(input)
            setLoading(true)
            const res = await saveAPIKey(encryptedCode, model)
            setLoading(false)
            if (!res) alert("Some Error Occured!")
            else alert("API Key Saved Successfully!")
            
        }}>Save</button> : ""}
        
        <br/><br/>
        {`Your Available Models For Current API Key: `}
        {saveButtonVisible ? usableModels.map((e: any) => <ModelItem displayName={model === "Gemini" ? e.displayName : e.name} description={model === "Gemini" ? e.description : e.family} />) : ""}
        {loading ? <Loader /> : ""}
    </div>
}
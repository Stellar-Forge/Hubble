import { GoogleGenerativeAI } from "@google/generative-ai";
import { Router } from "express";
import axios from "axios";

const router = Router()

// Health Check Endpoint
router.get("/", (req, res) => {
    console.log("GOT HIT AT /")
    res.json({
        msg: "Healthy GEMINI server!"
    })
})

interface QueryParams {
    // take this to the place from where the query will be sent from (workspaces)
    model: string,
    API_KEY: string,
    prompt: string
}

// API Key Check Endpoint
router.post("/check", async (req, res) => {
    const { API_KEY } = req.body.query
    try {
        const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/?key=${API_KEY}`,
            method: "GET"
        })

        res.json({
            response: response.data,
            success: true
        })
    } catch (e) {
        res.json({
            msg: "Some Error Occured!",
            success: false
        })
    }
    
})

// Response Generation Endpoint
router.post(`/prompt`, async (req, res) => {
    
    //TODO: Add zod validation here?
    const { query } = req.body;
    const { prompt, API_KEY } = query
    console.log(`DECRYPTED API KEY: ${API_KEY}`)

    const genAI = new GoogleGenerativeAI(API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const { model, prompt, API_KEY } = query
    console.log("GOT HIT AT /PROMPT")
    try {
        const result = await model.generateContent(prompt);
        const promptResult = result.response.text()
        console.log(promptResult)
        res.json({
            response: {
                usageMetadata: result.response.usageMetadata,
                promptResult
            },
            success: true
        })
    } catch (e) {
        res.json({
            success: false
        })
    }
    
})

export default router
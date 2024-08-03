import { GoogleGenerativeAI } from "@google/generative-ai";
import { Router } from "express";
import dotenv from "dotenv"
import axios from "axios";

const router = Router()
dotenv.config({path: "../.env"})

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Greet me in Three words";

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

router.post(`/prompt`, async (req, res) => {
    //TODO: Add zod validation here?
    const { query } = req.body;
    const { prompt } = query
    
    // const { model, prompt, API_KEY } = query
    console.log("GOT HIT AT /PROMPT")
    const result = await model.generateContent(prompt);
    const promptResult = result.response.text()
    console.log(promptResult)
    res.json({
        response: {
            usageMetadata: result.response.usageMetadata,
            promptResult
        }
    })
})

export default router
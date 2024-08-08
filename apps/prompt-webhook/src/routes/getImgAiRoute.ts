import axios from "axios"
import { Router } from "express"

const router = Router()

// Health Check Endpoint
router.get("/", (req, res) => {
    res.json({
        msg: "Healthy GetImgAI Server!"
    })
})

// API Key Check Endpoint
router.post("/check", async (req, res) => {
    const { API_KEY } = req.body.query
    try {
        const response = await axios({
            url: `https://api.getimg.ai/v1/models?pipeline=text-to-image`,
            method: "GET",
            headers: {
                accept: "application/json",
                authorization: `Bearer ${API_KEY}`
            }
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
router.post("/prompt", async (req, res) => {

    const { query } = req.body
    console.log(`The received query is: ${JSON.stringify(query)}`)
    const { prompt, style, width, height, output_format, response_format, API_KEY} = query

    const response = await axios({
        url: "https://api.getimg.ai/v1/essential/text-to-image",
        method: "POST",
        headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${API_KEY}`,
            'content-type': 'application/json'
          },
        data: {
            prompt,
            style,
            width, 
            height, 
            output_format, 
            response_format
        }
    })
    console.log(`The Response from API: ${JSON.stringify(response.data)}`)
    res.json({
        response: response.data
    })
})

export default router
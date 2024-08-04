import axios from "axios"
import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
    res.json({
        msg: "Healthy GetImgAI Server!"
    })
})

router.post("/prompt", async (req, res) => {

    const { query } = req.body
    console.log(`The received query is: ${JSON.stringify(query)}`)
    const { prompt, style, width, height, output_format, response_format} = query

    const response = await axios({
        url: "https://api.getimg.ai/v1/essential/text-to-image",
        method: "POST",
        headers: {
            'accept': 'application/json',
            'authorization': 'Bearer key-UqDR6KeofDCwtqfW0twFK2yIVODUB1PDoxAV04Pi3FtB2uozzMYu02Q3GaZXFj5uggrjQJ1bzSs91iUQRZaMe496JpKJdcP',
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
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
    const { prompt } = query

    const response = await axios({
        url: "https://api.getimg.ai/v1/essential/text-to-image",
        method: "POST",
        headers: {
            'accept': 'application/json',
            'authorization': 'Bearer key-2QtFB6URyPva2NsjtQInZDNNZ7hc0jkrfOEJheR1RDogQZBDNdbyVJna8YjYIzTh616gxS1fB540O2HZejaizGc7Cb2bKewY',
            'content-type': 'application/json'
          },
        data: {
            "prompt": prompt
        }
    })

    res.json({
        response: response.data
    })
})

export default router
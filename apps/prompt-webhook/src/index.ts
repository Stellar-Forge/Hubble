import axios from "axios";
import express from "express";

const app = express();

const PORT = 3002
const apiRoute = "/api/v1"

interface GeminiResponseParams {
    output: string,
    error: null | string
}

app.post(`${apiRoute}/prompt/gemini`, async (req, res) => {
    //TODO: Add zod validation here?
    const { query } = req.body;
    
    const { prompt, apiKey } = query
    const response : GeminiResponseParams = await axios({
        url: "http://localhost:3301/dummygeminiapi",
        method: "POST",
        data: {
            prompt, apiKey
        }
    })

    res.json({
        response: {
            promptResult: response.output,
            error: response.error
        }
    })
    // Update balance in db, add txn
})

app.listen(PORT, () => {`Listening on PORT ${PORT}`})
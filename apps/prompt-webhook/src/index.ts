import express from "express";
import dotenv from "dotenv"
import geminiRouter from "./routes/geminiRoute"

const app = express();
dotenv.config({path: "../.env"})

const PORT = process.env.PORT
const apiRoute = "/api/v1"

app.use(express.json())
app.use(`${apiRoute}/gemini`, geminiRouter)

app.get("/", (req, res) => {
    res.json({
        msg: "Healthy server!"
    })
})

app.listen(PORT, () => {console.log(`Listening on PORT ${PORT}`)})
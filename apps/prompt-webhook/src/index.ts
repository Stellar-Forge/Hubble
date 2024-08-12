import express from "express";
import dotenv from "dotenv";
import geminiRouter from "./routes/geminiRoute";
import getImgAIRouter from "./routes/getImgAiRoute";
import cors from "cors";

const app = express();
dotenv.config({ path: "../.env" });

const PORT = process.env.PORT;
const apiRoute = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(`${apiRoute}/gemini`, geminiRouter);
app.use(`${apiRoute}/getimgai`, getImgAIRouter);

app.get("/", (req, res) => {
    res.json({
        msg: "Healthy server!",
    });
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

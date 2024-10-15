import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({ path: "../.env" });
const PORT = process.env.PORT;

const app = express();

app.use(cors());

const httpServer = app.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT}`),
);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws) {
    console.log("New Socket Connected");

    ws.on("error", console.error);

    ws.on("message", function message(message, isBinary) {
        const data = JSON.parse(String(message));

        switch (data.event) {
            case "chat-message":
                console.log(data.payload);
                break;
        }
    });

    ws.send("Hello! Message From Server!!");
});

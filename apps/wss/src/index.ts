import express from "express";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
const httpServer = app.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT}`),
);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws) {
    ws.on("error", console.error);

    ws.on("message", function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    ws.send("Hello! Message From Server!!");
});

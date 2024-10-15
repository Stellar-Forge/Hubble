"use client";

import { useEffect, useState } from "react";

export default function Landing() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080");
        socket.onopen = () => {
            console.log("Connection established");
        };
        // socket.onmessage = (message) => {};
        setSocket(socket);
        setIsLoading(false);
        return () => socket.close();
    }, []);

    function sendEvent(event: string, payload: string) {
        const message = { event, payload };
        socket?.send(JSON.stringify(message));
    }

    return (
        <div className="flex">
            <div>
                <button onClick={() => {}}>Rahul</button>
                <button>Vansh</button>
            </div>
            {isLoading ? (
                "Loading..."
            ) : (
                <>
                    <div>
                        <input
                            type="text"
                            value={input}
                            placeholder="Enter Your Message"
                            onChange={(e) => setInput(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                sendEvent("chat-message", input);
                                alert(`Sent ${input}`);
                            }}
                        >
                            Send
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

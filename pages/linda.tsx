"use client";

import { useEffect, useState } from "react";

export default function LindaChat() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  async function startChat() {
    // Fetch ephemeral key from your backend
    const resp = await fetch("/api/linda");
    const data = await resp.json();
    const token = data.client_secret.value;

    // Connect to OpenAI Realtime API
    const socket = new WebSocket(
      "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview",
      ["realtime", "openai-insecure-api-key." + token, "openai-beta.realtime-v1"]
    );

    socket.onopen = () => {
      setIsConnected(true);
      console.log("Connected to Linda session.");

      // As soon as connection opens, Linda initiates the convo
      socket.send(
        JSON.stringify({
          type: "response.create",
          response: {
            conversation: "default",
            instructions:
              "Hello there, I’m Linda. As a Texas mother, I worry deeply about school safety. Can I ask, how do you plan to keep children safe in school?",
          },
        })
      );
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log("Received:", msg);

      if (msg.type === "response.output_text.delta") {
        setMessages((prev) => [...prev, msg.delta]);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("Connection closed.");
    };

    setWs(socket);
  }

  function sendUserMessage(text: string) {
    if (!ws) return;
    ws.send(
      JSON.stringify({
        type: "response.create",
        response: {
          conversation: "default",
          instructions: text,
        },
      })
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      {!isConnected ? (
        <button
          onClick={startChat}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Start / Talk to Linda
        </button>
      ) : (
        <div className="w-full max-w-md">
          <div className="border p-2 h-64 overflow-y-auto bg-gray-100 rounded-lg mb-2">
            {messages.map((m, i) => (
              <div key={i} className="mb-1">
                {m}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Your response..."
            className="w-full border rounded p-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendUserMessage(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

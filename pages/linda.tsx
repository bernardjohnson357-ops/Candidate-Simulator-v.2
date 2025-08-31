"use client";

import { useEffect, useState, useRef } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function LindaChat() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Start Realtime session + voice
  async function startChat() {
    // Get ephemeral key
    const resp = await fetch("/api/linda"); // GET
    const data = await resp.json();
    const token = data.client_secret?.value;

    if (!token) {
      alert("Failed to get ephemeral key");
      return;
    }

    const socket = new WebSocket(
      "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview",
      ["realtime", "openai-insecure-api-key." + token, "openai-beta.realtime-v1"]
    );

    socket.onopen = () => {
      setIsConnected(true);
      console.log("Connected to Linda Realtime session.");

      // Immediately send first message from Linda
      socket.send(
        JSON.stringify({
          type: "response.create",
          response: {
            conversation: "default",
            instructions:
              "Hello there! I’m Linda, a Texas mother worried about school safety. How will you keep children safe in school?",
          },
        })
      );

      // Also add it locally
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Hello there! I’m Linda, a Texas mother worried about school safety. How will you keep children safe in school?" },
      ]);
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "response.output_text.delta") {
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            // Append delta to last message
            const updated = [...prev];
            updated[updated.length - 1].content += msg.delta;
            return updated;
          } else {
            // Add new assistant message
            return [...prev, { role: "assistant", content: msg.delta }];
          }
        });
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("Connection closed.");
    };

    setWs(socket);
  }

  // Send user's text to Realtime session
  function sendUserMessage(text: string) {
    if (!ws || !text.trim()) return;

    // Add user's message locally
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    // Send to Realtime session
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

  // Fallback for typed chat using POST if WS fails
  async function sendUserMessageFallback(text: string) {
    const resp = await fetch("/api/linda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: text }] }),
    });
    const data = await resp.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
  }

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-50">
      {!isConnected ? (
        <button
          onClick={startChat}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-4"
        >
          Start / Talk to Linda
        </button>
      ) : null}

      <div className="w-full max-w-md">
        <div className="border p-2 h-64 overflow-y-auto bg-white rounded-lg mb-2">
          {messages.map((m, i) => (
            <div key={i} className={`mb-2 ${m.role === "user" ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block px-3 py-1 rounded-lg ${
                  m.role === "user" ? "bg-blue-100" : "bg-gray-200"
                }`}
              >
                {m.content}
              </span>
            </div>
          ))}
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Type your response..."
          className="w-full border rounded p-2"
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputRef.current) {
              const text = inputRef.current.value;
              if (ws) sendUserMessage(text);
              else sendUserMessageFallback(text);
              inputRef.current.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}

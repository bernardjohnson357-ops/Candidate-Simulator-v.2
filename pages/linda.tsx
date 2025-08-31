"use client";

import { useState } from "react";

export default function LindaChat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [isChatting, setIsChatting] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Trigger API call
  async function startChat() {
    setIsChatting(true);

    const resp = await fetch("/api/linda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [] }), // first turn, no user messages yet
    });

    const data = await resp.json();
    if (data.reply) {
      setMessages([data.reply]);
    }
  }

  async function sendUserMessage() {
    if (!inputValue.trim()) return;

    // Add user message to state
    const updatedMessages = [...messages, inputValue];
    setMessages(updatedMessages);

    // Call API
    const resp = await fetch("/api/linda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: updatedMessages.map((msg, i) => ({
          role: i % 2 === 0 ? "assistant" : "user", // alternating roles
          content: msg,
        })),
      }),
    });

    const data = await resp.json();
    if (data.reply) {
      setMessages((prev) => [...prev, data.reply]);
    }

    setInputValue("");
  }

  return (
    <div className="flex flex-col items-center p-4">
      {!isChatting ? (
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
              <div key={i} className="mb-2">
                {m}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Your response..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full border rounded p-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendUserMessage();
            }}
          />
        </div>
      )}
    </div>
  );
}

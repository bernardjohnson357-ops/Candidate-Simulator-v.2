"use client";

import { useState } from "react";

export default function LindaChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function startChat() {
    setIsStarted(true);
    // Kick off conversation: empty messages array triggers system prompt
    const res = await fetch("/api/linda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [] }),
    });
    const data = await res.json();
    setMessages([{ role: "assistant", content: data.reply }]);
  }

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/linda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center p-4">
      {!isStarted ? (
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
              <div key={i} className={m.role === "assistant" ? "text-blue-700" : "text-gray-800"}>
                {m.content}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border rounded p-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              placeholder="Type your response..."
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

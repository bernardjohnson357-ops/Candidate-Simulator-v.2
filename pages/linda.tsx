"use client";

import { useState } from "react";

export default function LindaChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Start conversation button
  async function startConversation() {
    setLoading(true);
    try {
      const resp = await fetch("/api/linda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [], // first turn has no user messages
        }),
      });
      const data = await resp.json();
      setMessages([{ role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("Error starting conversation:", err);
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage() {
    if (!input.trim()) return;
    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("/api/linda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await resp.json();
      setMessages([...updatedMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center p-4">
      {messages.length === 0 ? (
        <button
          onClick={startConversation}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          disabled={loading}
        >
          {loading ? "Starting..." : "Start / Talk to Linda"}
        </button>
      ) : (
        <div className="w-full max-w-md">
          <div className="border p-2 h-64 overflow-y-auto bg-gray-100 rounded-lg mb-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "assistant" ? "text-blue-700 mb-1" : "text-gray-800 mb-1"}
              >
                <strong>{m.role === "assistant" ? "Linda: " : "You: "}</strong>
                {m.content}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Type your response..."
              className="flex-1 border rounded-l p-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-green-600 text-white rounded-r-lg"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

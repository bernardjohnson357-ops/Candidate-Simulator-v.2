"use client";
import { useState } from "react";
import { sendToSimulator } from "../lib/SimulatorClient";

export default function SimulatorChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  async function handleSend() {
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const reply = await sendToSimulator(newMessages);
    if (reply) {
      setMessages([...newMessages, reply]);
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="border rounded-lg p-2 h-64 overflow-y-auto mb-2 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-blue-600" : "text-green-600"}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border rounded p-2"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

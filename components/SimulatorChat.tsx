"use client";
import { useState } from "react";

export default function SimulatorChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply.content }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
      <div style={{ minHeight: 300, border: "1px solid #ccc", padding: 12, marginBottom: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === "user" ? "right" : "left", margin: "4px 0" }}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%", padding: 8 }}
      />
      <button onClick={sendMessage} style={{ padding: 8 }}>Send</button>
    </div>
  );
}

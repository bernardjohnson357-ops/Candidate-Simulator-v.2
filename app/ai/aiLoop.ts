// app/ai/aiLoop.ts
"use client";

import React, { useState } from "react";
import { initialState, runAIModule, GameState } from "./ai/aiLoop";

let gameState: GameState = { ...initialState };

const Page: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "User", text: input }]);

    const result = await runAIModule(gameState, input);
    gameState = result.state;

    setMessages((prev) => [...prev, { sender: "AI", text: result.aiResponse }]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 600, width: "100%", margin: "2rem auto" }}>
      <h1 style={{ textAlign: "center" }}>Candidate Simulator AI</h1>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: "1rem",
          height: "60vh",
          overflowY: "auto",
          marginBottom: "1rem",
          backgroundColor: "#fff",
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <strong>{msg.sender}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
          placeholder="Type your action..."
        />
        <button
          onClick={handleSend}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: 4,
            border: "none",
            backgroundColor: "#2563eb",
            color: "#fff",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Page;

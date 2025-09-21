// app/page.tsx
"use client";

import React, { useState } from "react";
import { resetSimulator, processInputLoop } from "./ai/aiLoop";
import { ModuleState } from "./ai/moduleLogic";

interface Message {
  sender: "AI" | "User";
  text: string;
}

export default function HomePage() {
  // Start simulator at Module 0
  const start = resetSimulator();

  const [messages, setMessages] = useState<Message[]>([
    { sender: "AI", text: start.aiResponse },
  ]);
  const [state, setState] = useState<ModuleState>(start.state);
  const [input, setInput] = useState("");

  const handleUserInput = () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg: Message = { sender: "User", text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Run through simulator loop
    const result = processInputLoop(input);
    setState(result.state);

    // Add AI response
    setMessages((prev) => [...prev, { sender: "AI", text: result.aiResponse }]);

    setInput("");
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Libertarian Candidate Simulator
      </h1>

      {/* Chat Window */}
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

      {/* Live Stats */}
      <div
        style={{
          border: "1px solid #eee",
          borderRadius: 8,
          padding: "0.5rem 1rem",
          marginBottom: "1rem",
          background: "#f9f9f9",
          fontSize: "0.9rem",
        }}
      >
        <p>
          <strong>Candidate Coins (cc):</strong> {state.cc}
        </p>
        <p>
          <strong>Signatures:</strong> {state.signatures}
        </p>
        <p>
          <strong>Approval:</strong> {state.approval}%
        </p>
      </div>

      {/* Input Box */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
          placeholder="Type your response..."
          onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
        />
        <button
          onClick={handleUserInput}
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
}

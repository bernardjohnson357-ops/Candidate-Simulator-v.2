// app/page.tsx
"use client";

import React, { useState } from "react";
import ChatSimulator from "../components/ChatSimulator"; // Optional, can be replaced with inline component

// Example AI loop function (replace with your actual AI logic)
async function runModuleAI(userInput: string) {
  // Simulate AI response; replace with actual AI Control Loop call
  return `AI response to: "${userInput}"`;
}

const Page: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "User", text: input }]);

    // Get AI response
    const aiResponse = await runModuleAI(input);

    // Add AI message
    setMessages((prev) => [...prev, { sender: "AI", text: aiResponse }]);

    // Clear input
    setInput("");
  };

  return (
    <div style={{ maxWidth: 600, width: "100%" }}>
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
          style={{ padding: "0.5rem 1rem", borderRadius: 4, border: "none", backgroundColor: "#2563eb", color: "#fff" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Page;

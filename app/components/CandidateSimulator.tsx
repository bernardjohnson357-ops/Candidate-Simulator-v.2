// File: CandidateSimulator.tsx
"use client";

import React, { useState } from "react";
import { libertarianSimulator } from "../ai/libertarianSimulator";

interface CandidateState {
  CC: number;
  signatures: number;
  approval: number;
  threshold?: {
    cc: number;
    approval: number;
    sigs: number;
  };
}

interface Message {
  sender: "AI" | "User";
  text: string;
}

const initialCandidateState: CandidateState = {
  CC: 50,
  signatures: 0,
  approval: 0,
};

export const CandidateSimulator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "AI",
      text: `${libertarianSimulator[0].narrator}\n\n${libertarianSimulator[0].prompt}`,
    },
  ]);
  const [candidateState, setCandidateState] = useState<CandidateState>(
    initialCandidateState
  );
  const [input, setInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUserInput = () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "User", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const result = processInput(input.trim(), candidateState, currentIndex);

    setCandidateState(result.updatedState);
    setMessages((prev) => [...prev, { sender: "AI", text: result.text }]);

    setCurrentIndex(result.nextIndex);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1 style={{ textAlign: "center" }}>Libertarian Candidate Simulator</h1>
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
            <span style={{ whiteSpace: "pre-line" }}>{msg.text}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
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
};

// ---------------- Core Logic ----------------
interface ProcessResult {
  updatedState: CandidateState;
  text: string;
  nextIndex: number;
}

const processInput = (
  input: string,
  state: CandidateState,
  currentIndex: number
): ProcessResult => {
  const newState = { ...state };
  let text = "";

  const current = libertarianSimulator[currentIndex];
  if (!current) {
    return {
      updatedState: newState,
      text: "🎉 Simulation complete!",
      nextIndex: currentIndex,
    };
  }

  // Run logic for current module
  if (current.logic) {
    text = current.logic(input, newState);
  } else {
    text = "No logic found for this module.";
  }

  // Move to next module
  let nextIndex = currentIndex + 1;
  if (libertarianSimulator[nextIndex]) {
    text += `\n\n--- ${libertarianSimulator[nextIndex].title} ---\n${libertarianSimulator[nextIndex].narrator}\n\n${libertarianSimulator[nextIndex].prompt}`;
  } else {
    text += "\n\n🎉 You’ve completed the simulator!";
  }

  return { updatedState: newState, text, nextIndex };
};

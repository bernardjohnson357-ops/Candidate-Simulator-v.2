// File: CandidateSimulator.tsx
"use client";

import React, { useState } from "react";

type Office = "President" | "Senate" | "House";
type Affiliation = "Independent" | "Party";

interface CandidateState {
  office?: Office;
  affiliation?: Affiliation;
  party?: string;
  filingMethod?: "Fee" | "Petitions";
  CC: number;
  signatures: number;
  approval: number;
  currentModule: number;
  speech?: string;
  slogan?: string;
  mission?: string;
  announcement?: string;
}

interface Message {
  sender: "AI" | "User";
  text: string;
}

const initialCandidateState: CandidateState = {
  CC: 50,
  signatures: 0,
  approval: 0,
  currentModule: 0,
};

export const CandidateSimulator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "AI", text: "Welcome to the Federal Candidate Simulator! Let's get started." },
  ]);
  const [candidateState, setCandidateState] = useState<CandidateState>(initialCandidateState);
  const [input, setInput] = useState("");

  const handleUserInput = () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "User", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const result = processInput(input.trim(), candidateState);
    setCandidateState(result.updatedState);

    setMessages((prev) => [...prev, { sender: "AI", text: result.text }]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
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
}

const processInput = (input: string, state: CandidateState): ProcessResult => {
  const newState = { ...state };
  let text = "";

  // Module 0 – Office selection
  if (newState.currentModule === 0) {
    const office = parseOffice(input);
    if (office) {
      newState.office = office;
      text = `Great! You are running for ${office}. Now, type "Party" or "Independent" to choose affiliation.`;
      newState.currentModule = 0.5;
    } else {
      text = 'Please type "President", "Senate", or "House" to continue.';
    }
    return { updatedState: newState, text };
  }

  if (newState.currentModule === 0.5) {
    const affiliation = parseAffiliation(input);
    if (affiliation) {
      newState.affiliation = affiliation;
      text = `Understood! You will run as ${affiliation}. Next: Module 1 – Filing.`;
      newState.currentModule = 1;
    } else {
      text = 'Please type "Party" or "Independent" to continue.';
    }
    return { updatedState: newState, text };
  }

  // ---------------- Additional modules can be implemented here ----------------
  text = "Input received. Module logic continues here...";
  return { updatedState: newState, text };
};

// ---------------- Helper Parsers ----------------
const parseOffice = (input: string): Office | null => {
  input = input.toLowerCase();
  if (input.includes("president")) return "President";
  if (input.includes("senate")) return "Senate";
  if (input.includes("house")) return "House";
  return null;
};

const parseAffiliation = (input: string): Affiliation | null => {
  input = input.toLowerCase();
  if (input.includes("party")) return "Party";
  if (input.includes("independent")) return "Independent";
  return null;
};

// app/page.tsx
"use client";

import { useState } from "react";
import Card from "./components/ui/card";
import CandidateChat from "./components/CandidateChat";

export default function HomePage() {
  const [orientationDone, setOrientationDone] = useState(false);
  const [path, setPath] = useState<"Party" | "Independent" | null>(null);

  // ===== Step 1: Orientation =====
  if (!orientationDone) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "24px", gap: "24px", display: "flex", flexDirection: "column" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>🗳 Candidate Simulator Orientation</h2>

        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p>
              Welcome to the Candidate Simulator! This simulator is designed to
              prepare you for the realities of running for office. Every stage is
              <strong> scaffolded</strong> — you move through reading, writing, and speaking in order.
            </p>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>📚 Why Scaffolded?</h3>
            <ul style={{ paddingLeft: "24px", listStyle: "disc", gap: "4px", display: "flex", flexDirection: "column" }}>
              <li><strong>Read first</strong> – absorb the rules, guides, and case studies.</li>
              <li><strong>Write next</strong> – organize ideas and commit to text.</li>
              <li><strong>Speak last</strong> – deliver your message clearly and persuasively.</li>
            </ul>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>💰 Candidate Coins (CC)</h3>
            <ul style={{ paddingLeft: "24px", listStyle: "disc", gap: "4px", display: "flex", flexDirection: "column" }}>
              <li>1 CC = $100 simulated campaign funds.</li>
              <li>Earn CC by passing quizzes and completing assignments.</li>
              <li>Spend CC on campaign resources or communication coaching.</li>
            </ul>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>⚖️ Key Rule</h3>
            <p>Tasks must be completed in order: Read → Write → Speak.</p>
          </div>
        </Card>

        <button
          style={{ padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", backgroundColor: "#16a34a", color: "#fff", border: "none", cursor: "pointer" }}
          onClick={() => setOrientationDone(true)}
        >
          Continue to Path Selection
        </button>
      </div>
    );
  }

  // ===== Step 2: Path Selection =====
  if (!path) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <p style={{ fontWeight: "bold" }}>Choose your path to start the simulation:</p>
        <div style={{ display: "flex", gap: "16px" }}>
          <button
            style={{ padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", backgroundColor: "#2563eb", color: "#fff", border: "none", cursor: "pointer" }}
            onClick={() => setPath("Party")}
          >
            Libertarian
          </button>
          <button
            style={{ padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", backgroundColor: "#16a34a", color: "#fff", border: "none", cursor: "pointer" }}
            onClick={() => setPath("Independent")}
          >
            Independent / Write-In
          </button>
        </div>
      </div>
    );
  }

  // ===== Step 3: CandidateChat =====
  return (
    <div style={{ minHeight: "100vh", padding: "32px", backgroundColor: "#f3f4f6", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "24px" }}>
        Federal Candidate Simulator - {path} Path
      </h1>
      <CandidateChat path={path} />
    </div>
  );
}

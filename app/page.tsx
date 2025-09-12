// app/page.tsx
"use client";

import { useState } from "react";

export default function HomePage() {
  const [orientationDone, setOrientationDone] = useState(false);
  const [path, setPath] = useState<"Independent" | "Third-Party" | null>(null);
  const [office, setOffice] = useState<"President" | "Senate" | "House" | null>(null);
  const [ballotMethod, setBallotMethod] = useState<"Fee" | "Signature" | null>(null);

  // ===== Step 1: Orientation =====
  if (!orientationDone) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "16px" }}>
          🗳 Candidate Simulator Orientation
        </h2>
        <p>
          Welcome to the Candidate Simulator! This simulator is scaffolded —
          you’ll move through reading, writing, and speaking in a deliberate
          order.
        </p>
        <button
          style={{
            marginTop: "24px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#16a34a",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => setOrientationDone(true)}
        >
          Continue
        </button>
      </div>
    );
  }

  // ===== Step 2: Module 0 – Introduction =====
  if (!path) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}>
          Module 0 – Introduction
        </h2>
        <p>
          The Candidate Simulator teaches prospective federal candidates how to
          run a campaign safely and realistically.
        </p>

        <h3 style={{ marginTop: "24px" }}>👉 Choose Your Path</h3>
        <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#2563eb",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
            }}
            onClick={() => setPath("Third-Party")}
          >
            Third-Party
          </button>
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              backgroundColor: "#16a34a",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
            }}
            onClick={() => setPath("Independent")}
          >
            Independent / Write-In
          </button>
        </div>
      </div>
    );
  }

  // ===== Step 3: Office Selection =====
  if (!office) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}>
          Choose Your Office
        </h2>
        <p>
          This is where you decide what office you are running for and how you
          will seek ballot access on the way to the general election.
        </p>

        <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <button
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", cursor: "pointer" }}
            onClick={() => setOffice("President")}
          >
            🏛 President
            <div style={{ fontSize: "0.9rem", marginTop: "4px" }}>
              Fee: 75 CC + 2.5% approval • Signature: 25% nationwide
            </div>
          </button>
          <button
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", cursor: "pointer" }}
            onClick={() => setOffice("Senate")}
          >
            🏛 U.S. Senate
            <div style={{ fontSize: "0.9rem", marginTop: "4px" }}>
              Fee: 50 CC + 2.5% approval • Signature: 14% statewide
            </div>
          </button>
          <button
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", cursor: "pointer" }}
            onClick={() => setOffice("House")}
          >
            🏛 U.S. House
            <div style={{ fontSize: "0.9rem", marginTop: "4px" }}>
              Fee: 31 CC + 2.5% approval • Signature: 7% districtwide
            </div>
          </button>
        </div>
      </div>
    );
  }

  // ===== Step 4: Ballot Access Method =====
  if (!ballotMethod) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Ballot Access for {office}
        </h2>
        <p>Now choose how you want to qualify for the general election.</p>

        <div style={{ marginTop: "24px", display: "flex", gap: "16px" }}>
          <button
            style={{ padding: "12px 20px", borderRadius: "8px", backgroundColor: "#2563eb", color: "#fff", cursor: "pointer", border: "none" }}
            onClick={() => setBallotMethod("Fee")}
          >
            Pay Fee + Meet Approval
          </button>
          <button
            style={{ padding: "12px 20px", borderRadius: "8px", backgroundColor: "#16a34a", color: "#fff", cursor: "pointer", border: "none" }}
            onClick={() => setBallotMethod("Signature")}
          >
            Gather Signatures
          </button>
        </div>
      </div>
    );
  }

  // ===== Step 5: Confirmation =====
  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>✅ Path Locked In</h2>
      <p>
        You’ve chosen the <strong>{path}</strong> path, running for{" "}
        <strong>{office}</strong>, using the{" "}
        <strong>{ballotMethod}</strong> method to reach the general election.
      </p>
      <p>Next: Begin quizzes and simulator challenges.</p>
    </div>
  );
}

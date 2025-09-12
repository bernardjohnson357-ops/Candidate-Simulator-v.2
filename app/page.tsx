// app/page.tsx
"use client";

import { useState } from "react";

export default function HomePage() {
  const [orientationDone, setOrientationDone] = useState(false);

  if (!orientationDone) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "16px" }}>
          🗳 Candidate Simulator Orientation
        </h2>

        <p style={{ marginBottom: "16px" }}>
          Welcome to the Candidate Simulator!
        </p>

        <p style={{ marginBottom: "16px" }}>
          This simulator is designed to prepare you for the realities of running
          for office. Every stage is <strong>scaffolded</strong> — which means
          you’ll move through reading, writing, and speaking in a deliberate
          order.
        </p>

        <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginTop: "24px" }}>
          Why Scaffolded?
        </h3>
        <p>
          In politics, some people rely on quick talking points without deep
          understanding. This simulator is different. It forces you to:
        </p>
        <ol style={{ paddingLeft: "20px", marginBottom: "16px" }}>
          <li><strong>Read first</strong> – absorb the actual rules, guides, and case studies.</li>
          <li><strong>Write next</strong> – organize your ideas and commit them to text.</li>
          <li><strong>Speak last</strong> – deliver your message with clarity and impact.</li>
        </ol>
        <p>
          By moving step by step, you’ll build habits that separate serious
          candidates from surface-level ones.
        </p>

        <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginTop: "24px" }}>
          Candidate Coins (CC)
        </h3>
        <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
          <li>1 CC = $100 simulated campaign funds.</li>
          <li>Earn CC by passing quizzes and completing assignments.</li>
          <li>
            Spend CC on campaign resources <strong>or</strong> on{" "}
            <strong>communication coaching</strong>:
            <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
              <li><strong>Upload + Review (10 CC):</strong> Get structured feedback on your draft.</li>
              <li><strong>Revision Suggestions (15 CC):</strong> Receive guidance on improving clarity and tone.</li>
              <li><strong>Delivery Hints (20 CC):</strong> Learn pacing and communication tips.</li>
            </ul>
          </li>
        </ul>
        <p>
          The AI will never give you political advice — only feedback on
          clarity, structure, and effectiveness.
        </p>

        <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginTop: "24px" }}>
          Key Rule
        </h3>
        <p>If a task requires <strong>reading</strong>, you must read.</p>
        <p>If a task requires <strong>writing</strong>, you must type.</p>
        <p>If a task requires <strong>speaking</strong>, you must use voice input.</p>
        <p style={{ marginBottom: "24px" }}>
          That’s by design. Thinking clearly comes before speaking persuasively.
        </p>

        <button
          style={{
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

  // After Orientation, placeholder for next steps (path selection, CandidateChat, etc.)
  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Orientation Complete ✅</h2>
      <p>Next: Path selection will go here...</p>
    </div>
  );
}

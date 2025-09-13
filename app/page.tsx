// app/page.tsx
"use client";

import { useState } from "react";

// Stub components for later modules
function Module1A({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
      <h2>Module 1A – Independent / Write-In Filing</h2>
      <p>Learn Texas SOS filing requirements for independent and write-in candidates.</p>
      <div style={{ marginTop: "32px", textAlign: "right" }}>
        <button
          onClick={onNext}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function Module1B({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
      <h2>Module 1B – Party Filing</h2>
      <p>Learn Texas SOS filing requirements for party candidates.</p>
      <div style={{ marginTop: "32px", textAlign: "right" }}>
        <button
          onClick={onNext}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            backgroundColor: "#16a34a",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [currentModule, setCurrentModule] = useState(0);
  const [path, setPath] = useState<"Independent" | "Party" | null>(null);
  const [office, setOffice] = useState<"President" | "Senate" | "House" | null>(null);
  const [ballotMethod, setBallotMethod] = useState<"Fee" | "Signature" | null>(null);

  // ===== Orientation =====
  if (currentModule === 0) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2>🗳 Candidate Simulator Orientation</h2>
        <p>
          Welcome to the Candidate Simulator! This simulator prepares you for the realities of
          running for office through scaffolded learning: read → write → speak.
        </p>
        <p>
          You’ll earn Candidate Coins (CC), gain signatures, and convert them into voter approval
          as you complete tasks.
        </p>

        <div style={{ marginTop: "32px", textAlign: "right" }}>
          <button
            onClick={() => setCurrentModule(1)}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  // ===== Module 0: Introduction =====
  if (currentModule === 1) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2>Module 0 – Introduction</h2>
        <p>
          The Candidate Simulator combines real-world campaign processes (filings, ballot access,
          FEC compliance) with simulation mechanics (Candidate Coins, quizzes, signatures).
        </p>

        <h3>🏛 The Real Candidate Process</h3>
        <ol>
          <li>Choosing an Office</li>
          <li>Meeting Ballot Requirements</li>
          <li>FEC Reporting</li>
          <li>Building Voter Support</li>
        </ol>

        <h3>🎮 How the Simulator Works</h3>
        <ul>
          <li>Start with 50 Candidate Coins (CC)</li>
          <li>Quizzes simulate fundraising → earn CC + signatures</li>
          <li>Signatures convert to voter approval</li>
        </ul>

        <h3>Eligibility Example</h3>
        <p>
          President requires 75 CC + 2.5% approval (fee) or 25% nationwide (signatures). Senate
          and House have their own thresholds.
        </p>

        {/* Branch decision buttons at bottom */}
        <div style={{ marginTop: "32px", display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => {
              setPath("Party");
              setCurrentModule(2);
            }}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              backgroundColor: "#16a34a",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Third-Party Nominee
          </button>
          <button
            onClick={() => {
              setPath("Independent");
              setCurrentModule(2);
            }}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Independent / Write-In
          </button>
        </div>
      </div>
    );
  }

  // ===== Office Selection =====
  if (currentModule === 2) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2>Choose Your Office</h2>
        <p>Now select the office you’re running for.</p>

        <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {["President", "Senate", "House"].map((o) => (
            <button
              key={o}
              onClick={() => {
                setOffice(o as typeof office);
                setCurrentModule(3);
              }}
              style={{
                padding: "12px 20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              🏛 {o}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ===== Ballot Access =====
  if (currentModule === 3 && office) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2>Ballot Access for {office}</h2>
        <p>Now choose how you want to qualify for the general election.</p>

        <div style={{ marginTop: "32px", display: "flex", gap: "16px" }}>
          <button
            onClick={() => {
              setBallotMethod("Fee");
              setCurrentModule(path === "Independent" ? 4 : 5);
            }}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Pay Fee
          </button>
          <button
            onClick={() => {
              setBallotMethod("Signature");
              setCurrentModule(path === "Independent" ? 4 : 5);
            }}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              backgroundColor: "#16a34a",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Gather Signatures
          </button>
        </div>
      </div>
    );
  }

  // ===== Module 1A or 1B =====
  if (currentModule === 4 && path === "Independent") {
    return <Module1A onNext={() => setCurrentModule(6)} />;
  }
  if (currentModule === 5 && path === "Party") {
    return <Module1B onNext={() => setCurrentModule(6)} />;
  }

  // ===== Placeholder after Module 1A/1B =====
  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
      <h2>🚧 Next Module Coming Soon</h2>
      <p>
        Path: {path}, Office: {office}, Ballot: {ballotMethod}
      </p>
    </div>
  );
}
function Module1A({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
      <h2>Module 1A – Independent / Write-In Filing</h2>
      <p>
        Understand Texas state filing requirements for independent and write-in
        candidates, including SOS procedures.
      </p>
      <ul>
        <li>Learn filing deadlines</li>
        <li>Understand signature thresholds vs. fee option</li>
        <li>Prepare for federal compliance after state filing</li>
      </ul>
      <p><strong>Task:</strong> Complete quiz on independent/write-in filing requirements.</p>

      <div style={{ marginTop: "32px", textAlign: "right" }}>
        <button
          onClick={onNext}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function Module2A({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
      <h2>Module 2A – FEC Filing Quizzes (Independent)</h2>
      <p>
        Practice federal filing requirements for independent candidates,
        covering <strong>FEC Forms 1 and 2</strong>.
      </p>
      <p>
        Completing quizzes earns Candidate Coins (CC) and voter signatures,
        reinforcing compliance and campaign credibility.
      </p>
      <p><strong>Task:</strong> Multiple rounds of FEC filing quizzes.</p>

      <div style={{ marginTop: "32px", textAlign: "right" }}>
        <button
          onClick={onNext}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function Module1B({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
      <h2>Module 1B – Party Filing</h2>
      <p>
        Learn Texas SOS and federal filing requirements for party candidates.
      </p>
      <p><strong>Task:</strong> Complete quiz on party filing requirements.</p>

      <div style={{ marginTop: "32px", textAlign: "right" }}>
        <button
          onClick={onNext}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            backgroundColor: "#16a34a",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function Module2B({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
      <h2>Module 2B – FEC Filing Quizzes (Party)</h2>
      <p>
        Practice federal filing requirements for party candidates,
        covering <strong>FEC Forms 1 and 2</strong>.
      </p>
      <p>
        Completing quizzes earns Candidate Coins (CC) and voter signatures,
        simulating campaign management and compliance.
      </p>
      <p><strong>Task:</strong> Multiple rounds of FEC filing quizzes.</p>

      <div style={{ marginTop: "32px", textAlign: "right" }}>
        <button
          onClick={onNext}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            backgroundColor: "#16a34a",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [currentModule, setCurrentModule] = useState(0);
  const [path, setPath] = useState<"Independent" | "Party" | null>(null);
  const [office, setOffice] = useState<"President" | "Senate" | "House" | null>(null);
  const [ballotMethod, setBallotMethod] = useState<"Fee" | "Signature" | null>(null);

  // Orientation
  if (currentModule === 0) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2>🗳 Candidate Simulator Orientation</h2>
        <p>Welcome to the Candidate Simulator! ...</p>
        <div style={{ marginTop: "32px", textAlign: "right" }}>
          <button onClick={() => setCurrentModule(1)}>Next →</button>
        </div>
      </div>
    );
  }

  // Module 0: Intro + Path Choice
  if (currentModule === 1) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2>Module 0 – Introduction</h2>
        <p>Simulator combines real-world filings with simulation mechanics.</p>

        <div style={{ marginTop: "32px", display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => {
              setPath("Party");
              setCurrentModule(2);
            }}
          >
            Third-Party Nominee
          </button>
          <button
            onClick={() => {
              setPath("Independent");
              setCurrentModule(2);
            }}
          >
            Independent / Write-In
          </button>
        </div>
      </div>
    );
  }

  // Office Selection
  if (currentModule === 2) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2>Choose Your Office</h2>
        <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {["President", "Senate", "House"].map((o) => (
            <button
              key={o}
              onClick={() => {
                setOffice(o as typeof office);
                setCurrentModule(3);
              }}
            >
              🏛 {o}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Ballot Access
  if (currentModule === 3 && office) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2>Ballot Access for {office}</h2>
        <p>Choose how you want to qualify for the general election.</p>
        <div style={{ marginTop: "32px", display: "flex", gap: "16px" }}>
          <button
            onClick={() => {
              setBallotMethod("Fee");
              setCurrentModule(path === "Independent" ? 4 : 5);
            }}
          >
            Pay Fee
          </button>
          <button
            onClick={() => {
              setBallotMethod("Signature");
              setCurrentModule(path === "Independent" ? 4 : 5);
            }}
          >
            Gather Signatures
          </button>
        </div>
      </div>
    );
  }

  // Module 1A → Module 2A
  if (currentModule === 4 && path === "Independent") {
    return <Module1A onNext={() => setCurrentModule(6)} />;
  }
  if (currentModule === 6 && path === "Independent") {
    return <Module2A onNext={() => setCurrentModule(10)} />;
  }

  // Module 1B → Module 2B
  if (currentModule === 5 && path === "Party") {
    return <Module1B onNext={() => setCurrentModule(7)} />;
  }
  if (currentModule === 7 && path === "Party") {
    return <Module2B onNext={() => setCurrentModule(10)} />;
  }

  // Merge to General Election branch (after Module 2A/2B)
  if (currentModule === 10) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2>✅ Filing Phase Complete</h2>
        <p>
          You’ve completed Modules 1 & 2. Next: Enter the General Election branch —
          campaign spending, team building, and scenarios begin.
        </p>
      </div>
    );
  }

  return null;
}

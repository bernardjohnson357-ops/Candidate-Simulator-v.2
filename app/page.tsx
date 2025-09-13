// app/page.tsx
"use client";

import { useState } from "react";

// ===== Helper Components (no default export here) =====
function Module1A({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
      <h2>Module 1A – Independent / Write-In Filing</h2>
      <p>
        Understand Texas state filing requirements for independent and write-in
        candidates, including SOS procedures.
      </p>
      <p><strong>Task:</strong> Complete quiz on independent/write-in filing requirements.</p>
      <div style={{ marginTop: "32px", textAlign: "right" }}>
        <button onClick={onNext}>Next →</button>
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
      <p><strong>Task:</strong> Multiple rounds of FEC filing quizzes.</p>
      <div style={{ marginTop: "32px", textAlign: "right" }}>
        <button onClick={onNext}>Next →</button>
      </div>
    </div>
  );
}

function Module1B({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
      <h2>Module 1B – Party Filing</h2>
      <p>Learn Texas SOS and federal filing requirements for party candidates.</p>
      <p><strong>Task:</strong> Complete quiz on party filing requirements.</p>
      <div style={{ marginTop: "32px", textAlign: "right" }}>
        <button onClick={onNext}>Next →</button>
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
      <p><strong>Task:</strong> Multiple rounds of FEC filing quizzes.</p>
      <div style={{ marginTop: "32px", textAlign: "right" }}>
        <button onClick={onNext}>Next →</button>
      </div>
    </div>
  );
}

// ===== Main Page =====
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
        <p>
          Welcome to the Candidate Simulator! This simulator prepares you for
          the realities of running for office through scaffolded learning:
          read → write → speak.
        </p>
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
        <p>
          The simulator combines real-world campaign processes (filings,
          ballot access, FEC compliance) with simulation mechanics
          (Candidate Coins, quizzes, signatures).
        </p>
        <div style={{ marginTop: "32px", display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => { setPath("Party"); setCurrentModule(2); }}>
            Third-Party Nominee
          </button>
          <button onClick={() => { setPath("Independent"); setCurrentModule(2); }}>
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
              onClick={() => { setOffice(o as typeof office); setCurrentModule(3); }}
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
            onClick={() => { setBallotMethod("Fee"); setCurrentModule(path === "Independent" ? 4 : 5); }}
          >
            Pay Fee
          </button>
          <button
            onClick={() => { setBallotMethod("Signature"); setCurrentModule(path === "Independent" ? 4 : 5); }}
          >
            Gather Signatures
          </button>
        </div>
      </div>
    );
  }

  // Independent Path → Module 1A → Module 2A
  if (currentModule === 4 && path === "Independent") {
    return <Module1A onNext={() => setCurrentModule(6)} />;
  }
  if (currentModule === 6 && path === "Independent") {
    return <Module2A onNext={() => setCurrentModule(10)} />;
  }

  // Party Path → Module 1B → Module 2B
  if (currentModule === 5 && path === "Party") {
    return <Module1B onNext={() => setCurrentModule(7)} />;
  }
  if (currentModule === 7 && path === "Party") {
    return <Module2B onNext={() => setCurrentModule(10)} />;
  }

  // Merge to General Election
  if (currentModule === 10) {
    return (
      <div style={{ maxWidth: "768px", margin: "0 auto", padding: "32px" }}>
        <h2>✅ Filing Phase Complete</h2>
        <p>
          You’ve completed Modules 1 & 2. Next: Enter the General Election branch —
          campaign spending, team building, and scenarios begin.
        </p>
        <div style={{ marginTop: "32px", textAlign: "right" }}>
          <button onClick={() => setCurrentModule(11)}>Next →</button>
        </div>
      </div>
    );
  }

  return null;
}

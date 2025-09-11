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
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold">🗳 Candidate Simulator Orientation</h2>

        <Card>
          <div className="space-y-4 p-6">
            <p>
              Welcome to the Candidate Simulator! This simulator is designed to
              prepare you for the realities of running for office. Every stage is{" "}
              <strong>scaffolded</strong> — you move through reading, writing, and speaking in order.
            </p>

            <h3 className="text-xl font-semibold">📚 Why Scaffolded?</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Read first</strong> – absorb the rules, guides, and case studies.</li>
              <li><strong>Write next</strong> – organize ideas and commit to text.</li>
              <li><strong>Speak last</strong> – deliver your message clearly and persuasively.</li>
            </ul>

            <h3 className="text-xl font-semibold">💰 Candidate Coins (CC)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>1 CC = $100 simulated campaign funds.</li>
              <li>Earn CC by passing quizzes and completing assignments.</li>
              <li>Spend CC on campaign resources or communication coaching.</li>
            </ul>

            <h3 className="text-xl font-semibold">⚖️ Key Rule</h3>
            <p>Tasks must be completed in order: Read → Write → Speak.</p>
          </div>
        </Card>

        <button
          className="px-4 py-2 bg-green-600 text-white rounded mt-4"
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
      <div className="p-8 max-w-3xl mx-auto space-y-6">
        <p className="mb-2 font-semibold">Choose your path to start the simulation:</p>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setPath("Party")}
          >
            Libertarian
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
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
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Federal Candidate Simulator - {path} Path</h1>
      <CandidateChat path={path} />
    </div>
  );
}

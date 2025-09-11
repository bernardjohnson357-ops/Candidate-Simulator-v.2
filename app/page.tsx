// app/page.tsx
"use client";

import { useState } from "react";
import CandidateChat from "./components/CandidateChat";

export default function HomePage() {
  const [orientationDone, setOrientationDone] = useState(false);
  const [path, setPath] = useState<"Party" | "Independent" | null>(null);

  // ===== Step 1: Orientation =====
  if (!orientationDone) {
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">🗳 Candidate Simulator Orientation</h2>

        <p>
          Welcome to the Candidate Simulator! This simulator prepares you for the realities of running for office. Every stage is scaffolded — you’ll move through reading, writing, and speaking in a deliberate order.
        </p>

        <h3 className="font-semibold">Why Scaffolded?</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Read first</strong> – absorb the actual rules, guides, and case studies.</li>
          <li><strong>Write next</strong> – organize your ideas and commit them to text.</li>
          <li><strong>Speak last</strong> – deliver your message with clarity and impact.</li>
        </ol>

        <h3 className="font-semibold">Candidate Coins (CC)</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>1 CC = $100 simulated campaign funds.</li>
          <li>Earn CC by passing quizzes and completing assignments.</li>
          <li>Spend CC on campaign resources or communication coaching.</li>
        </ul>

        <h3 className="font-semibold">Module 0 – Introduction</h3>
        <p>The simulator teaches federal candidates how to run a campaign safely and realistically, combining real-world processes and simulation mechanics. By the end, you understand federal filing, ballot access, CC, voter signatures, and quizzes.</p>

        <h3 className="font-semibold">Start the Simulation</h3>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
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
        <div className="space-x-4">
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
  return <CandidateChat path={path!} />;
}

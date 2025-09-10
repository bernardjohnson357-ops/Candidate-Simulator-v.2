// app/page.tsx
"use client";

import { useState } from "react";
import CandidateChat from "./components/CandidateChat";

export default function HomePage() {
  const [path, setPath] = useState<"Party" | "Independent" | null>(null);

  // Step 0: Homepage path selection + Module 0 info
  if (!path) {
    return (
      <div className="flex flex-col items-start p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to Federal Candidate Simulator - AI
        </h1>

        {/* Module 0 Content */}
        <h2 className="text-xl font-bold mb-2">Module 0 – Introduction</h2>
        <div className="mb-6">
          <h3 className="font-bold mb-2">🎯 Purpose</h3>
          <p className="mb-2">
            The Candidate Simulator teaches prospective federal candidates—especially independents and third-party hopefuls—how to run a campaign safely and realistically. It combines real-world processes (laws, FEC filings, ballot access) and simulation mechanics (Candidate Coins, quizzes, voter signatures, scenario-based decision-making).
          </p>

          <h3 className="font-bold mb-2">🏛️ The Real Candidate Process</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Choose an Office: President, U.S. Senate, or U.S. House.</li>
            <li>Meet Ballot Requirements: Pay fees or gather signatures.</li>
            <li>FEC Reporting: File quarterly after campaign activity.</li>
            <li>Build Voter Support: Develop campaign identity and approval.</li>
          </ul>

          <h3 className="font-bold mb-2">🎮 How the Simulator Works</h3>
          <ul className="list-disc list-inside mb-2">
            <li>Start with 50 Candidate Coins (CC).</li>
            <li>Choose a ballot access path: Independent, Third-Party, or Write-In.</li>
            <li>Candidate Coins simulate fundraising; quizzes and tasks earn CC and signatures.</li>
            <li>Signatures represent voter approval (1 signature = 0.0001 approval).</li>
            <li>General Election eligibility requires minimum CC, signatures, or fee payments depending on path.</li>
          </ul>

          <h4 className="font-semibold mb-1">Quizzes & Retakes</h4>
          <ul className="list-disc list-inside">
            <li>All quizzes: 1 retake allowed without penalty.</li>
            <li>FEC quizzes: Triggered after spending 50+ CC.</li>
            <li>Penalties:
              <ul className="list-disc list-inside ml-5">
                <li>Wrong multiple-choice: –1 CC</li>
                <li>Wrong open-ended: –50 signatures</li>
                <li>Retake mistakes double the penalty (“FEC administrative fees”).</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Path selection buttons */}
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

  // Step 1: Once path is chosen, go directly to chat
  return <CandidateChat path={path} />;
}

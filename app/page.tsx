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
            The Candidate Simulator is an educational platform that helps prospective federal candidates, especially independents and third-party hopefuls, understand and practice the steps required to run a campaign. The simulator is instructional and focuses on campaign logistics, filing requirements, and resource management.
          </p>

          <h3 className="font-bold mb-2">🏛️ The Real Candidate Process</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Choose an Office: President, U.S. Senate, or U.S. House.</li>
            <li>Meet filing and ballot requirements according to your chosen path.</li>
            <li>Track and manage campaign resources and voter support through structured exercises.</li>
          </ul>

          <h3 className="font-bold mb-2">🎮 How the Simulator Works</h3>
          <ul className="list-disc list-inside mb-2">
            <li>Each participant starts with <strong>50 Candidate Coins (CC)</strong>, representing simulated campaign resources.</li>
            <li>Choose a ballot access path: Independent, Third-Party, or Write-In.</li>
            <li>Structured exercises simulate the allocation of resources and the accumulation of voter support.</li>
            <li>Signatures represent voter support (1 signature = 0.0001 approval).</li>
            <li>Eligibility for the General Election depends on completing filing requirements and demonstrating sufficient voter support.</li>
          </ul>

          <h4 className="font-semibold mb-1">Exercising Resources and Voter Support</h4>
          <ul className="list-disc list-inside">
            <li>Tasks and quizzes are exercises in campaign management, allocating resources (CC) and building voter support (signatures).</li>
            <li>Retakes are allowed for educational purposes, with simulated consequences for errors to reinforce learning.</li>
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

// app/page.tsx
"use client";

import { useState } from "react";
import CandidateChat from "./components/CandidateChat";

export default function HomePage() {
  const [path, setPath] = useState<"Party" | "Independent" | null>(null);

  // ===== Orientation / Module 0 =====
  if (!path) {
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">🗳 Candidate Simulator Orientation</h2>

        <p>
          Welcome to the Candidate Simulator! This simulator is designed to prepare you for the realities of running for office. Every stage is scaffolded — which means you’ll move through reading, writing, and speaking in a deliberate order.
        </p>

        <h3 className="font-semibold">Why Scaffolded?</h3>
        <p>In politics, some people rely on quick talking points without deep understanding. This simulator is different. It forces you to:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Read first</strong> – absorb the actual rules, guides, and case studies.</li>
          <li><strong>Write next</strong> – organize your ideas and commit them to text.</li>
          <li><strong>Speak last</strong> – deliver your message with clarity and impact.</li>
        </ol>

        <h3 className="font-semibold">Candidate Coins (CC)</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>1 CC = $100 simulated campaign funds.</li>
          <li>Earn CC by passing quizzes and completing assignments.</li>
          <li>Spend CC on campaign resources or communication coaching:
            <ul className="list-disc list-inside ml-4">
              <li><strong>Upload + Review (10 CC)</strong>: Get structured feedback on your draft.</li>
              <li><strong>Revision Suggestions (15 CC)</strong>: Receive guidance on improving clarity and tone.</li>
              <li><strong>Delivery Hints (20 CC)</strong>: Learn pacing and communication tips.</li>
            </ul>
          </li>
        </ul>

        <h3 className="font-semibold">Key Rule</h3>
        <p>If a task requires <strong>reading</strong>, you must read. If it requires <strong>writing</strong>, you must type. If it requires <strong>speaking</strong>, you must use voice input. That’s by design — thinking clearly comes before speaking persuasively.</p>

        <h2 className="text-xl font-bold">Module 0 – Introduction</h2>

        <h3 className="font-semibold">🎯 Purpose</h3>
        <p>The Candidate Simulator teaches prospective federal candidates—especially independents and third-party hopefuls—how to run a campaign safely and realistically. It combines:</p>
        <ul className="list-disc list-inside">
          <li><strong>Real-World Processes</strong>: Laws, FEC filing requirements, ballot access, and official guides.</li>
          <li><strong>Simulation Mechanics</strong>: Candidate Coins (CC), quizzes, voter signatures, and scenario-based decision-making.</li>
        </ul>

        <h3 className="font-semibold">🏛️ The Real Candidate Process</h3>
        <ol className="list-decimal list-inside">
          <li>Choosing an Office: President, U.S. Senate, or U.S. House.</li>
          <li>Meeting Ballot Requirements: Paying fees or gathering signatures.</li>
          <li>FEC Reporting: Filing Forms 1 & 2 at the start, then Form 3 quarterly.</li>
          <li>Building Voter Support: Developing a campaign identity and gaining approval.</li>
        </ol>

        <h3 className="font-semibold">🎮 How the Simulator Works</h3>
        <ul className="list-disc list-inside">
          <li>Each participant starts with <strong>50 CC</strong>.</li>
          <li>Choose a ballot access path: Independent, Third-Party, or Write-In.</li>
          <li>Your choice determines your simulator branch.</li>
        </ul>

        <h3 className="font-semibold">Candidate Coin (CC) System</h3>
        <ul className="list-disc list-inside">
          <li>1 CC = $100 simulated.</li>
          <li>Quizzes simulate fundraising: correct answers earn CC and signatures.</li>
        </ul>

        <h3 className="font-semibold">Signatures → Voter Approval</h3>
        <p>1 signature = 0.0001 voter approval.<br/>
        Example: 100 signatures = 1% approval; 1,000 signatures = 10% approval.</p>

        <h3 className="font-semibold">Eligibility for the General Election</h3>
        <ul className="list-disc list-inside">
          <li><strong>Fee Option</strong>: pay CC + minimum approval
            <ul className="list-disc list-inside ml-4">
              <li>President: 75 CC + 2.5% approval</li>
              <li>Senate: 50 CC + 2.5% approval</li>
              <li>House: 31 CC + 2.5% approval</li>
            </ul>
          </li>
          <li><strong>Signature Option</strong>: no fee
            <ul className="list-disc list-inside ml-4">
              <li>President: 25% nationwide</li>
              <li>Senate: 14% statewide</li>
              <li>House: 7% districtwide</li>
            </ul>
          </li>
        </ul>

        <h3 className="font-semibold">Quizzes & Retakes</h3>
        <ul className="list-disc list-inside">
          <li>1 free retake per quiz.</li>
          <li>Wrong answers: –1 CC or –50 signatures; retake mistakes double the penalty.</li>
          <li>Score ≥ 80%: +80 signatures + 1 CC.</li>
          <li>Score 100%: +100 signatures + 2 CC.</li>
        </ul>

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

  // ===== Step 1: Path chosen → go to CandidateChat =====
  return <CandidateChat path={path!} />;
}

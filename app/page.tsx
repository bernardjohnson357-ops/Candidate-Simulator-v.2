// app/page.tsx
"use client";

import { useState } from "react";
import Onboarding, { OnboardingPath, FilingOption } from "./components/Onboarding";

export default function HomePage() {
  const [path, setPath] = useState<OnboardingPath | null>(null);
  const [filingOption, setFilingOption] = useState<FilingOption | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  // Step 0: Homepage path selection
  if (!path) {
    return (
      <div className="flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to Federal Candidate Simulator - AI
        </h1>
        <h2 className="text-xl mb-2">Module 0 – Introduction</h2>
<div className="mb-4">
  <h3 className="font-bold mb-2">🎯 Purpose</h3>
  <p className="mb-2">
    The Candidate Simulator teaches prospective federal candidates—especially independents and third-party hopefuls—how to run a campaign safely and realistically. It combines:
  </p>
  <ul className="list-disc list-inside mb-2">
    <li>Real-World Processes: Laws, FEC filing requirements, ballot access, and official guides.</li>
    <li>Simulation Mechanics: Candidate Coins (CC), quizzes, voter signatures, and scenario-based decision-making.</li>
  </ul>
  <p className="mb-4">By the end, participants understand both what real candidates must do and how to practice these steps in a simulation.</p>

  <h3 className="font-bold mb-2">🏛️ The Real Candidate Process</h3>
  <ul className="list-disc list-inside mb-4">
    <li>Choosing an Office: President, U.S. Senate, or U.S. House.</li>
    <li>Meeting Ballot Requirements: Paying fees or gathering signatures.</li>
    <li>FEC Reporting: Filing quarterly once campaign activity crosses financial thresholds.</li>
    <li>Building Voter Support: Developing a campaign identity and gaining approval.</li>
  </ul>
  <p className="mb-4">Sources: FEC Candidate Guide (2024 edition), State Candidate Filing Guides.</p>

  <h3 className="font-bold mb-2">🎮 How the Simulator Works</h3>
  <p className="mb-2">Starting Conditions: Each participant starts with 50 Candidate Coins (CC).</p>
  <p className="mb-2">Choose a ballot access path:</p>
  <ul className="list-disc list-inside mb-2">
    <li>Independent Candidate</li>
    <li>Third-Party Nominee</li>
    <li>Write-In Candidate</li>
  </ul>
  <p className="mb-2">Your choice determines your simulator branch (Modules 1A, 1B, or Write-In).</p>

  <h4 className="font-semibold mb-1">Candidate Coin (CC) System</h4>
  <ul className="list-disc list-inside mb-2">
    <li>1 CC = $100 (simulated)</li>
    <li>Quizzes simulate fundraising: correct answers earn CC and signatures.</li>
    <li>Scoring Example:
      <ul className="list-disc list-inside ml-5">
        <li>80%+ → % of signatures + 1 CC</li>
        <li>100% → 100 signatures + 2 CC</li>
      </ul>
    </li>
  </ul>

  <h4 className="font-semibold mb-1">Signatures → Voter Approval</h4>
  <p className="mb-2">1 signature = 0.0001 voter approval. Example: 100 signatures = 1% approval; 1,000 signatures = 10% approval.</p>

  <h4 className="font-semibold mb-1">Eligibility for the General Election</h4>
  <p className="mb-2">Fee Option (pay CC + minimum approval):</p>
  <ul className="list-disc list-inside mb-2">
    <li>President: 75 CC + 2.5%</li>
    <li>Senate: 50 CC + 2.5%</li>
    <li>House: 31 CC + 2.5%</li>
  </ul>
  <p className="mb-2">Signature Option (no fee):</p>
  <ul className="list-disc list-inside mb-2">
    <li>President: 25% nationwide</li>
    <li>Senate: 14% statewide</li>
    <li>House: 7% districtwide</li>
  </ul>

  <h4 className="font-semibold mb-1">Quizzes & Retakes</h4>
  <ul className="list-disc list-inside mb-2">
    <li>All quizzes: 1 retake allowed without penalty.</li>
    <li>Form 3 Quizzes (FEC filings): Triggered after spending 50+ CC.</li>
    <li>Penalties for errors:
      <ul className="list-disc list-inside ml-5">
        <li>Wrong multiple-choice: –1 CC</li>
        <li>Wrong open-ended: –50 signatures</li>
        <li>Retake mistakes double the penalty (“FEC administrative fees”).</li>
      </ul>
    </li>
  </ul>
</div>
        
        <p className="mb-4">Choose your path:</p>

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

  // Once path is chosen, immediately go to chat
  return <CandidateChat path={path} />;
}
  
  // Step 1: Office + Filing Option selection
  if (path && !filingOption) {
    return (
      <div className="flex flex-col items-center p-6">
        <h2 className="text-xl font-bold mb-4">Select Your Office</h2>
        <p className="mb-4">Which office are you seeking?</p>
        <div className="space-x-4 mb-8">
          <button className="px-4 py-2 bg-purple-600 text-white rounded">
            President
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded">
            Senate
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded">
            House
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Choose how you wish to seek the General Election</h2>
        <div className="space-x-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setFilingOption("signatures")}
          >
            Collect Signatures
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setFilingOption("filingFee")}
          >
            Pay Filing Fee
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Run onboarding simulator
  return (
    <Onboarding
      path={path!}
      filingOption={filingOption!}
      onComplete={(p, o) => {
        setOnboardingComplete(true);
        console.log("Onboarding complete:", p, o);
      }}
    />
  );
}

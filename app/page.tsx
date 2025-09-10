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
<p "🎯 Purpose
The Candidate Simulator teaches prospective federal candidates—especially independents and third-party hopefuls—how to run a campaign safely and realistically.
It combines:
Real-World Processes: Laws, FEC filing requirements, ballot access, and official guides.
Simulation Mechanics: Candidate Coins (CC), quizzes, voter signatures, and scenario-based decision-making.
By the end, participants understand both what real candidates must do and how to practice these steps in a simulation.

🏛️ The Real Candidate Process
Running for federal office in the U.S. involves:
Choosing an Office: President, U.S. Senate, or U.S. House.
Meeting Ballot Requirements: Paying fees or gathering signatures.
FEC Reporting: Filing quarterly once campaign activity crosses financial thresholds.
Building Voter Support: Developing a campaign identity and gaining approval.
Sources: FEC Candidate Guide (2024 edition), State Candidate Filing Guides.

🎮 How the Simulator Works
Starting Conditions
Each participant starts with 50 Candidate Coins (CC).
Choose a ballot access path:
Independent Candidate
Third-Party Nominee
Write-In Candidate
Your choice determines your simulator branch (Modules 1A, 1B, or Write-In).

Candidate Coin (CC) System
1 CC = $100 (simulated)
Quizzes simulate fundraising: correct answers earn CC and signatures.
Scoring Example:
80%+ → % of signatures + 1 CC
100% → 100 signatures + 2 CC

Signatures → Voter Approval
1 signature = 0.0001 voter approval
Example: 100 signatures = 1% approval; 1,000 signatures = 10% approval.

Eligibility for the General Election
Fee Option (pay CC + minimum approval)
Office
Fee (CC)
Voter Approval
President
75 CC
2.5%
Senate
50 CC
2.5%
House
31 CC
2.5%

Signature Option (no fee)
Office
Voter Approval Required
President
25% nationwide
Senate
14% statewide
House
7% districtwide


Quizzes & Retakes
All quizzes: 1 retake allowed without penalty.
Form 3 Quizzes (FEC filings): Triggered after spending 50+ CC.
Penalties for errors:
Wrong multiple-choice: –1 CC
Wrong open-ended: –50 signatures
Retake mistakes double the penalty (“FEC administrative fees”).
" </p>
        
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

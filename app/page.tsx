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

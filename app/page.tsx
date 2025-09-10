// app/page.tsx
"use client";

import { useState } from "react";
import Onboarding, { OnboardingPath, FilingOption } from "@/components/Onboarding";
import CandidateChat from "@/components/CandidateChat";

export default function Page() {
  const [userPath, setUserPath] = useState<OnboardingPath | null>(null);
  const [filingOption, setFilingOption] = useState<FilingOption | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 gap-10">
      <h1 className="text-3xl font-bold mb-6">Federal Candidate Simulator</h1>

      {/* Step 1: Onboarding */}
      {!onboardingComplete && (
        <Onboarding
          onComplete={(path, option) => {
            setUserPath(path);
            setFilingOption(option);
            setOnboardingComplete(true);
          }}
        />
      )}

      {/* Step 2: AI-driven chat */}
      {onboardingComplete && userPath && filingOption && (
        <CandidateChat path={userPath} option={filingOption} startingCC={50} />
      )}
    </div>
  );
}

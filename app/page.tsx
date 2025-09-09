// app/page.tsx
"use client";
import { useState } from "react";
import Onboarding from "./components/Onboarding";
import CandidateInteraction from "./components/CandidateInteraction";

export default function Page() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [userPath, setUserPath] = useState<"independent" | "thirdParty" | null>(null);
  const [filingOption, setFilingOption] = useState<"payFee" | "signatures" | null>(null);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Federal Candidate Simulator – AI Edition
      </h1>

      {!onboardingComplete && (
        <Onboarding
          onComplete={(path, option) => {
            setUserPath(path);
            setFilingOption(option);
            setOnboardingComplete(true);
          }}
        />
      )}

      {onboardingComplete && userPath && filingOption && (
        <CandidateInteraction
          userPath={userPath}
          filingOption={filingOption}
        />
      )}
    </div>
  );
}

// components/Onboarding.tsx
"use client";
import { useState } from "react";

export type OnboardingPath = "independent" | "thirdParty";
export type FilingOption = "payFee" | "signatures";

type OnboardingProps = {
  onComplete: (path: OnboardingPath, option: FilingOption) => void;
};

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [path, setPath] = useState<OnboardingPath | null>(null);
  const [cc, setCC] = useState(50); // Candidate Coins
  const [signatures, setSignatures] = useState(0);

  const handleStartSimulation = (option: FilingOption) => {
    if (!path) return;
    // Optionally update CC or signatures before completing
    onComplete(path, option);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Branch selection */}
      {!path && (
        <div className="flex gap-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
            onClick={() => setPath("independent")}
          >
            Independent / Write-In
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
            onClick={() => setPath("thirdParty")}
          >
            Third-Party Nominee
          </button>
        </div>
      )}

      {/* Filing options */}
      {path && (
        <div className="flex gap-4 mt-4">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded"
            onClick={() => handleStartSimulation("payFee")}
          >
            Pay Filing Fee
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded"
            onClick={() => handleStartSimulation("signatures")}
          >
            Gather Signatures (In Lieu of Fee)
          </button>
        </div>
      )}

      {/* Dashboard */}
      <div className="flex gap-6 mt-6">
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h3 className="font-semibold">Candidate Coins (CC)</h3>
          <p className="text-2xl font-bold">{cc}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h3 className="font-semibold">Signatures</h3>
          <p className="text-2xl font-bold">{signatures}</p>
        </div>
      </div>
    </div>
  );
}

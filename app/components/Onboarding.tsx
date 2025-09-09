"use client";
import { useState } from "react";

type OnboardingProps = {
  onComplete: (path: "independent" | "thirdParty", option: "payFee" | "signatures") => void;
};

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [path, setPath] = useState<"independent" | "thirdParty" | null>(null);
  const [cc, setCC] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [totalRaised, setTotalRaised] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  const cashOnHand = totalRaised - totalSpent;

  const handleStartSimulation = (option: "payFee" | "signatures") => {
    onComplete(path!, option);
  };

  return (
    <div className="flex flex-col items-center gap-6">

<div className="bg-gray-100 p-4 rounded-lg mb-6">
  <h2 className="text-xl font-semibold mb-2">Welcome to the Federal Candidate Simulator!</h2>
  <p className="mb-1">This dashboard shows your campaign resources and helps you make decisions safely, just like a real federal candidate.</p>
  <ul className="list-disc list-inside">
    <li><strong>Candidate Coins (CC)</strong> – Earn by completing quizzes and spend on campaign actions.</li>
    <li><strong>Signatures</strong> – Represent voter approval for ballot access.</li>
    <li><strong>Campaign Bank</strong> – Tracks total raised, total spent, and cash on hand for FEC compliance.</li>
    <li><strong>Branch Selection</strong> – Choose Independent / Write-In or Third-Party to start your campaign path.</li>
  </ul>
  <p className="mt-2 font-semibold">Tip: Watch your resources carefully—they affect your eligibility and success in the simulation!</p>
</div>
      
      {/* Dashboard */}
      <div className="flex flex-wrap gap-6 justify-center mb-8">
        <div className="bg-white shadow-md rounded-lg px-6 py-4 text-center">
          <h3 className="font-semibold text-lg">Candidate Coins (CC)</h3>
          <p className="text-2xl font-bold">{cc}</p>
          <div className="mt-2 flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => { setCC(cc + 2); setTotalRaised(totalRaised + 200); setSignatures(signatures + 50); }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Earn 2 CC (Quiz)
            </button>
            <button
              onClick={() => { if(cc>=5){setCC(cc-5); setTotalSpent(totalSpent+500);} }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Spend 5 CC (Action)
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg px-6 py-4 text-center">
          <h3 className="font-semibold text-lg">Signatures</h3>
          <p className="text-2xl font-bold">{signatures}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg px-6 py-4 text-center">
          <h3 className="font-semibold text-lg">Campaign Bank</h3>
          <p>Total Raised: ${totalRaised}</p>
          <p>Total Spent: ${totalSpent}</p>
          <p className="text-xl font-bold">Cash on Hand: ${cashOnHand}</p>
        </div>
      </div>

      {/* Branch Selection */}
      {!path && (
        <div className="flex flex-col md:flex-row gap-6">
          <button onClick={() => setPath("independent")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg shadow-lg">
            Independent / Write-In
          </button>
          <button onClick={() => setPath("thirdParty")} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-4 rounded-lg shadow-lg">
            Third-Party Nominee
          </button>
        </div>
      )}

      {/* Filing Option */}
      {path && (
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          <button onClick={() => handleStartSimulation("payFee")} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-4 rounded-lg shadow-lg">
            Pay Filing Fee
          </button>
          <button onClick={() => handleStartSimulation("signatures")} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-4 rounded-lg shadow-lg">
            Gather Signatures (In Lieu of Fee)
          </button>
        </div>
      )}
    </div>
  );
}

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
      {/* Context Panel */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl text-left">
        <h2 className="text-2xl font-bold mb-4">Understanding the Simulator</h2>
        <p className="mb-4">
          The Candidate Simulator helps you understand <strong>real federal campaign requirements</strong> 
          while letting you practice those steps in a safe, simulated environment. This is not a game—each 
          part of the dashboard reflects actual processes.
        </p>

        <h3 className="text-lg font-semibold">Candidate Coins (CC)</h3>
        <p className="mb-4">
          <strong>Real World:</strong> Candidates raise money through contributions, deposit it into a 
          campaign bank account, and report it to the FEC. <br />
          <strong>Simulation:</strong> CC represent campaign funds. 1 CC = $100. Your dashboard shows 
          how much you’ve raised, spent, and your cash on hand, mirroring FEC reporting.
        </p>

        <h3 className="text-lg font-semibold">Signatures & Voter Approval</h3>
        <p className="mb-4">
          <strong>Real World:</strong> Ballot access requires petition signatures or filing fees. 
          Voter support is built through outreach. <br />
          <strong>Simulation:</strong> Signatures equal voter approval. Gathering enough can substitute 
          for paying a filing fee, just as in real elections.
        </p>

        <h3 className="text-lg font-semibold">Campaign Bank</h3>
        <p className="mb-4">
          <strong>Real World:</strong> Federal candidates must use a dedicated campaign bank account and 
          file quarterly reports (Form 3) with the FEC. <br />
          <strong>Simulation:</strong> Your dashboard tracks total funds raised, spent, and cash on hand. 
          Later modules simulate FEC filings for compliance practice.
        </p>

        <h3 className="text-lg font-semibold">Modules & Decisions</h3>
        <p>
          <strong>Real World:</strong> Campaigns involve filings, strategy, and compliance reporting. <br />
          <strong>Simulation:</strong> Each module mirrors a campaign stage. Your decisions will affect CC, 
          signatures, and voter approval, just as real candidates’ choices affect their campaigns.
        </p>
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

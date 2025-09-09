// pages/index.tsx
import { useState } from "react";

export default function Home() {
  const [path, setPath] = useState<"independent" | "thirdParty" | null>(null);
  const [cc, setCC] = useState(50); // Candidate Coins
  const [signatures, setSignatures] = useState(0); // Voter support
  const [totalRaised, setTotalRaised] = useState(0); // Total money earned
  const [totalSpent, setTotalSpent] = useState(0); // Total money spent

  const cashOnHand = totalRaised - totalSpent;

  const handleSelectPath = (selectedPath: "independent" | "thirdParty") => {
    setPath(selectedPath);
  };

  // Simulate earning CC and money through quizzes
  const handleEarnCC = (earnedCC: number) => {
    setCC(prev => prev + earnedCC);
    setTotalRaised(prev => prev + earnedCC * 100); // 1 CC = $100
    setSignatures(prev => prev + earnedCC * 50); // example: 50 signatures per CC
  };

  // Simulate spending CC/money on campaign actions
  const handleSpendCC = (spentCC: number) => {
    if (spentCC > cc) {
      alert("Not enough Candidate Coins!");
      return;
    }
    setCC(prev => prev - spentCC);
    setTotalSpent(prev => prev + spentCC * 100); // 1 CC = $100
  };

  const handleStartSimulation = (option: "payFee" | "signatures") => {
    alert(
      `Path: ${path}\nFiling Option: ${option}\nCC: ${cc}\nSignatures: ${signatures}\nTotal Raised: $${totalRaised}\nTotal Spent: $${totalSpent}\nCash on Hand: $${cashOnHand}`
    );
    // Later: route to Module 1A/1B with state
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-2 text-center">
        Federal Candidate Simulator – AI Edition
      </h1>
      <p className="text-lg text-center mb-8">
        Learn, practice, and simulate a federal campaign safely.
      </p>

      {/* Dashboard */}
      <div className="flex flex-wrap gap-6 mb-8 justify-center">
        <div className="bg-white shadow-md rounded-lg px-6 py-4 text-center">
          <h3 className="font-semibold text-lg">Candidate Coins (CC)</h3>
          <p className="text-2xl font-bold">{cc}</p>
          <button
            onClick={() => handleEarnCC(2)}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Earn 2 CC (Quiz)
          </button>
          <button
            onClick={() => handleSpendCC(5)}
            className="mt-2 ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Spend 5 CC (Campaign Action)
          </button>
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

      {/* Choose Path */}
      {!path && (
        <div className="flex flex-col md:flex-row gap-6">
          <button
            onClick={() => handleSelectPath("independent")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg shadow-lg transition"
          >
            Independent / Write-In
          </button>
          <button
            onClick={() => handleSelectPath("thirdParty")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-4 rounded-lg shadow-lg transition"
          >
            Third-Party Nominee
          </button>
        </div>
      )}

      {/* Filing Option */}
      {path && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            {path === "independent"
              ? "Independent / Write-In Path"
              : "Third-Party Path"}
          </h2>
          <p className="mb-6">Choose your filing method to start your campaign:</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button
              onClick={() => handleStartSimulation("payFee")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-4 rounded-lg shadow-lg transition"
            >
              Pay Filing Fee
            </button>
            <button
              onClick={() => handleStartSimulation("signatures")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-4 rounded-lg shadow-lg transition"
            >
              Gather Signatures (In Lieu of Fee)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

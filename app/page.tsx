// app/page.tsx
"use client";
import { useCandidate } from "./context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Orientation() {
  const { setCurrentModule, setCandidateCoins, setSignatures, setVoterApproval, setPath } = useCandidate();
  const router = useRouter();

  const startSimulation = () => {
    setCandidateCoins(50);
    setSignatures(0);
    setVoterApproval(0);
    setPath(null);
    setCurrentModule("0");
    router.push("/module0");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">🗳 Candidate Simulator Orientation</h1>
      <p>Welcome! This simulator prepares you for the realities of running for office.</p>
      <p>Follow the scaffolded approach: Read → Write → Speak.</p>
      <p>Earn CC through quizzes and assignments, spend on campaign resources or coaching.</p>
      <p>AI only coaches on clarity and structure — no political advice.</p>
      <button
        onClick={startSimulation}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}

// app/module6/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module6() {
  const { setCurrentModule, setCandidateCoins } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    // Example: simulate FEC quiz penalty/reward
    setCandidateCoins((prev: number) => prev - 1); // penalty
    setCurrentModule("7");
    router.push("/module7");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 6 – September: FEC Compliance & Scenarios</h1>
      <p>
        🎯 Purpose: Complete quarterly FEC Form 3 quiz and respond to canvassing & Constitution Day scenarios.
      </p>
      <p>
        📝 Task: File reports accurately and handle real-world campaign situations.
      </p>

      <button
        onClick={handleNext}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}

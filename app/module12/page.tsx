// app/module12/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module12() {
  const { setCurrentModule, setCandidateCoins } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    // Example: good TV performance = ad boost
    setCandidateCoins((prev: number) => prev + 3);
    setCurrentModule("13");
    router.push("/module13");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 12 – October 31: Television Interview</h1>
      <p>
        🎯 Purpose: Face softball, policy, and “gotcha” interview phases, closing with a strong stance.
      </p>
      <p>
        📝 Task: Handle shifting tone of questions while maintaining credibility and clarity.
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

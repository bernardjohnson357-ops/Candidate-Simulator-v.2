// app/module2b/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module2B() {
  const { setCurrentModule, setCandidateCoins, setSignatures } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    // Example: simulate quiz completion
    setCandidateCoins((prev: number) => prev + 2); // bonus CC
    setSignatures((prev: number) => prev + 100);   // earned signatures

    setCurrentModule("3"); // Merge into General Election
    router.push("/module3");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 2B – FEC Filing Fee Quizzes (Party)</h1>
      <p>
        🎯 Purpose: Practice federal filing requirements (Forms 1 & 2) for party candidates.
      </p>
      <p>
        📝 Task: Complete multiple rounds of FEC filing quizzes.
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

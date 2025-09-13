// app/module2a/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module2A() {
  const { setCurrentModule, setCandidateCoins, setSignatures } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    // Example: simulate quiz completion
    setCandidateCoins(prev => prev + 2); // bonus CC
    setSignatures(prev => prev + 100);   // earned signatures

    setCurrentModule("3"); // Merge into General Election
    router.push("/module3"); 
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 2A – FEC Filing Fee Quizzes (Independent)</h1>

      <p>
        🎯 Purpose: Practice federal filing requirements for independent candidates, covering FEC Forms 1 and 2.
      </p>

      <p>
        📝 Task: Complete multiple rounds of FEC filing quizzes covering Forms 1 and 2. Outcome: Earn CC + voter signatures.
      </p>

      <button
        onClick={handleNext}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}

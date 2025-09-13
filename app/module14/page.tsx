// app/module14/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module14() {
  const { setCurrentModule, setSignatures } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    // Example: debate performance adds voter approval
    setSignatures((prev: number) => prev + 300);
    setCurrentModule("15");
    router.push("/module15");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 14 – November 2: Debate Night</h1>
      <p>
        🎯 Purpose: Participate in the final debate, fielding questions from moderators and opponents.
      </p>
      <p>
        📝 Task: Deliver clear arguments, respond to rebuttals, and make a strong closing statement.
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

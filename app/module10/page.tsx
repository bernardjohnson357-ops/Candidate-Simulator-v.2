// app/module10/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module10() {
  const { setCurrentModule, setCandidateCoins } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    // Example: simulate spending CC on final ads
    setCandidateCoins((prev: number) => prev - 5);
    setCurrentModule("11");
    router.push("/module11");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 10 – October 23–29: Election Countdown</h1>
      <p>
        🎯 Purpose: Host town halls, allocate last CC for outreach, and maximize final voter impressions.
      </p>
      <p>
        📝 Task: Decide how to spend remaining resources and engage voters in the final stretch.
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

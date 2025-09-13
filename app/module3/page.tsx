// app/module3/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module3() {
  const { setCurrentModule } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    setCurrentModule("4");
    router.push("/module4");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 3 – May: First Moves</h1>
      <p>
        🎯 Purpose: Allocate Candidate Coins for campaign setup, recruit team members, and plan initial strategy.
      </p>
      <p>
        📝 Task: Choose a strategic path — Fundraising, Volunteers, or Media/Advertising.
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

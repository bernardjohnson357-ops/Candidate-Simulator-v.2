// app/module13/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module13() {
  const { setCurrentModule, setCandidateCoins, setSignatures } = useCandidate();
  const router = useRouter();

  const handleNext = (choice: "accept" | "decline") => {
    if (choice === "accept") {
      setCandidateCoins((prev: number) => prev + 10); // endorsement CC
      setSignatures((prev: number) => prev - 50); // backlash cost
    } else {
      setSignatures((prev: number) => prev + 50); // moral credibility gain
    }
    setCurrentModule("14");
    router.push("/module14");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 13 – November 1: Pro-Israel Group Meeting</h1>
      <p>
        🎯 Purpose: Decide whether to accept or decline a conditional endorsement.
      </p>
      <p>
        📝 Task: Make a strategic choice balancing campaign funding and credibility.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => handleNext("accept")}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Accept
        </button>
        <button
          onClick={() => handleNext("decline")}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

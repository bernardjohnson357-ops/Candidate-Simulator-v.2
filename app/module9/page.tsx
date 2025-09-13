// app/module9/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module9() {
  const { setCurrentModule, setSignatures } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    // Example: simulate voter approval boost from campaign push
    setSignatures((prev: number) => prev + 200);
    setCurrentModule("10");
    router.push("/module10");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 9 – October 15–22: Final Push</h1>
      <p>
        🎯 Purpose: Participate in podcast & timed speech tasks to maximize voter outreach.
      </p>
      <p>
        📝 Task: Complete media appearances and final campaign pushes.
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

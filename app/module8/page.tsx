// app/module8/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module8() {
  const { setCurrentModule } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    setCurrentModule("9");
    router.push("/module9");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 8 – October 8–14: Mid-October Ops</h1>
      <p>
        🎯 Purpose: Respond to press conference scenarios and adjust campaign messaging to the news cycle.
      </p>
      <p>
        📝 Task: Navigate press challenges while maintaining voter trust.
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

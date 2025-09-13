// app/module1a/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module1A() {
  const { setCurrentModule } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    setCurrentModule("2A");
    router.push("/module2a");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 1A – Independent/Write-In Filing</h1>
      <p>
        🎯 Purpose: Understand Texas state filing requirements for independent/write-in candidates.
      </p>
      <p>
        📝 Task: Complete quiz on SOS filing procedures, fees, and signature requirements.
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

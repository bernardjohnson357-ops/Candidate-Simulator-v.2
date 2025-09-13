// app/module1a/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module1A() {
  const { setCurrentModule } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    setCurrentModule("2A"); // Next module in Independent path
    router.push("/module2a");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 1A – Independent/Write-In Filing</h1>

      <p>
        🎯 Purpose: Understand the Texas state filing requirements for independent and write-in candidates, including SOS procedures.
      </p>

      <p>
        📝 Task: Complete quiz on independent/write-in filing requirements, including SOS procedures.
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

// app/module1b/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module1B() {
  const { setCurrentModule } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    setCurrentModule("2B");
    router.push("/module2b");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 1B – Party Filing</h1>
      <p>
        🎯 Purpose: Learn Texas SOS and federal filing requirements for party candidates.
      </p>
      <p>
        📝 Task: Complete quiz on party filing procedures and FEC basics.
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

// app/module11/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module11() {
  const { setCurrentModule, setSignatures } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    // Example: gain approval from empathetic responses
    setSignatures((prev: number) => prev + 150);
    setCurrentModule("12");
    router.push("/module12");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 11 – October 30: School Visit</h1>
      <p>
        🎯 Purpose: Respond empathetically to parents, administrators, and students during a community school visit.
      </p>
      <p>
        📝 Task: Handle sensitive topics like safety, armed staff, and community concerns with balance and empathy.
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

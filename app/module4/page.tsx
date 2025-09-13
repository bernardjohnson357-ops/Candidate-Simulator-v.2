// app/module4/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module4() {
  const { setCurrentModule } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    setCurrentModule("5");
    router.push("/module5");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 4 – Campaign Identity</h1>
      <p>
        🎯 Purpose: Write campaign announcement, submit slogan, mission statement, and define 4 issues.
      </p>
      <p>
        📝 Task: Draft your campaign identity materials.
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

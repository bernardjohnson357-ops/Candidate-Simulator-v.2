// app/module7/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module7() {
  const { setCurrentModule } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    setCurrentModule("8");
    router.push("/module8");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 7 – October 1–7: Early October Ops</h1>
      <p>
        🎯 Purpose: Prepare and deliver a community safety speech, manage team, and plan early ad buys.
      </p>
      <p>
        📝 Task: Draft and deliver speech; allocate early campaign resources.
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

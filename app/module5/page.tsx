// app/module5/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module5() {
  const { setCurrentModule } = useCandidate();
  const router = useRouter();

  const handleNext = () => {
    setCurrentModule("6");
    router.push("/module6");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 5 – July & August: Campaign Expansion</h1>
      <p>
        🎯 Purpose: Design signs, shirts, promo materials, and make scenario-based decisions like endorsements and petitions.
      </p>
      <p>
        📝 Task: Implement expansion strategies and scenario responses.
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

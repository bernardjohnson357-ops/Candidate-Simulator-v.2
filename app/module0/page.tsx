// app/module0/page.tsx
"use client";
import { useState } from "react";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module0() {
  const { setCurrentModule, setPath } = useCandidate();
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState<"Independent" | "Party">("Independent");

  const handleNext = () => {
    setPath(selectedPath);
    setCurrentModule("1");
    router.push(selectedPath === "Independent" ? "/module1a" : "/module1b");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Module 0 – Introduction</h1>
      <p>Welcome to the Federal Candidate Simulator. Select your ballot access path to begin.</p>

      <label className="block">
        Path:
        <select
          value={selectedPath}
          onChange={(e) => setSelectedPath(e.target.value as any)}
          className="border p-2 rounded ml-2"
        >
          <option value="Independent">Independent / Write-In</option>
          <option value="Party">Third-Party Nominee</option>
        </select>
      </label>

      <button
        onClick={handleNext}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}

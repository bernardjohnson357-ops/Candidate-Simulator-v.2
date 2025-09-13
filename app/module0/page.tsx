// app/module0/page.tsx
"use client";
import { useState } from "react";
import { useCandidate } from "../context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Module0() {
  const { setCurrentModule, setPath } = useCandidate();
  const router = useRouter();

  const [selectedOffice, setSelectedOffice] = useState<"President" | "Senate" | "House">("House");
  const [selectedPath, setSelectedPath] = useState<"Independent" | "Party">("Independent");

  const handleNext = () => {
    setPath(selectedPath); // branch
    setCurrentModule("1"); // will be resolved in branch logic
    // route to first branch module
    if (selectedPath === "Independent") {
      router.push("/module1a");
    } else {
      router.push("/module1b");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Module 0 – Introduction</h1>
      <p>Federal Candidate Simulator – AI Edition</p>

      <h2 className="text-xl font-semibold mt-4">🎯 Purpose</h2>
      <p>
        The Candidate Simulator teaches prospective federal candidates—especially independents
        and third-party hopefuls—how to run a campaign safely and realistically.
      </p>

      <h2 className="text-xl font-semibold mt-4">🏛️ Real Candidate Process</h2>
      <ol className="list-decimal list-inside space-y-1">
        <li>Choose an office: President, Senate, House</li>
        <li>Meet ballot requirements: pay fees or gather signatures</li>
        <li>FEC reporting: filing quarterly once thresholds are met</li>
        <li>Build voter support: develop campaign identity and approval</li>
      </ol>

      <h2 className="text-xl font-semibold mt-4">🎮 How the Simulator Works</h2>
      <p>Starting Conditions: Each participant starts with 50 CC.</p>

      <h3 className="font-semibold mt-2">Select Your Office</h3>
      <select
        className="border p-2 rounded"
        value={selectedOffice}
        onChange={(e) => setSelectedOffice(e.target.value as any)}
      >
        <option value="President">President</option>
        <option value="Senate">Senate</option>
        <option value="House">House</option>
      </select>

      <h3 className="font-semibold mt-2">Select Ballot Access Path</h3>
      <select
        className="border p-2 rounded"
        value={selectedPath}
        onChange={(e) => setSelectedPath(e.target.value as any)}
      >
        <option value="Independent">Independent / Write-In</option>
        <option value="Party">Third-Party Nominee</option>
      </select>

      <button
        onClick={handleNext}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}

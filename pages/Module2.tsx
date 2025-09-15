// pages/Module2.tsx
import { useState } from "react";
import { DynamicModule2Quiz } from "@/components/DynamicModule2Quiz";

export default function Module2() {
  const [branch, setBranch] = useState<"2A" | "2B" | null>(null);

  if (!branch) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Choose your candidate path:</h2>
        <button onClick={() => setBranch("2A")} className="btn">Independent / Write-In (Module 2A)</button>
        <button onClick={() => setBranch("2B")} className="btn ml-2">Party Candidate (Module 2B)</button>
      </div>
    );
  }

  return <DynamicModule2Quiz branch={branch} />;
}

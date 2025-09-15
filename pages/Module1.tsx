// pages/Module1.tsx
import { useState } from "react";
import { DynamicQuiz } from "@/components/DynamicQuiz";

export default function Module1() {
  const [branch, setBranch] = useState<"1A" | "1B" | null>(null);

  if (!branch) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Choose your candidate path:</h2>
        <button onClick={() => setBranch("1A")} className="btn">Independent / Write-In</button>
        <button onClick={() => setBranch("1B")} className="btn ml-2">Party Candidate</button>
      </div>
    );
  }

  return <DynamicQuiz branch={branch} />;
}

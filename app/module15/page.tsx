// app/module15/page.tsx
"use client";
import { useCandidate } from "../context/CandidateContext";

export default function Module15() {
  const { candidateCoins, signatures, voterApproval, path } = useCandidate();

  // Example voter approval calculation
  const approvalFromSignatures = Math.floor(signatures / 100); // 100 sigs = 1%
  const totalApproval = voterApproval + approvalFromSignatures;

  const result =
    totalApproval >= 50
      ? "🎉 Congratulations! You won the election!"
      : "⚠️ You fell short this time, but gained valuable campaign experience.";

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 text-center">
      <h1 className="text-4xl font-bold">Module 15 – Final Summary & Election Results</h1>

      <div className="mt-6 p-6 border rounded bg-gray-100">
        <p><strong>Path:</strong> {path}</p>
        <p><strong>Candidate Coins:</strong> {candidateCoins}</p>
        <p><strong>Signatures:</strong> {signatures}</p>
        <p><strong>Calculated Approval:</strong> {approvalFromSignatures}%</p>
        <p><strong>Total Approval:</strong> {totalApproval}%</p>
      </div>

      <h2 className="text-2xl mt-6">{result}</h2>

      <p className="mt-4 text-gray-600">
        Thank you for completing the Candidate Simulator. Your performance shows how preparation,
        resource management, and decision-making can shape a federal campaign.
      </p>
    </div>
  );
}

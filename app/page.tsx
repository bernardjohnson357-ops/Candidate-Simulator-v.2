// app/page.tsx
"use client";
import { useCandidate } from "./context/CandidateContext";
import { useRouter } from "next/navigation";

export default function Orientation() {
  const { setCurrentModule, setCandidateCoins, setSignatures, setVoterApproval, setPath } = useCandidate();
  const router = useRouter();

  const startSimulation = () => {
    setCandidateCoins(50);
    setSignatures(0);
    setVoterApproval(0);
    setPath(null);
    setCurrentModule("0");
    router.push("/module0");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🗳 Candidate Simulator Orientation</h1>

      <p className="mb-4">
        Welcome to the Candidate Simulator! This simulator is designed to prepare you for the realities of running for office.
        Every stage is scaffolded — which means you’ll move through reading, writing, and speaking in a deliberate order.
      </p>

      <h2 className="text-xl font-semibold mb-2">Why Scaffolded?</h2>
      <p className="mb-2">
        In politics, some people rely on quick talking points without deep understanding. This simulator is different. It forces you to:
      </p>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        <li>Read first – absorb the actual rules, guides, and case studies.</li>
        <li>Write next – organize your ideas and commit them to text.</li>
        <li>Speak last – deliver your message with clarity and impact.</li>
      </ol>
      <p className="mb-4">
        By moving step by step, you’ll build habits that separate serious candidates from surface-level ones.
      </p>

      <h2 className="text-xl font-semibold mb-2">Candidate Coins (CC)</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>1 CC = $100 simulated campaign funds.</li>
        <li>Earn CC by passing quizzes and completing assignments.</li>
        <li>Spend CC on campaign resources or on communication coaching:
          <ul className="list-disc list-inside ml-5">
            <li>Upload + Review (10 CC): Get structured feedback on your draft.</li>
            <li>Revision Suggestions (15 CC): Receive guidance on improving clarity and tone.</li>
            <li>Delivery Hints (20 CC): Learn pacing and communication tips.</li>
          </ul>
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Scoring System</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Quizzes → Signatures: Each quiz score = signatures earned. Example: 80% quiz score = 80 signatures.</li>
        <li>Signature Conversion: 100 signatures = 1% voter approval.</li>
        <li>Coin Rewards:
          <ul className="list-disc list-inside ml-5">
            <li>Score ≥ 80% = Earn 1 CC bonus.</li>
            <li>Score = 100% = Earn 2 CC bonus.</li>
          </ul>
        </li>
        <li>Penalties: Wrong answers deduct –1 CC or –50 signatures. Retake mistakes double the penalty (“FEC administrative fees”).</li>
      </ul>

      <p className="mb-4">
        The AI will never give you political advice — only feedback on clarity, structure, and effectiveness.
      </p>

      <h2 className="text-xl font-semibold mb-2">Key Rule</h2>
      <p className="mb-4">
        If a task requires reading, you must read. If a task requires writing, you must type. If a task requires speaking, you must use voice input. That’s by design. Thinking clearly comes before speaking persuasively.
      </p>

      <button
        onClick={startSimulation}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}

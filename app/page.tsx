// app/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CandidateChat from "@/components/CandidateChat";

export default function Page() {
  const [orientationDone, setOrientationDone] = useState(false);
  const [path, setPath] = useState<string | null>(null);

  // ===== Step 1: Orientation =====
  if (!orientationDone) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold">🗳 Candidate Simulator Orientation</h2>

        <Card className="rounded-2xl shadow-md">
          <CardContent className="space-y-4 p-6">
            <p>
              Welcome to the Candidate Simulator! This simulator is designed to
              prepare you for the realities of running for office. Every stage is{" "}
              <strong>scaffolded</strong> — which means you’ll move through
              reading, writing, and speaking in a deliberate order.
            </p>

            <h3 className="text-xl font-semibold">📚 Why Scaffolded?</h3>
            <p>
              In politics, some people rely on quick talking points without deep
              understanding. This simulator is different. It forces you to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Read first</strong> – absorb the actual rules, guides, and
                case studies.
              </li>
              <li>
                <strong>Write next</strong> – organize your ideas and commit them
                to text.
              </li>
              <li>
                <strong>Speak last</strong> – deliver your message with clarity and
                impact.
              </li>
            </ul>
            <p>
              By moving step by step, you’ll build habits that separate serious
              candidates from surface-level ones.
            </p>

            <h3 className="text-xl font-semibold">💰 Candidate Coins (CC)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>1 CC = $100 simulated campaign funds.</li>
              <li>Earn CC by passing quizzes and completing assignments.</li>
              <li>
                Spend CC on campaign resources <strong>or</strong> on{" "}
                <strong>communication coaching</strong>:
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Upload + Review (10 CC):</strong> Get structured
                    feedback on your draft.
                  </li>
                  <li>
                    <strong>Revision Suggestions (15 CC):</strong> Guidance on
                    improving clarity and tone.
                  </li>
                  <li>
                    <strong>Delivery Hints (20 CC):</strong> Learn pacing and
                    communication tips.
                  </li>
                </ul>
              </li>
            </ul>

            <h3 className="text-xl font-semibold">📊 Scoring System</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Quizzes → Signatures:</strong> Each quiz score = signatures
                earned. (Example: 80% quiz score = 80 signatures.)
              </li>
              <li>
                <strong>Signature Conversion:</strong> 100 signatures = 1% voter
                approval.
              </li>
              <li>
                <strong>Coin Rewards:</strong>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Score ≥ 80% = Earn 1 CC bonus.</li>
                  <li>Score = 100% = Earn 2 CC bonus.</li>
                </ul>
              </li>
              <li>
                <strong>Penalties:</strong> Wrong answers deduct –1 CC or –50
                signatures. Retake mistakes double the penalty
                (“FEC administrative fees”).
              </li>
            </ul>

            <h3 className="text-xl font-semibold">⚖️ Key Rule</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>If a task requires <strong>reading</strong>, you must read.</li>
              <li>If a task requires <strong>writing</strong>, you must type.</li>
              <li>
                If a task requires <strong>speaking</strong>, you must use voice
                input.
              </li>
            </ul>
            <p>
              That’s by design. Thinking clearly comes before speaking
              persuasively.
            </p>
          </CardContent>
        </Card>

        <h3 className="font-semibold">Module 0 – Introduction</h3>
        <p>
          The simulator teaches federal candidates how to run a campaign safely
          and realistically, combining real-world processes and simulation
          mechanics. By the end, you understand federal filing, ballot access, CC,
          voter signatures, and quizzes.
        </p>

        <h3 className="font-semibold">Start the Simulation</h3>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => setOrientationDone(true)}
        >
          Continue to Path Selection
        </button>
      </div>
    );
  }

  // ===== Step 2: Path Selection =====
  if (!path) {
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-6">
        <p className="mb-2 font-semibold">
          Choose your path to start the simulation:
        </p>
        <div className="space-x-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setPath("Party")}
          >
            Libertarian
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => setPath("Independent")}
          >
            Independent / Write-In
          </button>
        </div>
      </div>
    );
  }

  // ===== Step 3: CandidateChat =====
  return <CandidateChat path={path} />;
}

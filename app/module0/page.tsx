'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function OrientationPage() {
  const router = useRouter();
  const [CC, setCC] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [voterApproval, setVoterApproval] = useState(0);

  const handleNext = () => {
    // Navigate to Module 0 – Introduction page
    router.push('/module0');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Candidate Simulator Orientation</h1>
      <div className="prose mb-6">
        <p>Welcome to the Candidate Simulator! This simulator is designed to prepare you for the realities of running for office. Every stage is scaffolded — which means you’ll move through reading, writing, and speaking in a deliberate order.</p>
        <h2>Why Scaffolded?</h2>
        <p>Read first – absorb the actual rules, guides, and case studies.</p>
        <p>Write next – organize your ideas and commit them to text.</p>
        <p>Speak last – deliver your message with clarity and impact.</p>
        <h2>Candidate Coins (CC)</h2>
        <p>1 CC = $100 simulated campaign funds.</p>
        <p>Earn CC by passing quizzes and completing assignments.</p>
        <p>Spend CC on campaign resources:</p>
        <ul>
          <li>Upload + Review (10 CC)</li>
          <li>Revision Suggestions (15 CC)</li>
          <li>Delivery Hints (20 CC)</li>
        </ul>
        <h2>Scoring System</h2>
        <p>Quizzes → Signatures: Each quiz score = signatures earned. 100 signatures = 1% approval.</p>
        <p>Penalties: Wrong answers deduct –1 CC or –50 signatures.</p>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      <div className="mt-6 border-t pt-4">
        <p>CC: {CC}</p>
        <p>Signatures: {signatures}</p>
        <p>Voter Approval: {voterApproval.toFixed(2)}%</p>
      </div>
    </div>
  );
}

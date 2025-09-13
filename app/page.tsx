'use client';

import { useState } from 'react';

// Initial candidate state
const initialState = {
  CC: 50,
  signatures: 0,
  voterApproval: 0.0,
  currentModule: 0,
  branch: null,
};

// Modules scaffold
const modules = [
  {
    id: 0,
    name: 'Orientation',
    type: 'read',
    content: 'Introduction to Candidate Simulator, CC system, scaffolded learning.',
    checkpoints: [{ prompt: 'Explain why reading before writing and speaking is important.' }],
    next: 1,
  },
  {
    id: 1,
    name: 'Branch Selection',
    type: 'choice',
    options: ['Independent', 'Party', 'Write-In'],
    content: 'Choose your candidate path; this determines your module branch.',
    next: { Independent: 2, Party: 2, 'Write-In': 2 },
  },
  {
    id: 2,
    name: 'Module 1A/1B - State Filing',
    type: 'quiz',
    content: 'Complete SOS filing quiz for your branch.',
    scoring: { correct: { signatures: 50, CC: 5 }, incorrect: { signatures: -50, CC: -1 }, retakePenaltyMultiplier: 2 },
    next: 3,
  },
  {
    id: 3,
    name: 'Module 2A/2B - FEC Forms 1 & 2',
    type: 'quiz',
    content: 'Submit Form 1 & 2 quiz.',
    scoring: { correct: { signatures: 80, CC: 10 }, incorrect: { signatures: -50, CC: -1 }, retakePenaltyMultiplier: 2 },
    next: 4,
  },
];

export default function Page() {
  const [state, setState] = useState(initialState);

  const getCurrentModule = () => modules.find((m) => m.id === state.currentModule);

  const advanceModule = () => {
    const module = getCurrentModule();
    if (!module) return;
    if (typeof module.next === 'number') {
      setState((prev) => ({ ...prev, currentModule: module.next }));
    } else if (typeof module.next === 'object' && state.branch) {
      setState((prev) => ({ ...prev, currentModule: module.next[state.branch] }));
    }
  };

  const updateCandidateState = ({ CC = 0, signatures = 0, voterApproval = 0 }) => {
    setState((prev) => ({
      ...prev,
      CC: prev.CC + CC,
      signatures: prev.signatures + signatures,
      voterApproval: prev.voterApproval + voterApproval,
    }));
  };

  const currentModule = getCurrentModule();
  if (!currentModule) return <div>Loading module...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{currentModule.name}</h1>
      <p className="mb-4">{currentModule.content}</p>

      {currentModule.checkpoints?.map((c, idx) => (
        <div key={idx} className="mb-2">
          <p>
            <strong>Checkpoint:</strong> {c.prompt}
          </p>
          {/* Add interactive input here */}
        </div>
      ))}

      <div className="mt-4">
        <p>CC: {state.CC}</p>
        <p>Signatures: {state.signatures}</p>
        <p>Voter Approval: {state.voterApproval.toFixed(2)}%</p>
      </div>

      <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={advanceModule}>
        Next Module
      </button>
    </div>
  );
}

'use client';

import { useState } from 'react';

// Initial candidate state
const initialState = {
  CC: 50,
  signatures: 0,
  voterApproval: 0,
  currentModule: 0,
  branch: null,
};

// Modules scaffold (start with first 4 modules)
const modules = [
  {
    id: 0,
    name: 'Orientation',
    type: 'read',
    content: 'Introduction to Candidate Simulator.',
    checkpoints: [{ prompt: 'Explain why reading before writing and speaking is important.' }],
    next: 1,
  },
  {
    id: 1,
    name: 'Branch Selection',
    type: 'choice',
    options: ['Independent', 'Party', 'Write-In'],
    content: 'Choose your candidate path.',
    next: { Independent: 2, Party: 2, 'Write-In': 2 },
  },
  {
    id: 2,
    name: 'Module 1A/1B - State Filing',
    type: 'quiz',
    content: 'Complete SOS filing quiz.',
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
      const nextModuleNumber = module.next[state.branch];
      setState((prev) => ({ ...prev, currentModule: nextModuleNumber }));
    }
  };

  const currentModule = getCurrentModule();
  if (!currentModule) return <div>Loading module...</div>;

  return (
    <div>
      <h1>{currentModule.name}</h1>
      <p>{currentModule.content}</p>
      <button onClick={advanceModule}>Next Module</button>
    </div>
  );
}

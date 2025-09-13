'use client';

import { useState } from 'react';

// Candidate state
const initialState = {
  CC: 50,
  signatures: 0,
  voterApproval: 0,
  currentModule: 0,
};

// Only Orientation module for now
const modules = [
  {
    id: 0,
    name: 'Candidate Simulator Orientation',
    type: 'read',
    content: `
Welcome to the Candidate Simulator!
This simulator is designed to prepare you for the realities of running for office. Every stage is scaffolded — which means you’ll move through reading, writing, and speaking in a deliberate order.

#### Why Scaffolded?
In politics, some people rely on quick talking points without deep understanding. This simulator is different. It forces you to:
1. Read first – absorb the actual rules, guides, and case studies.
2. Write next – organize your ideas and commit them to text.
3. Speak last – deliver your message with clarity and impact.

By moving step by step, you’ll build habits that separate serious candidates from surface-level ones.

#### Candidate Coins (CC)
- 1 CC = $100 simulated campaign funds.
- Earn CC by passing quizzes and completing assignments.
- Spend CC on campaign resources or on communication coaching:
  - Upload + Review (10 CC): Get structured feedback on your draft.
  - Revision Suggestions (15 CC): Receive guidance on improving clarity and tone.
  - Delivery Hints (20 CC): Learn pacing and communication tips.

#### Scoring System
- Quizzes → Signatures: Each quiz score = signatures earned. Example: 80% quiz score = 80 signatures.
- Signature Conversion: 100 signatures = 1% voter approval.
- Coin Rewards:
  - Score ≥ 80% = Earn 1 CC bonus.
  - Score = 100% = Earn 2 CC bonus.
- Penalties: Wrong answers deduct –1 CC or –50 signatures. Retake mistakes double the penalty (“FEC administrative fees”).

The AI will never give you political advice — only feedback on clarity, structure, and effectiveness.

#### Key Rule
If a task requires reading, you must read. If a task requires writing, you must type. If a task requires speaking, you must use voice input.
That’s by design. Thinking clearly comes before speaking persuasively.
    `,
    checkpoints: [],
    next: 1,
  },
];

export default function OrientationPage() {
  const [state, setState] = useState(initialState);

  const currentModule = modules.find(m => m.id === state.currentModule);

  const handleNext = () => {
    if (!currentModule) return;
    setState(prev => ({ ...prev, currentModule: currentModule.next }));
    // Here you could navigate to the next module page or update content
    alert('Next module would load here.');
  };

  if (!currentModule) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{currentModule.name}</h1>
      <div className="prose mb-6">
        <pre>{currentModule.content}</pre>
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
        <p>CC: {state.CC}</p>
        <p>Signatures: {state.signatures}</p>
        <p>Voter Approval: {state.voterApproval.toFixed(2)}%</p>
      </div>
    </div>
  );
}

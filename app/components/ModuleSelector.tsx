// ./app/components/ModuleSelector.tsx
"use client";

import React, { useState } from "react";
import { CandidateState, Module, Task } from "../ai/types";

interface ModuleSelectorProps {
  candidateState: CandidateState;
  setCandidateState: React.Dispatch<React.SetStateAction<CandidateState>>;
  setCurrentModule: React.Dispatch<React.SetStateAction<Module | null>>;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({
  candidateState,
  setCandidateState,
  setCurrentModule,
}) => {
  const [answered, setAnswered] = useState(false);

  // Initialize Module 0 if not already active
  if (!candidateState.currentModuleId) {
    const candidateCoinQuiz: Task = {
      id: "task_module0_cc_quiz",
      type: "quiz",
      prompt:
        "What do Candidate Coins (CC) represent in this simulator?\n\nA) Campaign energy and credibility\nB) Real currency for campaign ads\nC) Signatures collected from voters\nD) Debate score multiplier",
      options: ["A", "B", "C", "D"], // optional, if your type supports
      feedback: {
        A: "✅ Correct! Candidate Coins represent campaign energy and credibility.",
        B: "❌ Not quite. CCs aren’t money — they represent your campaign’s energy, credibility, and influence points.",
        C: "❌ Not quite. CCs aren’t signatures.",
        D: "❌ Not quite. CCs aren’t debate score multipliers.",
      },
    };

    const nextModule: Module = {
      id: "module_0",
      title: "Orientation & Introduction",
      description: "Welcome to the Federal Candidate Simulator. Learn what Candidate Coins mean.",
      tasks: [candidateCoinQuiz],
    };

    setCurrentModule(nextModule);

    setCandidateState((prev) => ({
      ...prev,
      currentModuleId: nextModule.id,
      lastAction: "Module 0 initialized with CC quiz",
    }));
  }

  // Handle quiz submission
  const handleAnswer = (answer: string) => {
    if (answered) return;
    setAnswered(true);

    const upper = answer.trim().toUpperCase();
    const currentTask = candidateState.currentModuleId === "module_0" ? candidateCoinQuiz : null;

    if (!currentTask) return;

    const feedbackMessage = currentTask.feedback[upper] || "Invalid option.";

    if (upper === "A") {
      setCandidateState((prev) => ({
        ...prev,
        candidateCoins: (prev.candidateCoins || 0) + 5,
        lastAction: "Answered Module 0 quiz correctly (+5 CC)",
      }));
    }

    alert(feedbackMessage);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50 shadow-md">
      <h2 className="text-xl font-bold mb-2">Module 0: Orientation & Introduction</h2>
      <p className="mb-4">
        Welcome to the Federal Candidate Simulator! Before you begin, let’s see what you know about
        Candidate Coins (CC).
      </p>

      <p className="font-medium mb-2">
        What do Candidate Coins (CC) represent in this simulator?
      </p>

      <div className="space-y-2">
        {["A", "B", "C", "D"].map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            className="block w-full text-left p-2 border rounded hover:bg-blue-100"
            disabled={answered}
          >
            {opt === "A" && "A) Campaign energy and credibility"}
            {opt === "B" && "B) Real currency for campaign ads"}
            {opt === "C" && "C) Signatures collected from voters"}
            {opt === "D" && "D) Debate score multiplier"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModuleSelector;

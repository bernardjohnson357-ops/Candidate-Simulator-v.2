// ./app/components/ModuleSelector.tsx
"use client";

import React, { useEffect, useState } from "react";
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

  // Initialize Module 0 on first render
  useEffect(() => {
    if (!candidateState.currentModuleId) {
      const candidateCoinQuiz: Task = {
        id: "task_module0_cc_quiz",
        type: "quiz",
        prompt:
          "What do Candidate Coins (CC) represent in this simulator?\n\nA) Campaign energy and credibility\nB) Real currency for campaign ads\nC) Signatures collected from voters\nD) Debate score multiplier",
        questions: [
          {
            id: "q1",
            question: "Select the correct answer:",
            options: ["A", "B", "C", "D"],
            correct: ["A"],
          },
        ],
      };

      const module0: Module = {
        id: "module_0",
        title: "Orientation & Introduction",
        description:
          "Welcome to the Federal Candidate Simulator. Learn what Candidate Coins (CC) mean before you begin your campaign journey.",
        tasks: [candidateCoinQuiz],
      };

      setCurrentModule(module0);

      setCandidateState((prev) => ({
        ...prev,
        currentModuleId: module0.id,
        lastAction: "Module 0 initialized with CC quiz",
      }));
    }
  }, [candidateState.currentModuleId, setCandidateState, setCurrentModule]);

  // Handle quiz answer
  const handleAnswer = async (answer: string) => {
    if (answered) return;
    setAnswered(true);

    const upper = answer.trim().toUpperCase();

    if (upper === "A") {
      setCandidateState((prev) => ({
        ...prev,
        candidateCoins: (prev.candidateCoins || 0) + 5,
        lastAction: "Answered Module 0 quiz correctly (+5 CC)",
      }));

      alert("✅ Correct! You earned +5 Candidate Coins.");

      // Load Module 1 automatically
      try {
        const mod1 = await import("../data/modules/module1.json");
        setCurrentModule(mod1.default as unknown as Module);
        setCandidateState((prev) => ({
          ...prev,
          currentModuleId: "module_1",
          lastAction: "Module 1 loaded after Module 0 quiz",
        }));
      } catch {
        alert("⚠️ Module 1 not found. Please check your /data/modules folder.");
      }
    } else {
      alert("❌ Incorrect. Candidate Coins represent campaign energy and credibility.");
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50 shadow-md">
      <h2 className="text-xl font-bold mb-2">Module 0: Orientation & Introduction</h2>
      <p className="mb-4">
        Welcome to the Federal Candidate Simulator! Before you begin, let’s see what you know about
        Candidate Coins (CC).
      </p>

      <p className="font-medium mb-2">What do Candidate Coins (CC) represent in this simulator?</p>

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

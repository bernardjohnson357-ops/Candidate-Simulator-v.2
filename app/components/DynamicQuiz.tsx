// app/components/DynamicQuiz.tsx
"use client";

import { useState } from "react";
import { QuizQuestion, QuizResult } from "@/types";
import { moduleQuizzes } from "@quizzes/moduleQuizzes";
import { MultipleChoiceQuiz } from "./MultipleChoiceQuiz";
import { useGameState } from "@/context/GameStateContext";

interface DynamicQuizProps {
  branch: "1A" | "1B"; // chosen path
  startingCC?: number;
  startingSignatures?: number;
}

export function DynamicQuiz({ branch, startingCC = 50, startingSignatures = 0 }: DynamicQuizProps) {
  const [completed, setCompleted] = useState(false);
  const [cc, setCC] = useState(startingCC);
  const [signatures, setSignatures] = useState(startingSignatures);
  const [voterApproval, setVoterApproval] = useState(startingSignatures / 10000);

  const { currentModule, setCurrentModule } = useGameState();

  const handleComplete = (result: QuizResult) => {
    const newCC = cc + result.ccBonus;
    const newSignatures = signatures + result.signaturesEarned;
    const newVoterApproval = newSignatures / 10000;

    setCC(newCC);
    setSignatures(newSignatures);
    setVoterApproval(newVoterApproval);
    setCompleted(true);

    // Advance to Module 2
    if (currentModule === "1") {
      setCurrentModule("2");
    }
  };

  const questions: QuizQuestion[] = moduleQuizzes[branch];

  return <MultipleChoiceQuiz questions={questions} onComplete={handleComplete} />;
}

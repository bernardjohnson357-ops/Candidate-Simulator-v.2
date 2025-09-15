// components/DynamicQuiz.tsx
import { useState } from "react";
import { QuizQuestion, QuizResult } from "@/types";
import { moduleQuizzes } from "@/quizzes/moduleQuizzes";
import { MultipleChoiceQuiz } from "./MultipleChoiceQuiz";

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

  const handleComplete = (result: QuizResult) => {
    const newCC = cc + result.ccBonus;
    const newSignatures = signatures + result.signaturesEarned;
    const newVoterApproval = newSignatures / 10000;

    setCC(newCC);
    setSignatures(newSignatures);
    setVoterApproval(newVoterApproval);
    setCompleted(true);
  };

  // components/DynamicQuiz.tsx (excerpt)
const handleComplete = (result: QuizResult) => {
  const newCC = cc + result.ccBonus;
  const newSignatures = signatures + result.signaturesEarned;
  const newVoterApproval = newSignatures / 10000;

  setCC(newCC);
  setSignatures(newSignatures);
  setVoterApproval(newVoterApproval);
  setCompleted(true);

  // Advance to next module
  if (currentModule === "1") {
    setCurrentModule("2"); // Module 2
  } else if (currentModule === "2") {
    setCurrentModule("GeneralElection"); // General Election branch
  }
};

  const questions: QuizQuestion[] = moduleQuizzes[branch];

  return <MultipleChoiceQuiz questions={questions} onComplete={handleComplete} />;
}

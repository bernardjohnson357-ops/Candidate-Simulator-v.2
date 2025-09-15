"use client";

import { useState } from "react";
import { QuizResult } from "@/types";
import { module2Quizzes } from "@quizzes/module2Quizzes";
import { MultipleChoiceQuiz } from "@/components/MultipleChoiceQuiz";
import { useGameState } from "@/context/GameStateContext";

interface DynamicModule2QuizProps {
  branch: "2A" | "2B";
  startingCC?: number;
  startingSignatures?: number;
}

export function DynamicModule2Quiz({
  branch,
  startingCC = 50,
  startingSignatures = 0,
}: DynamicModule2QuizProps) {
  const [completed, setCompleted] = useState(false);
  const [cc, setCC] = useState(startingCC);
  const [signatures, setSignatures] = useState(startingSignatures);
  const [voterApproval, setVoterApproval] = useState(startingSignatures / 10000);
  const [result, setResult] = useState<QuizResult | null>(null);

  const { setCurrentModule } = useGameState();

  const handleComplete = (quizResult: QuizResult) => {
    const newCC = cc + quizResult.ccBonus;
    const newSignatures = signatures + quizResult.signaturesEarned;
    const newVoterApproval = newSignatures / 10000;

    setCC(newCC);
    setSignatures(newSignatures);
    setVoterApproval(newVoterApproval);
    setResult(quizResult);
    setCompleted(true);

    // Advance to a placeholder next stage
    setCurrentModule("GeneralElection"); // or any string that indicates the end
  };

  if (completed && result) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Module 2 Quiz Complete!</h2>
        <p>
          Correct Answers: {result.correctAnswers} / {result.totalQuestions}
        </p>
        <p>Signatures Earned: {result.signaturesEarned}</p>
        <p>CC Bonus: {result.ccBonus}</p>
        <p>Updated CC: {cc}</p>
        <p>Voter Approval: {(voterApproval * 100).toFixed(1)}%</p>
      </div>
    );
  }

  const questions = module2Quizzes[branch];
  return <MultipleChoiceQuiz questions={questions} onComplete={handleComplete} />;
}

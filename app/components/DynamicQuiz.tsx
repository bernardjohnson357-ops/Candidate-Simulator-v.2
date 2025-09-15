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

  if (completed) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Quiz Complete!</h2>
        <p>Correct Answers: {result.correctAnswers} / {result.totalQuestions}</p>
        <p>Signatures Earned: {result.signaturesEarned}</p>
        <p>CC Bonus: {result.ccBonus}</p>
        <p>Voter Approval: {(voterApproval * 100).toFixed(1)}%</p>
        <p>Updated CC: {cc}</p>
      </div>
    );
  }

  const questions: QuizQuestion[] = moduleQuizzes[branch];

  return <MultipleChoiceQuiz questions={questions} onComplete={handleComplete} />;
}

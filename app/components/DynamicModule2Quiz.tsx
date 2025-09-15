"use client";

import { useEffect, useState } from "react";
import { QuizQuestion, QuizResult } from "@/types";
import { MultipleChoiceQuiz } from "./MultipleChoiceQuiz";
import { useGameState } from "@/context/GameStateContext";
import { generateQuizFromReference } from "@/lib/quizGenerator";

export function DynamicModule2Quiz({ branch, moduleRefText }: { branch: "2A"|"2B"; moduleRefText: string }) {
  const { cc, setCC, signatures, setSignatures, voterApproval, setVoterApproval, setCurrentModule } = useGameState();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuestions() {
      const generated = await generateQuizFromReference(moduleRefText, branch);
      setQuestions(generated);
      setLoading(false);
    }
    loadQuestions();
  }, [moduleRefText, branch]);

  const handleComplete = (result: QuizResult) => {
    setCC(cc + result.ccBonus);
    setSignatures(signatures + result.signaturesEarned);
    setVoterApproval((signatures + result.signaturesEarned)/10000);
    setCurrentModule("3"); // advance to Module 3
  };

  if (loading) return <div>Loading Module 2 Quiz...</div>;
  return <MultipleChoiceQuiz questions={questions} onComplete={handleComplete} />;
}

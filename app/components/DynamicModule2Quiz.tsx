"use client";

import { useEffect, useState } from "react";
import { QuizQuestion, QuizResult } from "@/types";
import { MultipleChoiceQuiz } from "@/components/MultipleChoiceQuiz";
import { useGameState } from "@/context/GameStateContext";
import { generateQuizFromReference } from "@/lib/quizGenerator";

interface DynamicModule2QuizProps {
  branch: "2A" | "2B";
  moduleRefText: string;
}

export function DynamicModule2Quiz({ branch, moduleRefText }: DynamicModule2QuizProps) {
  const { setCurrentModule, cc, setCC, signatures, setSignatures, voterApproval, setVoterApproval } = useGameState();
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
    setVoterApproval((signatures + result.signaturesEarned) / 10000);

    // Advance to Module 3 (placeholder)
    setCurrentModule("3");
  };

  if (loading) return <div>Loading Module 2 Quiz...</div>;

  return <MultipleChoiceQuiz questions={questions} onComplete={handleComplete} />;
}

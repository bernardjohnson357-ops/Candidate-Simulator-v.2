"use client";

import { useEffect, useState } from "react";
import { QuizQuestion, QuizResult } from "@/types";
import { MultipleChoiceQuiz } from "@/components/MultipleChoiceQuiz";
import { useGameState } from "@/context/GameStateContext";
import { generateQuizFromReference } from "@/lib/quizGenerator";

interface DynamicQuizProps {
  branch: "1A" | "1B";
  moduleRefText: string; // The reference text for AI to generate questions
}

export function DynamicQuiz({ branch, moduleRefText }: DynamicQuizProps) {
  const { currentModule, setCurrentModule, cc, setCC, signatures, setSignatures, voterApproval, setVoterApproval } = useGameState();
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

    // Advance to Module 2
    setCurrentModule(branch === "1A" ? "2A" : "2B");
  };

  if (loading) return <div>Loading Module 1 Quiz...</div>;

  return <MultipleChoiceQuiz questions={questions} onComplete={handleComplete} />;
}

"use client";

import { useEffect, useState } from "react";
import { QuizQuestion, QuizResult } from "@/types";
import { MultipleChoiceQuiz } from "./MultipleChoiceQuiz";
import { useGameState } from "@/context/GameStateContext";
import { generateQuizFromReference } from "@/lib/quizGenerator";

export function DynamicQuiz({ branch, moduleRefText }: { branch: "1A"|"1B"; moduleRefText: string }) {
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
    setCurrentModule(branch === "1A" ? "2A" : "2B");
  };

  if (loading) return <div>Loading Module 1 Quiz...</div>;
  return <MultipleChoiceQuiz questions={questions} onComplete={handleComplete} />;
}

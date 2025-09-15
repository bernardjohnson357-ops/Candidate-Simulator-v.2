"use client";

import { QuizQuestion, QuizResult } from "@/types";
import { useState } from "react";

interface MultipleChoiceQuizProps {
  questions: QuizQuestion[];
  onComplete: (result: QuizResult) => void;
}

export function MultipleChoiceQuiz({ questions, onComplete }: MultipleChoiceQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setCorrectAnswers(prev => prev + 1);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const totalQuestions = questions.length;
      const scorePercent = (correctAnswers + (isCorrect ? 1 : 0)) / totalQuestions;
      const ccBonus = scorePercent === 1 ? 2 : scorePercent >= 0.8 ? 1 : 0;
      const signaturesEarned = (correctAnswers + (isCorrect ? 1 : 0)) * 20;

      onComplete({
        totalQuestions,
        correctAnswers: correctAnswers + (isCorrect ? 1 : 0),
        ccBonus,
        signaturesEarned,
      });
    }
  };

  const question = questions[currentIndex];

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">{question.prompt}</h2>
      <div className="grid gap-2">
        {question.options.map((opt) => (
          <button
            key={opt.label}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => handleAnswer(opt.correct)}
          >
            {opt.label}) {opt.text}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Question {currentIndex + 1} of {questions.length}
      </p>
    </div>
  );
}

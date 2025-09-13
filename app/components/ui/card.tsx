// app/components/ui/QuizCard.tsx
import { useState } from "react";
import Card from "./card";
import { Quiz, GameState } from "@/types";

interface QuizCardProps {
  quiz: Quiz;
  onSubmit: (quiz: Quiz, answer: string) => Promise<{ state: GameState; narration?: string }>;
}

const QuizCard = ({ quiz, onSubmit }: QuizCardProps) => {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [narration, setNarration] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!answer) return;

    setLoading(true);
    setSubmitted(true);

    try {
      const result = await onSubmit(quiz, answer);
      if (result.narration) setNarration(result.narration);
    } catch (err) {
      console.error("Error submitting quiz:", err);
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="mb-2 font-bold text-lg">{quiz.prompt}</div>

      {quiz.type === "multiple-choice" && quiz.options ? (
        <div className="flex flex-col gap-2">
          {quiz.options.map((opt, idx) => (
            <label key={idx} className="cursor-pointer">
              <input
                type="radio"
                name={quiz.id}
                value={opt}
                disabled={submitted || loading}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <span className="ml-2">{opt}</span>
            </label>
          ))}
        </div>
      ) : (
        <textarea
          className="w-full border rounded p-2"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={submitted || loading}
        />
      )}

      <button
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={handleSubmit}
        disabled={submitted || !answer || loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {submitted && narration && (
        <div className="mt-3 p-2 bg-gray-100 rounded border-l-4 border-blue-600 text-gray-800">
          <strong>AI Narration:</strong>
          <p className="mt-1 whitespace-pre-line">{narration}</p>
        </div>
      )}
    </Card>
  );
};

export default QuizCard;

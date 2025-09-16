// app/components/Quiz.tsx
import { useState } from "react";
import { useGameContext } from "../context/GameContext";
import { applyQuizResult, advanceModule } from "../../lib/simulatorHelpers";

type QuizProps = {
  question: string;
  options?: string[];
  correctAnswer?: string;
  signatureValue?: number;
};

export const Quiz = ({ question, options, correctAnswer, signatureValue = 20 }: QuizProps) => {
  const { state, updateState } = useGameContext();
  const [userAnswer, setUserAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    let score = 0;
    if (!correctAnswer || userAnswer.toLowerCase() === correctAnswer.toLowerCase()) score = 100;
    const results = applyQuizResult(state, score, signatureValue);
    updateState({ ...results, ...advanceModule(state) });
    setSubmitted(true);
  };

  const handleSkip = () => {
    updateState(advanceModule(state));
    setSubmitted(true);
  };

  if (submitted)
    return <div className="chat-bubble ai">Quiz complete! CC: {state.CC}, Signatures: {state.signatures}, Approval: {state.voterApproval.toFixed(2)}%</div>;

  return (
    <div className="quiz-container">
      <div className="chat-bubble ai">{question}</div>
      {options &&
        options.map((opt, i) => (
          <button key={i} onClick={() => setUserAnswer(opt)}>
            {opt}
          </button>
        ))}
      <input value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="Type answer or 'skip'" />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleSkip}>Skip</button>
    </div>
  );
};

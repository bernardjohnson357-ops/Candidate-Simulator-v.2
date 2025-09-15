// app/components/ChatSimulator.tsx
import { useState } from "react";
import { useGameState } from "../hooks/useGameState";
import { Task } from "../../types";

export default function ChatSimulator() {
  const { state, tasks, handleQuizCompletion } = useGameState();
  const [userInput, setUserInput] = useState("");

  const currentTask: Task | undefined = tasks[state.currentTaskIndex];

  if (!currentTask) {
    return <div>All tasks completed! 🎉</div>;
  }

  const handleSubmit = () => {
    if (currentTask.type === "quiz" && currentTask.quiz) {
      // Support multiple correct answers in the future (comma-separated)
      const answers = currentTask.quiz.answer
        .split(",")
        .map((a) => a.trim().toLowerCase());

      const userAnswers = userInput
        .split(",")
        .map((a) => a.trim().toLowerCase());

      // Count how many answers match
      const correctCount = userAnswers.filter((ua) =>
        answers.includes(ua)
      ).length;

      const scorePercent =
        answers.length > 0
          ? Math.round((correctCount / answers.length) * 100)
          : 0;

      // Apply simulator scoring
      handleQuizCompletion(currentTask.id, scorePercent);
    }

    setUserInput(""); // reset after submit
  };

  return (
    <div className="chat-simulator">
      <h2>Module {currentTask.module} – Task</h2>
      <p>{currentTask.content}</p>

      {currentTask.type === "quiz" && currentTask.quiz && (
        <div>
          <ul>
            {currentTask.quiz.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your answer(s), comma-separated..."
          />
          <button onClick={handleSubmit}>Submit Answer</button>
        </div>
      )}

      {currentTask.type !== "quiz" && (
        <div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your response here..."
          />
          <button onClick={handleSubmit}>Submit Task</button>
        </div>
      )}

      <div className="status">
        <p>Candidate Coins: {state.candidateCoins}</p>
        <p>Signatures: {state.signatures}</p>
        <p>Voter Approval: {state.voterApproval.toFixed(1)}%</p>
      </div>
    </div>
  );
}

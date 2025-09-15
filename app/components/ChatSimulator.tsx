// app/components/ChatSimulator.tsx
import { useState } from "react";
import { useGameState } from "../hooks/useGameState";
import { Task } from "../../types";

export default function ChatSimulator() {
  const { state, tasks, handleTaskCompletion } = useGameState();
  const [userInput, setUserInput] = useState("");

  // Get the current task based on the user's progress
  const currentTask: Task | undefined = tasks[state.currentTaskIndex];

  if (!currentTask) {
    return <div>All tasks completed! 🎉</div>;
  }

  const handleSubmit = () => {
    if (currentTask.type === "quiz") {
      // Example: validate quiz answer (simplified)
      if (userInput.trim().toLowerCase() === currentTask.quiz?.answer.toLowerCase()) {
        // Award CC or signatures as needed
        // For demonstration, let's add 1 CC
        console.log("Correct answer!");
      } else {
        console.log("Incorrect answer.");
      }
    }

    // Mark task as completed
    handleTaskCompletion(currentTask.id);

    // Move to next task
    setUserInput(""); // Clear input
    state.currentTaskIndex < tasks.length - 1 &&
      state.currentTaskIndex++;
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
            placeholder="Type your answer here..."
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

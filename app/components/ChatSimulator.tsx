"use client";

import { useState } from "react";
import { useGameState } from "../hooks/useGameState";

export default function ChatSimulator() {
  const { state, tasks, handleTaskCompletion } = useGameState();
  const [userInput, setUserInput] = useState("");

  const currentTask = tasks[state.currentTaskIndex];

  if (!currentTask) {
    return <div>All tasks completed!</div>;
  }

  const handleSubmit = async () => {
    const result = await handleTaskCompletion(currentTask, userInput);
    alert(result.narration);
    setUserInput("");
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc" }}>
      <h2>Module {currentTask.module} – {currentTask.type}</h2>
      <p>{currentTask.content}</p>

      {(currentTask.type === "write" || currentTask.type === "quiz") && (
        <div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {currentTask.type === "read" && (
        <button onClick={handleSubmit}>Next</button>
      )}

      <div style={{ marginTop: "1rem" }}>
        <p>CC: {state.candidateCoin}</p>
        <p>Signatures: {state.signatures}</p>
        <p>Voter Approval: {state.voterApproval.toFixed(1)}%</p>
      </div>
    </div>
  );
}

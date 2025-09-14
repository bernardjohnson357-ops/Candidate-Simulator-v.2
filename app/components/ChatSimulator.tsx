"use client";

import { useGameState } from "@/hooks/useGameState";
import { Task } from "@/types";
import { useState } from "react";

export default function ChatSimulator() {
  const { state, tasks, handleTaskCompletion } = useGameState();
  const [userInput, setUserInput] = useState("");

  const currentTask: Task | undefined = tasks[state.currentTaskIndex];

  const handleSubmit = async () => {
    if (!currentTask) return;
    const result = await handleTaskCompletion(currentTask, userInput);
    alert(result.narration);
    setUserInput("");
  };

  if (!currentTask) return <div>All tasks completed!</div>;

  return (
    <div>
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

      {currentTask.type === "read" && <button onClick={handleSubmit}>Next</button>}

      {currentTask.type === "upload" && (
        <input
          type="file"
          onChange={(e) =>
            e.target.files && handleTaskCompletion(currentTask, e.target.files[0])
          }
        />
      )}

      <div>
        <p>CC: {state.cc}</p>
        <p>Signatures: {state.signatures}</p>
        <p>Voter Approval: {state.voterApproval.toFixed(1)}%</p>
      </div>
    </div>
  );
}

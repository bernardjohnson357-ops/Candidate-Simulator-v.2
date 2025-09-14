import { useState } from "react";

// -----------------------------
// Inline types (no imports)
// -----------------------------
type TaskType = "read" | "write" | "quiz" | "upload";

interface Task {
  id: string;
  module: number;
  type: TaskType;
  content: string;
  quizId?: string;
}

interface GameState {
  cc: number;
  signatures: number;
  voterApproval: number;
  currentModule: number;
  currentTaskIndex: number;
  quizzesCompleted: string[];
}

// -----------------------------
// Initial tasks
// -----------------------------
const initialTasks: Task[] = [
  { id: "t0_read", module: 0, type: "read", content: "Welcome to the Federal Candidate Simulator..." },
  { id: "t0_write", module: 0, type: "write", content: "Choose your office: President, Senate, or House." }
];

// -----------------------------
// Hook
// -----------------------------
export function useGameState() {
  const [state, setState] = useState<GameState>({
    cc: 50,
    signatures: 0,
    voterApproval: 0,
    currentModule: 0,
    currentTaskIndex: 0,
    quizzesCompleted: []
  });

  const [tasks] = useState<Task[]>(initialTasks);

  const handleTaskCompletion = async (task: Task, userInput: string | File) => {
    let narration = task.content;

    setState(prev => ({
      ...prev,
      currentTaskIndex: prev.currentTaskIndex + 1
    }));

    return { narration };
  };

  return { state, tasks, handleTaskCompletion };
}

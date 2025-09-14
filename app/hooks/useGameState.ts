import { useState } from "react";
import { GameState, Task } from "@/types";

const initialTasks: Task[] = [
  { id: "t0_read", module: 0, type: "read", content: "Welcome to the Federal Candidate Simulator..." },
  { id: "t0_write", module: 0, type: "write", content: "Choose your office: President, Senate, or House." },
];

export function useGameState() {
  const [state, setState] = useState<GameState>({
    cc: 50,
    signatures: 0,
    voterApproval: 0,
    currentModule: 0,
    currentTaskIndex: 0,
    quizzesCompleted: [],
    branch: "Independent",
  });

  const [tasks] = useState<Task[]>(initialTasks);
  const [loading] = useState(false);

  const handleTaskCompletion = async (task: Task, userInput: string | File) => {
    let narration = task.content;
    setState(prev => ({ ...prev, currentTaskIndex: prev.currentTaskIndex + 1 }));
    return { narration };
  };

  return { state, tasks, handleTaskCompletion, loading };
}

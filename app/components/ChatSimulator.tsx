import { useState } from "react";
import { GameState, Task } from "@/types";

// Example linear tasks
const initialTasks: Task[] = [
  { module: 0, type: "read", content: "Welcome to the Federal Candidate Simulator..." },
  { module: 0, type: "write", content: "Choose your office: President, Senate, or House." },
  // Add remaining tasks here...
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
  const [loading, setLoading] = useState(false);

  const handleTaskCompletion = async (task: Task, userInput: string | File) => {
    let narration = "";

    setState(prev => {
      let newCC = prev.cc;
      let newSignatures = prev.signatures;
      let newVoterApproval = prev.voterApproval;
      let newQuizzesCompleted = [...prev.quizzesCompleted];

      if (task.type === "quiz" && task.quizId) {
        if (!newQuizzesCompleted.includes(task.quizId)) {
          const score = typeof userInput === "string" ? parseInt(userInput) || 0 : 0;
          const bonusCC = score === 100 ? 2 : score >= 80 ? 1 : 0;
          const penaltyCC = score < 80 ? -1 : 0;

          newCC += bonusCC + penaltyCC;
          newSignatures += score;
          newVoterApproval = newSignatures / 100;

          newQuizzesCompleted.push(task.quizId);
          narration = `You scored ${score}. CC: ${newCC}, Signatures: ${newSignatures}, Approval: ${newVoterApproval.toFixed(1)}%`;
        } else {
          narration = "Quiz already completed.";
        }
      } else if (task.type === "write") {
        newCC += 1;
        newSignatures += 10;
        newVoterApproval = newSignatures / 100;
        narration = "Your written task was received. CC and signatures updated.";
      } else if (task.type === "read") {
        narration = task.content;
      } else if (task.type === "upload") {
        newCC += 1;
        narration = "File uploaded successfully. CC increased by 1.";
      }

      const nextTaskIndex = prev.currentTaskIndex + 1;
      const nextModule = nextTaskIndex < tasks.length ? tasks[nextTaskIndex].module : prev.currentModule;

      return {
        ...prev,
        cc: newCC,
        signatures: newSignatures,
        voterApproval: newVoterApproval,
        currentTaskIndex: nextTaskIndex,
        currentModule: nextModule,
        quizzesCompleted: newQuizzesCompleted,
      };
    });

    return { narration };
  };

  return { state, tasks, handleTaskCompletion, loading };
}

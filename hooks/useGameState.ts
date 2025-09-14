import { useState } from "react";
import { GameState, Task, TaskType } from "@/types";

// Example initial tasks (replace with full Module 0–15 tasks)
const initialTasks: Task[] = [
  { module: 0, type: "read", content: "Welcome to the Candidate Simulator..." },
  { module: 0, type: "write", content: "Choose your office: President, Senate, or House." },
  { module: 1, type: "quiz", content: "SOS Independent/Write-In Quiz", quizId: "1A_q1" },
  // Add all remaining tasks sequentially
];

export function useGameState() {
  const [state, setState] = useState<GameState>({
    cc: 50,
    signatures: 0,
    voterApproval: 0,
    currentModule: 0,
    currentTaskIndex: 0,
    quizzesCompleted: [],
    branch: "Independent", // default, will update after office choice
  });

  const [tasks] = useState<Task[]>(initialTasks);
  const [loading, setLoading] = useState(false);

  // Core task completion function
  const handleTaskCompletion = async (task: Task, userInput: string | File) => {
    let narration = "";
    setLoading(true);

    setState(prev => {
      let newCC = prev.cc;
      let newSignatures = prev.signatures;
      let newVoterApproval = prev.voterApproval;
      let newQuizzesCompleted = [...prev.quizzesCompleted];

      if (task.type === "quiz" && task.quizId) {
        if (!newQuizzesCompleted.includes(task.quizId)) {
          // Evaluate quiz score (example: parse userInput as number)
          const score = typeof userInput === "string" ? parseInt(userInput) || 0 : 0;

          // Signature = score, bonus/penalty per rules
          const bonusCC = score === 100 ? 2 : score >= 80 ? 1 : 0;
          const penaltyCC = score < 80 ? -1 : 0;
          const penaltySignatures = score < 80 ? 0 : 0;

          newCC += bonusCC + penaltyCC;
          newSignatures += score - penaltySignatures;
          newVoterApproval = newSignatures / 100; // 100 sig = 1%

          newQuizzesCompleted.push(task.quizId);
          narration = `You scored ${score}. CC updated: ${newCC}, signatures: ${newSignatures}, voter approval: ${newVoterApproval.toFixed(1)}%.`;
        } else {
          narration = "You already completed this quiz.";
        }
      } else if (task.type === "write") {
        // Simple evaluation: +10 signatures per task, +1 CC for example
        newSignatures += 10;
        newCC += 1;
        newVoterApproval = newSignatures / 100;
        narration = "Your written task was received. CC and signatures updated.";
      } else if (task.type === "read") {
        narration = task.content;
      } else if (task.type === "upload") {
        // Simple file evaluation
        newCC += 1;
        narration = "File uploaded successfully. CC increased by 1.";
      }

      // Automatically increment task index and module if needed
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

    setLoading(false);
    return { narration };
  };

  return {
    state,
    tasks,
    handleTaskCompletion,
    loading,
  };
}

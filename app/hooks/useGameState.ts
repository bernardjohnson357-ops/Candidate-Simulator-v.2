import { useState } from "react";
import { GameState, Task } from "@/types";

// -----------------------------
// Example tasks (Module 0)
// -----------------------------
const initialTasks: Task[] = [
  {
    id: "t0_read",
    module: 0,
    type: "read",
    content: "Welcome to the Federal Candidate Simulator! You start with 50 Candidate Coins (CC)."
  },
  {
    id: "t0_write",
    module: 0,
    type: "write",
    content: "Choose your office: President, Senate, or House."
  },
  {
    id: "t0_quiz",
    module: 0,
    type: "quiz",
    content: "Quick check: How many CC do you start with?",
    quiz: {
      question: "How many Candidate Coins (CC) does each player start with?",
      options: ["25", "50", "75", "100"],
      answer: "50"
    }
  }
];

// -----------------------------
// Hook
// -----------------------------
export function useGameState() {
  const [state, setState] = useState<GameState>({
    candidateCoins: 50,
    signatures: 0,
    voterApproval: 0,
    currentModule: 0,
    currentTaskIndex: 0,
    quizzesCompleted: []
  });

  const [tasks] = useState<Task[]>(initialTasks);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Task completion logic
  // -----------------------------
  const handleTaskCompletion = async (task: Task, userInput: string | File) => {
    let narration = "";

    setLoading(true);

    setState(prev => {
      let newCC = prev.candidateCoins;
      let newSignatures = prev.signatures;
      let newApproval = prev.voterApproval;
      let newQuizzesCompleted = [...prev.quizzesCompleted];

      if (task.type === "quiz" && task.quiz) {
        if (!newQuizzesCompleted.includes(task.id)) {
          const isCorrect = userInput === task.quiz.answer;
          if (isCorrect) {
            newCC += 2;
            newSignatures += 20;
            narration = `✅ Correct! You gain +2 CC and +20 signatures.`;
          } else {
            newCC -= 1;
            narration = `❌ Incorrect. The correct answer was "${task.quiz.answer}". You lose -1 CC.`;
          }
          newApproval = newSignatures / 100;
          newQuizzesCompleted.push(task.id);
        } else {
          narration = "You already completed this quiz.";
        }
      } else if (task.type === "write") {
        newCC += 1;
        newSignatures += 10;
        newApproval = newSignatures / 100;
        narration = "📝 Your response was submitted. +1 CC, +10 signatures.";
      } else if (task.type === "read") {
        narration = task.content;
      } else if (task.type === "upload") {
        newCC += 1;
        narration = "📂 File uploaded successfully. +1 CC.";
      }

      const nextTaskIndex = prev.currentTaskIndex + 1;
      const nextModule =
        nextTaskIndex < tasks.length ? tasks[nextTaskIndex].module : prev.currentModule;

      setLoading(false);

      return {
        ...prev,
        candidateCoins: newCC,
        signatures: newSignatures,
        voterApproval: newApproval,
        currentTaskIndex: nextTaskIndex,
        currentModule: nextModule,
        quizzesCompleted: newQuizzesCompleted
      };
    });

    return { narration };
  };

  return { state, tasks, handleTaskCompletion, loading };
}

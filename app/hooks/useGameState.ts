// app/hooks/useGameState.ts
import { useState } from "react";
import { GameState } from "../../types"; // adjust path if needed
import { tasks as allTasks } from "../../data/tasks"; // import tasks

// -----------------------------
// Type for partial updates
// -----------------------------
interface StateChanges {
  currentModule?: number;
  candidateCoins?: number;
  signatures?: number;
  voterApproval?: number;
  currentTaskIndex?: number;
  quizzesCompleted?: string[];
}

// -----------------------------
// Update helper
// -----------------------------
function updateState(state: GameState, changes: StateChanges): GameState {
  return {
    currentModule: changes.currentModule ?? state.currentModule,
    candidateCoins: state.candidateCoins + (changes.candidateCoins ?? 0),
    signatures: state.signatures + (changes.signatures ?? 0),
    voterApproval: state.voterApproval + (changes.voterApproval ?? 0),
    currentTaskIndex: changes.currentTaskIndex ?? state.currentTaskIndex,
    quizzesCompleted: changes.quizzesCompleted ?? state.quizzesCompleted,
  };
}

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
    quizzesCompleted: [],
  });

  const modifyState = (changes: StateChanges) => {
    setState((prev) => updateState(prev, changes));
  };

  const handleTaskCompletion = (taskId: string) => {
    if (!state.quizzesCompleted.includes(taskId)) {
      modifyState({
        quizzesCompleted: [...state.quizzesCompleted, taskId],
      });
    }
  };

  return {
    state,
    setState: modifyState,
    tasks: allTasks,              // ✅ now available in ChatSimulator
    handleTaskCompletion,         // ✅ now available in ChatSimulator
  };
}
  return {
    state,
    setState: modifyState,
    tasks: allTasks,              // <-- include tasks here
    handleTaskCompletion,         // <-- include handler here
  };
}

  return {
    state,
    setState: modifyState,
  };
}

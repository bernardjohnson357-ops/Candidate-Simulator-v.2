import { useState } from "react";
import { GameState } from "../../types";
import { tasks as allTasks } from "../../data/tasks";

interface StateChanges {
  currentModule?: number;
  candidateCoins?: number;
  signatures?: number;
  voterApproval?: number;
  currentTaskIndex?: number;
  quizzesCompleted?: string[];
}

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
    tasks: allTasks,
    handleTaskCompletion,
  };
}

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

  /**
   * Handle quiz completion and apply scoring rules
   */
  const handleQuizCompletion = (taskId: string, scorePercent: number) => {
    if (state.quizzesCompleted.includes(taskId)) {
      // ✅ Retake penalties
      if (scorePercent < 80) {
        modifyState({ candidateCoins: -2 }); // double penalty
      } else {
        modifyState({ signatures: -100 }); // double penalty (-50 × 2)
      }
      return;
    }

    let coinChange = 0;
    let signatureChange = scorePercent; // 1% = 1 signature

    if (scorePercent >= 80 && scorePercent < 100) {
      coinChange = 1;
    } else if (scorePercent === 100) {
      coinChange = 2;
    } else {
      // Wrong answer penalty
      if (scorePercent === 0) {
        coinChange = -1;
      } else {
        signatureChange = -50;
      }
    }

    modifyState({
      candidateCoins: coinChange,
      signatures: signatureChange,
      quizzesCompleted: [...state.quizzesCompleted, taskId],
    });
  };

  return {
    state,
    setState: modifyState,
    tasks: allTasks,
    handleQuizCompletion, // ✅ replaces generic handleTaskCompletion
  };
}

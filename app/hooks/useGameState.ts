"use client";

import { useState } from "react";
import { GameState } from "@/types";
import { tasks as allTasks } from "@/data/tasks"; // if you have tasks per module

interface StateChanges {
  cc?: number;
  signatures?: number;
  voterApproval?: number;
  currentModule?: GameState["currentModule"];
  branch?: GameState["branch"];
  quizzesCompleted?: string[];
}

interface UseGameStateReturn extends GameState {
  setState: (changes: StateChanges) => void;
  resetGame: () => void;
}

export function useGameState(): UseGameStateReturn {
  const [state, setInternalState] = useState<GameState>({
    cc: 50,
    signatures: 0,
    voterApproval: 0,
    currentModule: "0", // Orientation
    branch: null,
    quizzesCompleted: [],
  });

  const setState = (changes: StateChanges) => {
    setInternalState((prev) => ({ ...prev, ...changes }));
  };

  const resetGame = () => {
    setInternalState({
      cc: 50,
      signatures: 0,
      voterApproval: 0,
      currentModule: "0",
      branch: null,
      quizzesCompleted: [],
    });
  };

  return { ...state, setState, resetGame };
}

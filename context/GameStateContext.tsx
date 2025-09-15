"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { GameState } from "@/types";

interface GameStateContextType extends GameState {
  setState: (changes: Partial<GameState>) => void;
  resetGame: () => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, setInternalState] = useState<GameState>({
    cc: 50,
    signatures: 0,
    voterApproval: 0,
    currentModule: "0", // Start at Orientation
    branch: null,
    quizzesCompleted: [],
  });

  const setState = (changes: Partial<GameState>) => {
    setInternalState(prev => ({ ...prev, ...changes }));
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

  return (
    <GameStateContext.Provider value={{ ...state, setState, resetGame }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) throw new Error("useGameState must be used within GameStateProvider");
  return context;
}

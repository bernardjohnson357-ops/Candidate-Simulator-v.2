// app/context/GameContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type GameState = {
  CC: number;
  signatures: number;
  voterApproval: number;
  module: number;
  branch: string | null;
  quizzesTaken: string[];
  scenariosCompleted: string[];
};

type GameContextType = {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>({
    CC: 50,
    signatures: 0,
    voterApproval: 0,
    module: 0,
    branch: null,
    quizzesTaken: [],
    scenariosCompleted: [],
  });

  const updateState = (updates: Partial<GameState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <GameContext.Provider value={{ state, updateState }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

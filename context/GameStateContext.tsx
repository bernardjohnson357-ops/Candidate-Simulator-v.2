// context/GameStateContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface GameState {
  cc: number;
  signatures: number;
  voterApproval: number;
  currentModule: "1" | "2" | "GeneralElection";
  branch: "1A" | "1B" | null;
}

interface GameStateContextType extends GameState {
  setCC: (cc: number) => void;
  setSignatures: (sig: number) => void;
  setVoterApproval: (va: number) => void;
  setCurrentModule: (mod: GameState["currentModule"]) => void;
  setBranch: (branch: GameState["branch"]) => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [cc, setCC] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [voterApproval, setVoterApproval] = useState(0);
  const [currentModule, setCurrentModule] = useState<GameState["currentModule"]>("1");
  const [branch, setBranch] = useState<GameState["branch"]>(null);

  return (
    <GameStateContext.Provider
      value={{ cc, signatures, voterApproval, currentModule, branch, setCC, setSignatures, setVoterApproval, setCurrentModule, setBranch }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) throw new Error("useGameState must be used within GameStateProvider");
  return context;
}

// app/context/CandidateContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type CandidateState = {
  candidateCoins: number;
  signatures: number;
  voterApproval: number;
  currentModule: string;
  path: "Independent" | "Party" | null;
  quizAttempts: Record<string, number>;
  setCandidateCoins: (val: number | ((prev: number) => number)) => void;
  setSignatures: (val: number | ((prev: number) => number)) => void;
  setVoterApproval: (val: number | ((prev: number) => number)) => void;
  setCurrentModule: (val: string) => void;
  setPath: (val: "Independent" | "Party" | null) => void;
  incrementQuizAttempt: (quizId: string) => void;
};

const CandidateContext = createContext<CandidateState | undefined>(undefined);

export const CandidateProvider = ({ children }: { children: ReactNode }) => {
  const [candidateCoins, setCandidateCoins] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [voterApproval, setVoterApproval] = useState(0);
  const [currentModule, setCurrentModule] = useState("0");
  const [path, setPath] = useState<"Independent" | "Party" | null>(null);
  const [quizAttempts, setQuizAttempts] = useState<Record<string, number>>({});

  const incrementQuizAttempt = (quizId: string) => {
    setQuizAttempts(prev => ({
      ...prev,
      [quizId]: (prev[quizId] || 0) + 1,
    }));
  };

  return (
    <CandidateContext.Provider
      value={{
        candidateCoins,
        signatures,
        voterApproval,
        currentModule,
        path,
        quizAttempts,
        setCandidateCoins,
        setSignatures,
        setVoterApproval,
        setCurrentModule,
        setPath,
        incrementQuizAttempt,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = () => {
  const context = useContext(CandidateContext);
  if (!context) throw new Error("useCandidate must be used within CandidateProvider");
  return context;
};

// app/context/CandidateContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

type PathType = "Independent" | "Party";

type CandidateState = {
  candidateCoins: number;
  setCandidateCoins: React.Dispatch<React.SetStateAction<number>>;

  signatures: number;
  setSignatures: React.Dispatch<React.SetStateAction<number>>;

  voterApproval: number;
  setVoterApproval: React.Dispatch<React.SetStateAction<number>>;

  path: PathType | null;
  setPath: React.Dispatch<React.SetStateAction<PathType | null>>;

  currentModule: string;
  setCurrentModule: React.Dispatch<React.SetStateAction<string>>;
};

const CandidateContext = createContext<CandidateState | undefined>(undefined);

export function CandidateProvider({ children }: { children: React.ReactNode }) {
  const [candidateCoins, setCandidateCoins] = useState<number>(50); // start with 50 CC
  const [signatures, setSignatures] = useState<number>(0);
  const [voterApproval, setVoterApproval] = useState<number>(0);
  const [path, setPath] = useState<PathType | null>(null);
  const [currentModule, setCurrentModule] = useState<string>("0");

  return (
    <CandidateContext.Provider
      value={{
        candidateCoins,
        setCandidateCoins,
        signatures,
        setSignatures,
        voterApproval,
        setVoterApproval,
        path,
        setPath,
        currentModule,
        setCurrentModule,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
}

export function useCandidate() {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error("useCandidate must be used within a CandidateProvider");
  }
  return context;
}

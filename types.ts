// types.ts
declare module '@neondatabase/serverless';

export type GameState = {
  currentModule: number;
  candidateCoins: number;
  signatures: number;
  voterApproval: number;
};

export interface Quiz {
  id: string;         // unique identifier, e.g. "1A_q1"
  module: string;     // module ID, e.g. "1A", "2A", "2B"
  question: string;   // the question text
  options: string[];  // multiple-choice options
  answer: string;     // the correct option
  explanation?: string; // optional: show feedback after answering
}

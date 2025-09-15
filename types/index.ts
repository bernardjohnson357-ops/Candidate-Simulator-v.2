// /types/index.ts

export interface QuizOption {
  label: string;
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  signaturesEarned: number;
  ccBonus: number;
}

// Add this GameState export:
export interface GameState {
  cc: number;
  signatures: number;
  voterApproval: number;
  currentModule:
    | "0"
    | "1A"
    | "1B"
    | "2A"
    | "2B"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "GeneralElection";
  branch: "1A" | "1B" | "2A" | "2B" | null;
  quizzesCompleted?: string[];
}

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

// ------------------------------
// Shared ModuleState for Libertarian Simulator
// ------------------------------
export interface ModuleState {
  office: "President" | "Senate" | "House";
  cc: number;
  signatures: number;
  approval: number;
  threshold?: { cc: number; approval: number; sigs: number };
}

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

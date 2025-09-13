// types.ts

export interface GameState {
  userId: string;
  path: "Independent" | "Party" | "thirdParty";
  filingOption: "signatures" | "filingFee";
  currentModule: string;
  cc: number;
  signatures: number;
  voterApproval: number;
  completedQuizzes: string[];
  fecFilings: string[];
  chatHistory: ChatMessage[]; // new field
}

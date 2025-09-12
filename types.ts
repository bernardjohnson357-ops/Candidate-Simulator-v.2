// types.ts
declare module '@neondatabase/serverless';

export type GameState = {
  currentModule: number;
  candidateCoins: number;
  signatures: number;
  voterApproval: number;
};

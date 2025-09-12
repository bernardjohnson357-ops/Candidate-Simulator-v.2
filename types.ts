// types.d.ts
declare module '@neondatabase/serverless';

type GameState = {
  currentModule: number;
  candidateCoins: number;
  signatures: number;
  voterApproval: number;
};

// app/lib/simulatorHelpers.ts

import { GameState } from "../context/GameContext";

export const applyQuizResult = (
  state: GameState,
  score: number,
  signatureValue = 20,
  CCbonus80 = 1,
  CCbonus100 = 2
) => {
  const earnedSignatures = score >= 0 ? score * signatureValue : 0;
  const bonusCC = score === 100 ? CCbonus100 : score >= 80 ? CCbonus80 : 0;
  return {
    CC: state.CC + bonusCC,
    signatures: state.signatures + earnedSignatures,
    voterApproval: state.voterApproval + earnedSignatures * 0.0001,
  };
};

export const advanceModule = (state: GameState) => ({
  ...state,
  module: state.module + 1,
});

// lib/gameHelpers.ts
import { getGameState, updateGameState } from "./gameState";
import { GameState } from "../types";

/**
 * Apply quiz/module changes to the game state
 */
export async function applyGameChanges(
  changes: Partial<Pick<GameState, "candidateCoins" | "signatures" | "voterApproval" | "currentModule">>,
  id = 1
): Promise<GameState> {
  const state = (await getGameState(id)) || {
    currentModule: 0,
    candidateCoins: 50,
    signatures: 0,
    voterApproval: 0,
  };

  const newState: GameState = {
  currentModule: changes.currentModule ?? state.currentModule,
  candidateCoins: state.candidateCoins + (changes.candidateCoins ?? 0),
  signatures: state.signatures + (changes.signatures ?? 0),
  voterApproval: state.voterApproval + (changes.voterApproval ?? 0),
  currentTaskIndex: state.currentTaskIndex ?? 0,
  quizzesCompleted: state.quizzesCompleted ?? [],
};

  // Automatically convert signatures → voter approval
  if (changes.signatures) {
    newState.voterApproval = newState.signatures / 100;
  }

  await updateGameState(newState, id);
  return newState;
}

// lib/gameHelpers.ts
import { getGameState, updateGameState } from "./gameState";
import { GameState } from "../types";

/**
 * Update Candidate Coins, signatures, and voter approval
 * @param changes Object describing the changes
 * @param id Optional game state ID (default 1)
 */
export async function applyGameChanges(
  changes: Partial<Pick<GameState, "candidateCoins" | "signatures" | "voterApproval" | "currentModule">>,
  id = 1
): Promise<GameState> {
  // Fetch current state
  const state = (await getGameState(id)) || {
    currentModule: 0,
    candidateCoins: 50,
    signatures: 0,
    voterApproval: 0,
  };

  // Apply changes
  const newState: GameState = {
    ...state,
    currentModule: changes.currentModule ?? state.currentModule,
    candidateCoins: state.candidateCoins + (changes.candidateCoins ?? 0),
    signatures: state.signatures + (changes.signatures ?? 0),
    voterApproval:
      changes.voterApproval !== undefined
        ? changes.voterApproval
        : state.voterApproval,
  };

  // Automatically convert signatures → voter approval
  if (changes.signatures) {
    newState.voterApproval = newState.signatures / 100;
  }

  // Save updated state
  await updateGameState(newState, id);

  return newState;
}

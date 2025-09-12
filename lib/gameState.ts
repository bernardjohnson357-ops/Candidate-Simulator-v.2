// lib/gameState.ts
import { client } from "./db";
import { GameState } from "../types";

const TABLE = "game_state";

// Fetch the current game state
export async function getGameState(id = 1): Promise<GameState | null> {
  const result = await client.query(
    `SELECT current_module, candidate_coins, signatures, voter_approval
     FROM ${TABLE} WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

// Initialize a new game state
export async function initGameState(): Promise<GameState> {
  const initial: GameState = {
    currentModule: 0,
    candidateCoins: 50,
    signatures: 0,
    voterApproval: 0,
  };

  await client.query(
    `INSERT INTO ${TABLE} (current_module, candidate_coins, signatures, voter_approval)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (id) DO NOTHING`,
    [initial.currentModule, initial.candidateCoins, initial.signatures, initial.voterApproval]
  );

  return initial;
}

// Update the game state
export async function updateGameState(state: GameState, id = 1): Promise<void> {
  await client.query(
    `UPDATE ${TABLE}
     SET current_module = $1,
         candidate_coins = $2,
         signatures = $3,
         voter_approval = $4
     WHERE id = $5`,
    [state.currentModule, state.candidateCoins, state.signatures, state.voterApproval, id]
  );
}

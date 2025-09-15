import { GameState } from "../types";

// Initialize a new game state
export async function initGameState(): Promise<GameState> {
  const initial: GameState = {
    currentModule: 0,
    candidateCoins: 50,
    signatures: 0,
    voterApproval: 0,
    currentTaskIndex: 0,
    quizzesCompleted: [],
  };

  return initial;
}

// Placeholder storage (swap with DB/file if needed)
let inMemoryState: GameState | null = null;

export async function getGameState(id = 1): Promise<GameState | null> {
  return inMemoryState;
}

export async function updateGameState(state: GameState, id = 1): Promise<void> {
  inMemoryState = state;
}

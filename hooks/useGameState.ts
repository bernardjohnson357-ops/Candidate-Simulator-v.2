// hooks/useGameState.ts
import { useState, useEffect } from "react";
import { GameState } from "../types";

export function useGameState() {
  const [state, setState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchState = async () => {
    setLoading(true);
    const res = await fetch("/api/gameState");
    const data: GameState = await res.json();
    setState(data);
    setLoading(false);
  };

  const updateState = async (newState: GameState) => {
    setState(newState); // optimistic update
    await fetch("/api/gameState", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newState),
    });
  };

  useEffect(() => {
    fetchState();
  }, []);

  return { state, loading, updateState };
}

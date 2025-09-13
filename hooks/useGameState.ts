// hooks/useGameState.ts
import { useState, useEffect } from "react";
import { GameState, Quiz } from "../types";

interface UseGameStateReturn {
  state: GameState | null;
  loading: boolean;
  currentQuizzes: Quiz[];
  completeQuiz: (quiz: Quiz, answer: string) => Promise<void>;
  nextModule: (moduleId: string) => Promise<void>;
  fetchState: () => Promise<void>;
}

export function useGameState(): UseGameStateReturn {
  const [state, setState] = useState<GameState | null>(null);
  const [currentQuizzes, setCurrentQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial user state and first module quizzes
  const fetchState = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "init",
          userId: "user123",
          payload: { path: "Independent", filingOption: "signatures" },
        }),
      });
      const data = await res.json();
      setState(data.state);
      setCurrentQuizzes(data.quizzes || []);
    } catch (err) {
      console.error("Failed to fetch state:", err);
    } finally {
      setLoading(false);
    }
  };

  // Complete a quiz, update state, and get AI narration
  const completeQuiz = async (quiz: Quiz, answer: string) => {
    if (!state) return;

    setLoading(true);
    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "completeQuiz",
          userId: state.userId,
          payload: { quiz, answer },
        }),
      });

      const data = await res.json();
      if (data.state) setState(data.state);
      if (data.narration) console.log("AI Narration:", data.narration);
    } catch (err) {
      console.error("Failed to complete quiz:", err);
    } finally {
      setLoading(false);
    }
  };

  // Move to next module (triggers AI-generated quizzes)
  const nextModule = async (moduleId: string) => {
    if (!state) return;

    setLoading(true);
    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "nextModule",
          userId: state.userId,
          payload: { nextModule: moduleId },
        }),
      });

      const data = await res.json();
      if (data.state) setState(data.state);
      if (data.quizzes) setCurrentQuizzes(data.quizzes);
    } catch (err) {
      console.error("Failed to load next module:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  return { state, loading, currentQuizzes, completeQuiz, nextModule, fetchState };
}

  useEffect(() => {
    fetchState();
  }, []);

  return { state, loading, updateState };
}

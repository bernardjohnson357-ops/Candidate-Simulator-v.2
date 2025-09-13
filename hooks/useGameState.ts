// hooks/useGameState.ts
import { useState, useEffect } from "react";
import { GameState, ChatMessage, Quiz } from "../types";

interface UseGameStateReturn {
  state: GameState | null;
  loading: boolean;
  currentQuizzes: Quiz[];
  chatHistory: ChatMessage[];
  sendMessage: (content: string) => Promise<void>;
  uploadFile: (file: File) => Promise<void>;
  fetchState: () => Promise<void>;
}

export function useGameState(): UseGameStateReturn {
  const [state, setState] = useState<GameState | null>(null);
  const [currentQuizzes, setCurrentQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchState = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "init", userId: "user123", payload: { path: "Independent", filingOption: "signatures" } }),
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

  const sendMessage = async (content: string) => {
    if (!state) return;
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content, type: "text" };
    setState(prev => prev ? { ...prev, chatHistory: [...prev.chatHistory, userMessage] } : null);

    setLoading(true);
    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "chatInput", userId: state.userId, payload: { input: content } }),
      });
      const data = await res.json();

      const aiMessage: ChatMessage = { id: crypto.randomUUID(), role: "assistant", content: data.narration || "", type: "text" };
      setState(prev => prev ? { ...prev, chatHistory: [...prev.chatHistory, aiMessage], cc: data.state?.cc ?? prev.cc, signatures: data.state?.signatures ?? prev.signatures, voterApproval: data.state?.voterApproval ?? prev.voterApproval, currentModule: data.state?.currentModule ?? prev.currentModule } : null);

      if (data.quizzes) setCurrentQuizzes(data.quizzes);
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File) => {
    if (!state) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("/api/simulator/upload", { method: "POST", body: formData });
      const data = await res.json();

      const aiMessage: ChatMessage = { id: crypto.randomUUID(), role: "assistant", content: data.narration || "File uploaded.", type: "text" };
      setState(prev => prev ? { ...prev, chatHistory: [...prev.chatHistory, aiMessage], cc: data.state?.cc ?? prev.cc, signatures: data.state?.signatures ?? prev.signatures, voterApproval: data.state?.voterApproval ?? prev.voterApproval, currentModule: data.state?.currentModule ?? prev.currentModule } : null);
    } catch (err) {
      console.error("Failed to upload file:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  return { state, loading, currentQuizzes, chatHistory: state?.chatHistory ?? [], sendMessage, uploadFile, fetchState };
}

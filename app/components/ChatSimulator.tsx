import { useState } from "react";
import { GameState, ChatMessage, Task } from "@/types";
import { useGameState } from "@/hooks/useGameState";
import styles from "./ChatCard.module.css";

export default function ChatSimulator() {
  const { state, tasks, handleTaskCompletion, loading } = useGameState(); // use a linear task queue
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");

  if (loading) return <div>Loading...</div>;
  if (!state) return <div>Error loading state.</div>;

  const handleUserInput = async (text: string) => {
    if (!text) return;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text, type: "text" };
    setChatHistory(prev => [...prev, userMsg]);
    setInputValue("");

    // Complete the current task (quiz, write, etc.)
    const task: Task = tasks[state.currentTaskIndex];
    const aiResponse = await handleTaskCompletion(task, text);

    const aiMsg: ChatMessage = { id: crypto.randomUUID(), role: "assistant", content: aiResponse.narration || "Next task ready.", type: "text" };
    setChatHistory(prev => [...prev, aiMsg]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const aiResponse = await handleTaskCompletion(tasks[state.currentTaskIndex], file);

    const aiMsg: ChatMessage = { id: crypto.randomUUID(), role: "assistant", content: aiResponse.narration || "File uploaded.", type: "text" };
    setChatHistory(prev => [...prev, aiMsg]);
  };

  return (
    <div className={styles.chat-container}>
      <div className={styles.dashboard}>
        <div>Module: {state.currentModule}</div>
        <div>CC: {state.cc}</div>
        <div>Signatures: {state.signatures}</div>
        <div>Voter Approval: {state.voterApproval.toFixed(1)}%</div>
      </div>

      <div className={styles.chat-history}>
        {chatHistory.map(msg => (
          <div key={msg.id} className={`${styles.message} ${msg.role === "user" ? "user" : "assistant"}`}>
            {msg.content}
          </div>
        ))}
      </div>

      <div className={styles.input-bar}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleUserInput(inputValue); }}
        />
        <button onClick={() => handleUserInput(inputValue)}>Send</button>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </div>
    </div>
  );
}

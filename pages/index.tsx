// pages/index.tsx
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [candidateCoins, setCandidateCoins] = useState(50);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch greeting from backend on first load
  useEffect(() => {
    if (messages.length === 0) {
      (async () => {
        try {
          const res = await fetch("/api/simulator", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: [], currentModule: 0, candidateCoins }),
          });
          const data = await res.json();
          setMessages([{ role: "assistant", content: data.reply }]);
          if (data.candidateCoins !== undefined) setCandidateCoins(data.candidateCoins);
        } catch (err) {
          setMessages([
            { role: "assistant", content: "⚠️ Error: Could not load the simulator. Please try refreshing." },
          ]);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          currentModule: messages.length,
          candidateCoins,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      if (data.candidateCoins !== undefined) setCandidateCoins(data.candidateCoins);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error: Could not get a response." },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FED000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5rem 0",
      }}
    >
      <h1 style={{ color: "#000", fontWeight: 700, marginBottom: "1rem" }}>
        Candidate Simulator Chat
      </h1>
      <div
        style={{
          background: "#fff",
          color: "#000",
          borderRadius: "1rem",
          boxShadow: "0 4px 16px rgba(0,0,0,0.09)",
          padding: "1.5rem",
          width: "90%",
          maxWidth: 600,
          minHeight: 380,
          height: "65vh",
          overflowY: "auto",
          marginBottom: "1rem",
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ margin: "1rem 0", whiteSpace: "pre-wrap" }}>
            <strong>{m.role === "assistant" ? "Simulator" : "You"}:</strong> {m.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex", width: "90%", maxWidth: 600 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: "0.75rem",
            fontSize: "1rem",
            border: "1px solid #ddd",
            borderRadius: "0.5rem",
            marginRight: "0.5rem",
          }}
          placeholder="Type your response..."
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "0.75rem 1.25rem",
            fontSize: "1rem",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </main>
  );
}

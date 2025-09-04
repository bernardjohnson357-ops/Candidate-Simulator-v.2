import { useState } from "react";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error: could not get response." },
      ]);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#FED000",
        padding: "1rem",
      }}
    >
      <h1>Candidate Simulator AI</h1>

      <div
        style={{
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          width: "100%",
          maxWidth: "600px",
          height: "400px",
          overflowY: "auto",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              margin: "0.5rem 0",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              background: m.role === "assistant" ? "#f1f1f1" : "#d1e7dd",
              alignSelf: m.role === "assistant" ? "flex-start" : "flex-end",
              maxWidth: "80%",
            }}
          >
            {m.content}
          </div>
<div>
  <p>{assistantMessage.content}</p>
  <ul>
    <li>
      <a href="https://www.sos.state.tx.us/elections/candidates/guide/2024/ind2024.shtml" target="_blank" rel="noopener noreferrer">
        Texas SOS Independent Candidate Guide 2024
      </a>
    </li>
    <li>
      <a href="https://www.sos.state.tx.us/elections/candidates/guide/2024/writein2024.shtml" target="_blank" rel="noopener noreferrer">
        Texas SOS Write-In Candidate Guide 2024
      </a>
    </li>
    <li>
      <a href="https://www.fec.gov/resources/cms-content/documents/policy-guidance/candgui.pdf" target="_blank" rel="noopener noreferrer">
        FEC Guide for Congressional Candidates
      </a>
    </li>
  </ul>
</div>
        
        ))}
      </div>

      <div style={{ display: "flex", width: "100%", maxWidth: "600px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "0.5rem" }}
          placeholder="Type your response..."
        />
        <button
          onClick={sendMessage}
          style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}
        >
          Send
        </button>
      </div>
    </main>
  );
}

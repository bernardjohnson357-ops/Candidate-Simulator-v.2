// pages/index.tsx
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Welcome to the Candidate Simulator! Type 'start' to begin Module 0." }
  ]);
  const [input, setInput] = useState("");
  const [candidateCoins, setCandidateCoins] = useState(50);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          candidateCoins
        }),
      });

      const data = await res.json();

      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      if (data.candidateCoins !== undefined) setCandidateCoins(data.candidateCoins);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Error: Could not get a response." }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline on Enter
      sendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto"; // reset height
    e.target.style.height = e.target.scrollHeight + "px"; // grow to fit content
  };

  return (
    <main className="flex flex-col h-screen bg-black p-4">
      <h1 className="text-white text-xl font-bold mb-4">Candidate Simulator AI</h1>

      {/* Chat container */}
      <div className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-y-auto text-white w-full max-w-4xl mx-auto mb-4">
        {messages.map((m, i) => (
          <div key={i} className="my-2 whitespace-pre-wrap">
            <strong className="text-yellow-400">
              {m.role === "assistant" ? "Simulator" : "You"}:
            </strong>{" "}
            {m.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Sticky auto-growing input */}
      <div className="w-full max-w-4xl mx-auto flex">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your response..."
          className="flex-1 p-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 resize-none overflow-hidden"
          rows={1}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-yellow-400 text-black rounded-lg"
        >
          Send
        </button>
      </div>
    </main>
  );
}

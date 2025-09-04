import { useState } from "react";
import Head from "next/head";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Welcome to Candidate Simulator! Type 'start' to begin." }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    // Call backend
    const res = await fetch("/api/simulator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();

    // Add assistant reply
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  };

  return (
    <>
      <Head>
        <title>Candidate Simulator</title>
      </Head>
      <main className="min-h-screen flex flex-col bg-yellow-400">
        {/* Chat window */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-xl ${
                msg.role === "user"
                  ? "bg-green-600 text-white self-end ml-auto"
                  : "bg-white text-black self-start mr-auto"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-xl px-4 py-2"
            placeholder="Type your response..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-green-600 text-white rounded-xl"
          >
            Send
          </button>
        </div>
      </main>
    </>
  );
}

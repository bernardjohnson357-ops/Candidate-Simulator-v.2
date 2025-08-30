"use client";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function LindaChat() {
  const initialAssistantMessage: Message = {
    role: "assistant",
    content:
      "Hi, I’m Linda. After the recent hog stampedes and the school shooting threat, I’m really worried. What are you going to do to protect our children in schools?",
  };

  // Conversation state sent to API and also used for display
  const [conversation, setConversation] = useState<Message[]>([initialAssistantMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setLoading(true);
    const userMessage: Message = { role: "user", content: trimmedInput };

    // Update state atomically
    setConversation((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/linda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...conversation, userMessage] }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();
      const assistantMessage: Message = { role: "assistant", content: data.reply };

      // Append assistant reply
      setConversation((prev) => [...prev, userMessage, assistantMessage]);
    } catch (err) {
      console.error("Error talking to Linda:", err);
      setConversation((prev) => [
        ...prev,
        userMessage,
        { role: "assistant", content: "Oops, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-xl font-bold mb-4">Chat with Linda</h1>

        <div className="space-y-2 mb-4 max-h-96 overflow-y-auto p-2 border rounded">
          {conversation.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg ${
                msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-200 text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && <div className="text-gray-400 italic">Linda is typing...</div>}
        </div>

        <div className="flex space-x-2">
          <input
            className="flex-1 border p-2 rounded-l"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type your response..."
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-r disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

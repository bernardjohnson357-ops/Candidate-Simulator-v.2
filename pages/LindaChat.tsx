"use client";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function LindaChat() {
  // Conversation history sent to the API
  const [conversation, setConversation] = useState<Message[]>([]);

  // Messages displayed in the chat UI
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m Linda. After the recent hog stampedes and the school shooting threat, I’m really worried. What are you going to do to protect our children in schools?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedConversation = [...conversation, userMessage];

    setConversation(updatedConversation); // backend uses this
    setMessages([...messages, userMessage]); // frontend display
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/linda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedConversation }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const assistantMessage: Message = { role: "assistant", content: data.reply };

      setConversation([...updatedConversation, assistantMessage]);
      setMessages([...messages, userMessage, assistantMessage]);
    } catch (err) {
      console.error("Error talking to Linda:", err);
      setMessages([...messages, { role: "assistant", content: "Oops, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-xl font-bold mb-4">Chat with Linda</h1>

        <div className="space-y-2 mb-4 max-h-96 overflow-y-auto p-2 border rounded">
          {messages.map((msg, i) => (
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
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your response..."
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-r disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

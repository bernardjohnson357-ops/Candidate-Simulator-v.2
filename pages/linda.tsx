"use client";
import { useState } from "react";

export default function LindaPage() {
  const [conversation, setConversation] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const [messages, setMessages] = useState([
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

    const userMessage = { role: "user" as const, content: input };
    const updatedConversation = [...conversation, userMessage];

    setConversation(updatedConversation);
    setMessages([...messages, userMessage]);
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
      const assistantMessage = { role: "assistant" as const, content: data.reply };

      setConversation([...updatedConversation, assistantMessage]);
      setMessages([...messages, userMessage, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages([...messages, { role: "assistant", content: "Oops, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-xl font-bold mb-4">Chat with Linda</h1>

        <div className="space-y-2 mb-4 max-h-96 overflow-y-auto border p-2 rounded">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
              <span className={msg.role === "user" ? "bg-blue-100" : "bg-gray-100"}>{msg.content}</span>
            </div>
          ))}
          {loading && <div className="text-gray-500 italic">Linda is typing...</div>}
        </div>

        <div className="flex flex-col space-y-2">
          <textarea
            className="flex-grow border rounded px-2 py-2 h-24 resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
            onClick={sendMessage}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

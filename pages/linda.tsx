"use client";
import { useState, useEffect } from "react";

export default function LindaPage() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content: "Hi, I’m Linda. After the recent hog stampedes and the school shooting threat, I’m really worried. What are you going to do to protect our children in schools?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/linda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: "assistant", content: "Oops, something went wrong." }]);
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
        <div className="flex">
          <input
            className="flex-grow border rounded-l px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r disabled:opacity-50"
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

import { useState } from "react";

export default function LindaChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    setLoading(true);

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/linda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-xl font-bold mb-4">Chat with Linda</h1>

        <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg ${
                m.role === "user" ? "bg-blue-100 text-right" : "bg-gray-200 text-left"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && <div className="text-gray-400">Linda is typing...</div>}
        </div>

        <div className="flex space-x-2">
          <input
            className="flex-1 border p-2 rounded-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say something to Linda..."
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

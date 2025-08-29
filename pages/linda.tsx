import { useState, useEffect } from "react";

export default function LindaPage() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are Linda, a concerned parent speaking with the candidate." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(userMessage: string) {
    setLoading(true);
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    try {
      const res = await fetch("/api/linda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("Error talking to Linda:", err);
      setMessages([...newMessages, { role: "assistant", content: "Oops, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  // ⬇️ Only run fetch logic in the browser
  useEffect(() => {
    if (typeof window === "undefined") return;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-xl font-bold mb-4">Chat with Linda</h1>
        <div className="space-y-2 mb-4 max-h-96 overflow-y-auto border p-2 rounded">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
              <span className={msg.role === "user" ? "bg-blue-100" : "bg-gray-100"}>
                {msg.content}
              </span>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            sendMessage(input);
            setInput("");
          }}
          className="flex"
        >
          <input
            className="flex-grow border rounded-l px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-r disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

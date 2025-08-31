import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function LindaChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m Linda. After the recent hog stampedes and the school shooting threat, I’m really worried. What are you going to do to protect our children in schools?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading || error) return;

    const userMessage: Message = { role: "user", content: input };
    const newConversation = [...messages, userMessage];

    setMessages(newConversation);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/linda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newConversation }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      const assistantMessage: Message = { role: "assistant", content: data.reply };

      setMessages([...newConversation, assistantMessage]);
    } catch (err) {
      console.error("Error talking to Linda:", err);
      setMessages([
        ...newConversation,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try restarting the chat.",
        },
      ]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const restartChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi, I’m Linda. After the recent hog stampedes and the school shooting threat, I’m really worried. What are you going to do to protect our children in schools?",
      },
    ]);
    setInput("");
    setError(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-xl font-bold mb-4">Chat with Linda</h1>

        <div className="space-y-2 mb-4 max-h-96 overflow-y-auto p-2 border rounded bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))}
          {loading && <div className="text-gray-500 italic">Linda is typing...</div>}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded p-2"
            placeholder="Type your message..."
            disabled={loading || error}
          />
          <button
            onClick={sendMessage}
            disabled={loading || error || !input.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Send
          </button>
        </div>

        {error && (
          <div className="mt-4 flex flex-col items-center">
            <button
              onClick={restartChat}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Restart Chat
            </button>
            <div className="text-red-600 mt-2">
              The conversation has ended due to an error. Please restart to try again.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

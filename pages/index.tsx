// pages/index.tsx
import { useRef, useState, useEffect } from "react";

export default function ChatSimulator({ messages }) {
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto"; // reset height
    e.target.style.height = e.target.scrollHeight + "px"; // set to content height
  };

  return (
    <main className="flex flex-col h-screen bg-black p-4">
      {/* Chat messages area */}
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

      {/* Sticky auto-growing textarea */}
      <div className="w-full max-w-4xl mx-auto">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 resize-none overflow-hidden"
          rows={1} // start with 1 row
          style={{ position: "sticky", bottom: 0 }}
        />
      </div>
    </main>
  );
}

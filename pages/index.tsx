// pages/index.tsx
export default function ChatSimulator({ messages = [] }: ChatSimulatorProps) {
  return (
    <main className="flex flex-col h-screen bg-black p-4">
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
      <div className="w-full max-w-4xl mx-auto">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="w-full p-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 resize-none overflow-hidden"
          rows={1}
          style={{ position: "sticky", bottom: 0 }}
        />
      </div>
    </main>
  );
}

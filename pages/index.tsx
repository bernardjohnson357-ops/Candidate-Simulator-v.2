<main className="flex flex-col h-screen bg-black text-white p-4">
  <h1 className="text-xl font-bold mb-4">Candidate Simulator AI</h1>

  {/* Chat container */}
  <div className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-y-auto w-full max-w-4xl mx-auto mb-4">
    {messages.map((m, i) => (
      <div key={i} className="my-2 whitespace-pre-wrap text-white">
        <strong className="text-yellow-400">
          {m.role === "assistant" ? "Simulator" : "You"}:
        </strong>{" "}
        {m.content}
      </div>
    ))}
    <div ref={messagesEndRef} />
  </div>

  {/* Sticky input */}
  <div className="w-full max-w-4xl mx-auto flex">
    <textarea
      value={input}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="Type your response..."
      className="flex-1 p-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 resize-none overflow-hidden"
      rows={1}
    />
    <button className="ml-2 px-4 py-2 bg-yellow-400 text-black rounded-lg" onClick={sendMessage}>
      Send
    </button>
  </div>
</main>

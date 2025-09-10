"use client";
import { useState, useRef } from "react";

type Message = {
  type: "user" | "ai" | "image";
  content: string;
};

export default function OnboardingChat() {
  const [path, setPath] = useState<"independent" | "thirdParty" | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatContext, setChatContext] = useState<{ path: string; option: string } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleStartSimulation = (option: "payFee" | "signatures") => {
    setChatContext({ path: path!, option });
    setShowChat(true);
    addAIMessage(
      `Welcome to the candidate simulator chat! You are starting as a ${path} candidate and chose ${option}.`
    );
  };

  const addAIMessage = (content: string) => {
    setMessages((prev) => [...prev, { type: "ai", content }]);
  };

  const handleSendMessage = async () => {
    if (!inputValue && !imageFile) return;

    // Add user text
    if (inputValue) {
      setMessages((prev) => [...prev, { type: "user", content: inputValue }]);
    }

    // Add user image
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setMessages((prev) => [...prev, { type: "image", content: url }]);
      setImageFile(null);
    }

    const userText = inputValue;
    setInputValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    if (userText) {
      // Call GPT API (replace with your own backend endpoint)
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messages, { type: "user", content: userText }] }),
        });
        const data = await response.json();
        addAIMessage(data.reply);
      } catch (err) {
        addAIMessage("Error: Unable to get response from AI.");
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Branch Selection */}
      {!path && (
        <div className="flex flex-col md:flex-row gap-6">
          <button onClick={() => setPath("independent")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg shadow-lg">
            Independent / Write-In
          </button>
          <button onClick={() => setPath("thirdParty")} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-4 rounded-lg shadow-lg">
            Third-Party Nominee
          </button>
        </div>
      )}

      {/* Filing Option */}
      {path && (
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          <button onClick={() => handleStartSimulation("payFee")} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-4 rounded-lg shadow-lg">
            Pay Filing Fee
          </button>
          <button onClick={() => handleStartSimulation("signatures")} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-4 rounded-lg shadow-lg">
            Gather Signatures (In Lieu of Fee)
          </button>
        </div>
      )}

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 p-6 rounded-lg shadow-lg relative flex flex-col h-[80vh]">
            <button onClick={() => setShowChat(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold">
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Candidate Chat</h2>

            <div className="flex-1 overflow-y-auto mb-4 border rounded p-4 bg-gray-50 space-y-2">
              {messages.map((msg, idx) =>
                msg.type === "user" ? (
                  <div key={idx} className="bg-blue-100 p-2 rounded text-right">{msg.content}</div>
                ) : msg.type === "ai" ? (
                  <div key={idx} className="bg-gray-200 p-2 rounded">{msg.content}</div>
                ) : (
                  <div key={idx}>
                    <img src={msg.content} className="max-h-64 rounded" />
                  </div>
                )
              )}
            </div>

            {/* Input area */}
            <div className="flex flex-col gap-2">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleTextareaChange}
                placeholder="Type your message..."
                className="w-full border rounded px-3 py-2 resize-none overflow-hidden"
              />
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                  className="border rounded px-3 py-2"
                />
                <button onClick={handleSendMessage} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Send
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  🎤 Audio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// /components/CandidateChat.tsx
"use client";
import { useState, useRef, useEffect } from "react";

type Message = {
  type: "user" | "ai" | "image";
  content: string;
};

type CandidateChatProps = {
  path: "independent" | "thirdParty";
  option: "payFee" | "signatures";
  startingCC?: number;
};

export default function CandidateChat({
  path,
  option,
  startingCC = 50,
}: CandidateChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cc, setCC] = useState(startingCC);
  const [signatures, setSignatures] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Speech recognition
  const recognitionRef = useRef<any>(null);
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addAIMessage = (content: string) => {
    // Parse CC/signature updates if included
    const ccMatch = content.match(/\+(\d+)\s*CC/);
    const sigMatch = content.match(/\+(\d+)\s*signatures/);

    if (ccMatch) setCC((prev) => prev + parseInt(ccMatch[1], 10));
    if (sigMatch) setSignatures((prev) => prev + parseInt(sigMatch[1], 10));

    setMessages((prev) => [...prev, { type: "ai", content }]);

    // Speak the AI message
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(content);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue && !imageFile) return;

    if (inputValue) setMessages((prev) => [...prev, { type: "user", content: inputValue }]);
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setMessages((prev) => [...prev, { type: "image", content: url }]);
      setImageFile(null);
    }

    const userText = inputValue;
    setInputValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    if (userText) {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messages, { type: "user", content: userText }] }),
        });
        const data = await response.json();
        if (data.reply) addAIMessage(data.reply);
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

  const startVoiceInput = () => {
    recognitionRef.current?.start();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-6 mb-4">
        <div className="bg-white shadow-md rounded-lg p-4 text-center w-32">
          <h3 className="font-semibold">Candidate Coins</h3>
          <p className="text-2xl font-bold">{cc}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center w-32">
          <h3 className="font-semibold">Signatures</h3>
          <p className="text-2xl font-bold">{signatures}</p>
        </div>
      </div>

      <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col h-[70vh] border rounded shadow-lg">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-2">
          {messages.map((msg, idx) =>
            msg.type === "user" ? (
              <div key={idx} className="bg-blue-100 p-2 rounded text-right">{msg.content}</div>
            ) : msg.type === "ai" ? (
              <div key={idx} className="bg-gray-200 p-2 rounded">{msg.content}</div>
            ) : (
              <div key={idx}><img src={msg.content} className="max-h-64 rounded" /></div>
            )
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex flex-col gap-2 p-2 border-t">
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
            <button
              onClick={handleSendMessage}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Send
            </button>
            <button
              onClick={startVoiceInput}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              🎤 Voice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// app/components/CandidateChat.tsx
"use client";

import { useState } from "react";

type CandidateChatProps = {
  path: "Party" | "Independent";
};

type Message = {
  sender: "system" | "user" | "ai";
  text: string;
};

export default function CandidateChat({ path }: CandidateChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "system",
      text: `Welcome to the Federal Candidate Simulator. As your virtual campaign advisor, I will guide you through the steps of managing a simulated campaign. 
Key points:
- You start with 50 Candidate Coins (CC), which represent simulated campaign resources.
- Campaign tasks and exercises allocate these resources and build voter support.
- Signatures reflect voter support (1 signature = 0.0001 approval).
- Eligibility for the General Election depends on completing filing requirements and demonstrating sufficient voter support.
- All exercises are educational and simulate campaign management, not political advice.`,
    },
  ]);

  const [input, setInput] = useState("");
  const [cc, setCC] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [step, setStep] = useState<"chooseOffice" | "chooseMethod" | "module1" | "module2">(
    "chooseOffice"
  );

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    let aiResponse: string = "";

    switch (step) {
      case "chooseOffice":
        aiResponse = `Thank you. You selected "${input}" as the office you are pursuing. Next, decide whether to fulfill ballot requirements through collecting signatures or by completing filing exercises.`;
        setStep("chooseMethod");
        break;

      case "chooseMethod":
        if (input.toLowerCase().includes("sign")) {
          aiResponse = "You chose to collect signatures. We will now simulate exercises that help you build voter support and allocate campaign resources.";
        } else if (input.toLowerCase().includes("fee")) {
          aiResponse = `You chose to complete filing exercises. The necessary simulated resources will be allocated accordingly.`;
          const fee = path === "Party" ? 75 : 50; // simplified example
          setCC((prev) => Math.max(prev - fee, 0));
          aiResponse += ` Remaining campaign resources: ${cc - fee} CC.`;
        } else {
          aiResponse = "Please type 'signatures' or 'filing exercises'.";
          break;
        }
        setStep("module1");
        break;

      case "module1":
        aiResponse = `Module 1 exercises complete. You have allocated 10 CC of resources and simulated an increase of 100 voter support signatures.`;
        setCC((prev) => prev + 10);
        setSignatures((prev) => prev + 100);
        setStep("module2");
        break;

      case "module2":
        aiResponse = `Module 2 exercises complete. You allocated 15 CC of resources and gained 150 voter support signatures. Current status:
- Campaign Resources: ${cc} CC
- Voter Support: ${signatures} signatures

Next, we will continue with further campaign exercises to prepare for General Election eligibility.`;
        break;
    }

    const aiMessage: Message = { sender: "ai", text: aiResponse };
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div className="flex flex-col h-full p-4 max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded ${
              msg.sender === "user"
                ? "bg-blue-200 self-end"
                : msg.sender === "ai"
                ? "bg-green-200 self-start"
                : "bg-gray-200 self-center"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="px-4 py-1 bg-blue-600 text-white rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

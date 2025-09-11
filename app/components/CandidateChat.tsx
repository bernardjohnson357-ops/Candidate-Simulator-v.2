// app/components/CandidateChat.tsx
"use client";

import { useState, useEffect } from "react";

type Message = {
  sender: string;
  text: string;
  options?: string[];
  refs?: string[];
  quizStep?: number;
};

export default function CandidateChat({ path }: { path: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [cc, setCc] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [voterApproval, setVoterApproval] = useState(0);
  const [input, setInput] = useState("");
  const [quizAttempts, setQuizAttempts] = useState<Record<number, number>>({});
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
  const [ballotAccessMethod, setBallotAccessMethod] = useState<string | null>(null);

  // ✅ Add this line here, with the other state declarations
  const [step, setStep] = useState(1);

  const addMessage = (msg: Message) =>
    setMessages((prev) => [...prev, msg]);

  // ===== Welcome + Office Prompt =====
  useEffect(() => {
    addMessage({
      sender: "ai",
      text: `Welcome to the Candidate Simulator. You’ve chosen the **${path} path**. Candidate Coins (CC) represent simulated campaign resources. **1 CC = $100 (simulated)**.`,
    });

    setTimeout(() => {
      addMessage({
        sender: "ai",
        text: `🗳️ **Step 1: Choose Your Federal Office**\nWhich office are you running for?`,
        options: [
          "A) President",
          "B) U.S. Senate",
          "C) U.S. House of Representatives",
        ],
      });
    }, 500);
  }, [path]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    addMessage({ sender: "user", text: userText });
    const lastMsg = messages[messages.length - 1];

    // ===== Federal Office Selection =====
    if (!selectedOffice && lastMsg.options?.length === 3) {
      let office = "";
      const choice = userText.trim().toUpperCase();
      if (choice === "A" || choice.includes("president")) office = "President";
      if (choice === "B" || choice.includes("senate")) office = "U.S. Senate";
      if (choice === "C" || choice.includes("house")) office = "U.S. House";

      if (!office) {
        addMessage({
          sender: "ai",
          text: `❌ Invalid choice. Please type A, B, or C to select your federal office.`,
        });
        setInput("");
        return;
      }

      setSelectedOffice(office);

      // Show eligibility + ballot options
      if (office === "President") {
        addMessage({
          sender: "ai",
          text: `📜 **Eligibility for President**\n- Natural-born U.S. citizen\n- At least 35 years old\n- Resident of the U.S. for 14+ years\n\nHow do you plan to reach the ballot?`,
          options: [
            "A) Fee Option: 75 CC + 2.5% nationwide approval",
            "B) Signature Option: 25% of nationwide voters",
          ],
        });
      } else if (office === "U.S. Senate") {
        addMessage({
          sender: "ai",
          text: `📜 **Eligibility for U.S. Senate**\n- At least 30 years old\n- U.S. citizen for 9+ years\n- Resident of the state you're running in\n\nHow do you plan to reach the ballot?`,
          options: [
            "A) Fee Option: 50 CC + 2.5% statewide approval",
            "B) Signature Option: 14% of statewide voters",
          ],
        });
      } else if (office === "U.S. House") {
        addMessage({
          sender: "ai",
          text: `📜 **Eligibility for U.S. House**\n- At least 25 years old\n- U.S. citizen for 7+ years\n- Resident of the state/district you're running in\n\nHow do you plan to reach the ballot?`,
          options: [
            "A) Fee Option: 31 CC + 2.5% district approval",
            "B) Signature Option: 7% of district voters",
          ],
        });
      }

      setInput("");
      return;
    }

    // ===== Ballot Access Decision =====
    if (selectedOffice && !ballotAccessMethod && lastMsg.options?.length === 2) {
      const choice = userText.trim().toUpperCase();
      let fee = 0;
      let approvalTarget = 0;

      if (choice === "A") {
        setBallotAccessMethod("Fee");

        if (selectedOffice === "President") { fee = 75; approvalTarget = 2.5; }
        if (selectedOffice === "U.S. Senate") { fee = 50; approvalTarget = 2.5; }
        if (selectedOffice === "U.S. House") { fee = 31; approvalTarget = 2.5; }

        setCc(cc - fee);
        setVoterApproval(approvalTarget);

        addMessage({
          sender: "ai",
          text: `✅ You chose the Fee Option. ${fee} CC deducted. You must reach at least ${approvalTarget}% voter approval to qualify for the ballot.`,
        });
      } else if (choice === "B") {
        setBallotAccessMethod("Signature");

        if (selectedOffice === "President") approvalTarget = 25;
        if (selectedOffice === "U.S. Senate") approvalTarget = 14;
        if (selectedOffice === "U.S. House") approvalTarget = 7;

        setSignatures(Math.ceil(approvalTarget * 1000));
        setVoterApproval(0);

        addMessage({
          sender: "ai",
          text: `✅ You chose the Signature Option. Gather at least ${approvalTarget}% of voters as signatures to qualify for the ballot.`,
        });
      } else {
        addMessage({
          sender: "ai",
          text: `❌ Invalid choice. Please type "A" for Fee Option or "B" for Signature Option.`,
        });
        setInput("");
        return;
      }

      // Trigger first quiz after ballot selection
      addMessage({
        sender: "ai",
        text: `📝 **Quiz – Module 2A (FEC Filing)**\nWhich FEC form registers a campaign committee?`,
        options: [
          "A) Form 1 – Statement of Candidacy",
          "B) Form 2 – Statement of Organization",
          "C) Form 3 – Quarterly Report",
          "D) Form 5 – Independent Expenditures",
        ],
        refs: ["https://www.fec.gov/resources/cms-content/documents/policy-guidance/partygui.pdf"],
        quizStep: 2,
      });

      setInput("");
      return;
    }

    // ===== Quiz Handling =====
    if (lastMsg.options && lastMsg.quizStep) {
      const correctAnswer = "B";
      const stepKey = lastMsg.quizStep;
      const attempts = quizAttempts[stepKey] || 0;

      if (userText.trim().toUpperCase() === correctAnswer) {
        const ccReward = 5;
        const sigReward = 50;
        setCc(cc + ccReward);
        setSignatures(signatures + sigReward);
        addMessage({
          sender: "ai",
          text: `✅ Correct! You earned +${ccReward} CC and +${sigReward} signatures.\nCC: ${cc + ccReward} | Voter Support: ${signatures + sigReward} signatures`,
        });
      } else {
        const ccPenalty = attempts === 0 ? 1 : 2;
        const sigPenalty = attempts === 0 ? 50 : 100;
        setCc(cc - ccPenalty);
        setSignatures(signatures - sigPenalty);
        addMessage({
          sender: "ai",
          text: `❌ Incorrect. –${ccPenalty} CC and –${sigPenalty} signatures.\nCC: ${cc - ccPenalty} | Voter Support: ${signatures - sigPenalty} signatures`,
        });
      }

      setQuizAttempts({ ...quizAttempts, [stepKey]: attempts + 1 });
      setInput("");
      return;
    }

    // ===== Default fallback =====
    addMessage({
      sender: "ai",
      text: `I’ll guide you through Module ${step}. You can request a "summary brief" or "summary detailed", or confirm completion by typing "done".`,
    });
    setInput("");
  };

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-2xl">
      <div className="h-96 overflow-y-auto border p-2 mb-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === "ai" ? "text-blue-700" : "text-gray-800"}`}>
            <strong>{msg.sender === "ai" ? "AI" : "You"}:</strong> {msg.text}
            {msg.refs && msg.refs.length > 0 && (
              <ul className="text-xs text-gray-500 mt-1">
                {msg.refs.map((ref, i) => (
                  <li key={i}><a href={ref} target="_blank" className="underline text-blue-500">{ref}</a></li>
                ))}
              </ul>
            )}
            {msg.options && msg.options.length > 0 && (
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {msg.options.map((opt, i) => (<li key={i}>{opt}</li>))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border px-2 py-1 rounded-l"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-r">Send</button>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        CC: {cc} | Voter Support: {signatures} signatures
        {ballotAccessMethod === "Fee" && voterApproval > 0 && (
          <span> | Minimum Approval Required: {voterApproval}%</span>
        )}
      </div>
    </div>
  );
}

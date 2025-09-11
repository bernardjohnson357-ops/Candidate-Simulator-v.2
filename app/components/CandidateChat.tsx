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

type QuizState = {
  totalQuestions: number;
  correctAnswers: number;
  quizStep?: number;
};

export default function CandidateChat({ path }: { path: "Party" | "Independent" }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [cc, setCc] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [voterApproval, setVoterApproval] = useState(0);
  const [input, setInput] = useState("");
  const [quizAttempts, setQuizAttempts] = useState<Record<number, number>>({});
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
  const [ballotAccessMethod, setBallotAccessMethod] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<QuizState | null>(null);

  const addMessage = (msg: Message) =>
    setMessages((prev) => [...prev, msg]);

  // ===== Module 0 Initialization =====
  useEffect(() => {
    // Module 0 intro
    addMessage({
      sender: "ai",
      text: `### Module 0 – Introduction\n🎯 Purpose: Learn how the simulator works and prepare for federal candidacy.\n\nYou start with 50 CC. Your goal is to understand ballot access, FEC filings, and voter signatures.\n\nYou will earn CC and voter signatures by completing quizzes and tasks.`,
    });

    addMessage({
      sender: "ai",
      text: `💡 Key Rules:\n- Read tasks before writing.\n- Writing tasks must be typed.\n- Speaking tasks must use voice input.\n\nThis scaffolding ensures clear thinking before persuasive action.`,
    });

    // Prompt to choose office
    setTimeout(() => {
      addMessage({
        sender: "ai",
        text: `🗳️ First, choose the federal office you want to run for:`,
        options: [
          "A) President",
          "B) U.S. Senate",
          "C) U.S. House of Representatives",
        ],
      });
    }, 500);
  }, []);

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

      // Trigger Module 1 quiz based on path
      if (path === "Independent") {
        setCurrentModule("1A");
        setCurrentQuiz({ totalQuestions: 1, correctAnswers: 0, quizStep: 1 });
        addMessage({
          sender: "ai",
          text: `📝 Module 1A – Independent Filing Quiz: Complete the SOS filing task.`,
        });
      } else {
        setCurrentModule("1B");
        setCurrentQuiz({ totalQuestions: 1, correctAnswers: 0, quizStep: 1 });
        addMessage({
          sender: "ai",
          text: `📝 Module 1B – Party Filing Quiz: Complete the SOS + FEC basics.`,
        });
      }

      setInput("");
      return;
    }

    // ===== Quiz Handling with Score-Based Rewards =====
    if (lastMsg.options && lastMsg.quizStep && currentQuiz) {
      const correctAnswer = "B"; // placeholder, can vary per quiz
      const stepKey = lastMsg.quizStep;

      let newCorrectAnswers = currentQuiz.correctAnswers;
      if (userText.trim().toUpperCase() === correctAnswer) {
        newCorrectAnswers += 1;
        addMessage({ sender: "ai", text: `✅ Correct!` });
      } else {
        addMessage({ sender: "ai", text: `❌ Incorrect.` });
      }

      // Update attempts
      const attempts = quizAttempts[stepKey] || 0;
      setQuizAttempts({ ...quizAttempts, [stepKey]: attempts + 1 });

      // Quiz completed
      if (newCorrectAnswers >= currentQuiz.totalQuestions) {
        const scorePercent = (newCorrectAnswers / currentQuiz.totalQuestions) * 100;

        if (scorePercent === 100) {
          setSignatures(signatures + 100);
          setCc(cc + 2);
          addMessage({ sender: "ai", text: `🎉 Perfect score! You earned +100 signatures and +2 CC.` });
        } else if (scorePercent >= 80) {
          setSignatures(signatures + 80);
          setCc(cc + 1);
          addMessage({ sender: "ai", text: `✅ Great job! You scored 80%+. You earned +80 signatures and +1 CC.` });
        } else {
          addMessage({ sender: "ai", text: `You scored below 80%. No extra CC or signatures awarded.` });
        }

        // Trigger next module (Module 2) after Module 1 completion
        if (currentModule === "1A") {
          setCurrentModule("2A");
          addMessage({
            sender: "ai",
            text: `📝 Module 2A – FEC Filing Fee Quiz (Independent). Complete Forms 1 & 2.`,
          });
        } else if (currentModule === "1B") {
          setCurrentModule("2B");
          addMessage({
            sender: "ai",
            text: `📝 Module 2B – FEC Filing Fee Quiz (Party). Complete Forms 1 & 2.`,
          });
        }

        setCurrentQuiz(null);
      } else {
        setCurrentQuiz({ ...currentQuiz, correctAnswers: newCorrectAnswers });
      }

      setInput("");
      return;
    }

    // ===== Default Guidance =====
    addMessage({
      sender: "ai",
      text: `I’ll guide you through the simulation. You can request a "summary brief" or "summary detailed", or confirm completion by typing "done".`,
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
                  <li key={i}>
                    <a href={ref} target="_blank" rel="noreferrer" className="underline text-blue-500">
                      {ref}
                    </a>
                  </li>
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

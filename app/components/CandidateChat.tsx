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

  const SIGNATURE_TO_APPROVAL = 0.0001;

  const addMessage = (msg: Message) =>
    setMessages(prev => [...prev, msg]);

  // ===== Module 0 Initialization =====
  useEffect(() => {
    addMessage({
      sender: "ai",
      text: `### Module 0 – Introduction\n🎯 Purpose: Learn how the simulator works and prepare for federal candidacy.\n\nYou start with 50 CC. Your goal is to understand ballot access, FEC filings, and voter signatures.\n\nYou will earn CC and voter signatures by completing quizzes and tasks.`,
    });

    addMessage({
      sender: "ai",
      text: `💡 Key Rules:\n- Read tasks before writing.\n- Writing tasks must be typed.\n- Speaking tasks must use voice input.\n\nThis scaffolding ensures clear thinking before persuasive action.`,
    });

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

    // ===== Office Selection =====
    if (!selectedOffice && lastMsg.options?.length === 3) {
      let office = "";
      const choice = userText.trim().toUpperCase();
      if (choice === "A" || choice.includes("president")) office = "President";
      if (choice === "B" || choice.includes("senate")) office = "U.S. Senate";
      if (choice === "C" || choice.includes("house")) office = "U.S. House";

      if (!office) {
        addMessage({ sender: "ai", text: `❌ Invalid choice. Please type A, B, or C.` });
        setInput(""); return;
      }

      setSelectedOffice(office);

      const options = office === "President" ? [
        "A) Fee Option: 75 CC + 2.5% nationwide approval",
        "B) Signature Option: 25% of nationwide voters"
      ] : office === "U.S. Senate" ? [
        "A) Fee Option: 50 CC + 2.5% statewide approval",
        "B) Signature Option: 14% of statewide voters"
      ] : [
        "A) Fee Option: 31 CC + 2.5% district approval",
        "B) Signature Option: 7% of district voters"
      ];

      addMessage({ sender: "ai", text: `📜 Eligibility for ${office}:\nChoose your ballot access method:`, options });
      setInput(""); return;
    }

    // ===== Ballot Access =====
    if (selectedOffice && !ballotAccessMethod && lastMsg.options?.length === 2) {
      const choice = userText.trim().toUpperCase();
      let fee = 0; let approvalTarget = 0;

      if (choice === "A") {
        setBallotAccessMethod("Fee");
        if (selectedOffice === "President") { fee=75; approvalTarget=2.5; }
        if (selectedOffice === "U.S. Senate") { fee=50; approvalTarget=2.5; }
        if (selectedOffice === "U.S. House") { fee=31; approvalTarget=2.5; }
        setCc(cc - fee); setVoterApproval(approvalTarget);
        addMessage({ sender:"ai", text:`✅ Fee Option selected. ${fee} CC deducted. Minimum approval: ${approvalTarget}%.` });
      } else if (choice==="B") {
        setBallotAccessMethod("Signature");
        if (selectedOffice==="President") approvalTarget=25;
        if (selectedOffice==="U.S. Senate") approvalTarget=14;
        if (selectedOffice==="U.S. House") approvalTarget=7;
        const initSignatures=Math.ceil(approvalTarget*1000);
        setSignatures(initSignatures);
        setVoterApproval(initSignatures*SIGNATURE_TO_APPROVAL);
        addMessage({ sender:"ai", text:`✅ Signature Option selected. You start with ${initSignatures} signatures (~${(initSignatures*SIGNATURE_TO_APPROVAL).toFixed(2)}% voter approval).` });
      } else {
        addMessage({ sender:"ai", text:`❌ Invalid choice. Type "A" or "B".` }); setInput(""); return;
      }

      // Trigger branch module
      if(path==="Independent") { setCurrentModule("1A"); setCurrentQuiz({totalQuestions:1, correctAnswers:0, quizStep:1});
        addMessage({sender:"ai", text:"📝 Module 1A – Independent Filing Quiz: Complete the SOS filing task."});
      } else { setCurrentModule("1B"); setCurrentQuiz({totalQuestions:1, correctAnswers:0, quizStep:1});
        addMessage({sender:"ai", text:"📝 Module 1B – Party Filing Quiz: Complete the SOS + FEC basics."});
      }
      setInput(""); return;
    }

    // ===== Quiz Handling =====
    if(lastMsg.options && lastMsg.quizStep && currentQuiz){
      const correctAnswer="B"; let newCorrectAnswers=currentQuiz.correctAnswers;
      let earnedSignatures=0; let earnedCC=0;
      if(userText.trim().toUpperCase()===correctAnswer) { newCorrectAnswers+=1; addMessage({sender:"ai", text:"✅ Correct!"}); }
      else { addMessage({sender:"ai", text:"❌ Incorrect."}); }

      const attempts = quizAttempts[lastMsg.quizStep]||0;
      setQuizAttempts({...quizAttempts, [lastMsg.quizStep]: attempts+1});

      if(newCorrectAnswers>=currentQuiz.totalQuestions){
        const scorePercent=(newCorrectAnswers/currentQuiz.totalQuestions)*100;
        if(scorePercent===100){ earnedSignatures=100; earnedCC=2; }
        else if(scorePercent>=80){ earnedSignatures=80; earnedCC=1; }

        setSignatures(prev => { const newSigs=prev+earnedSignatures; 
          if(ballotAccessMethod==="Signature") setVoterApproval(newSigs*SIGNATURE_TO_APPROVAL); return newSigs; });
        setCc(prev => prev+earnedCC);

        addMessage({sender:"ai", text:`🎯 Quiz complete! +${earnedSignatures} signatures, +${earnedCC} CC. Voter approval: ${voterApproval.toFixed(2)}%.`});

        if(currentModule==="1A"){ setCurrentModule("2A"); addMessage({sender:"ai", text:"📝 Module 2A – FEC Filing Fee Quiz (Independent). Complete Forms 1 & 2."}); }
        else if(currentModule==="1B"){ setCurrentModule("2B"); addMessage({sender:"ai", text:"📝 Module 2B – FEC Filing Fee Quiz (Party). Complete Forms 1 & 2."}); }

        setCurrentQuiz(null);
      } else { setCurrentQuiz({...currentQuiz, correctAnswers:newCorrectAnswers}); }

      setInput(""); return;
    }

    addMessage({sender:"ai", text:`I’ll guide you. You can request "summary brief", "summary detailed", or confirm completion with "done".`});
    setInput("");
  };

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-2xl">
      <div className="h-96 overflow-y-auto border p-2 mb-2 bg-gray-50">
        {messages.map((msg, idx)=>(
          <div key={idx} className={`mb-2 ${msg.sender==="ai"?"text-blue-700":"text-gray-800"}`}>
            <strong>{msg.sender==="ai"?"AI":"You"}:</strong> {msg.text}

            {msg.refs && msg.refs.length>0 && (
              <ul className="text-xs text-gray-500 mt-1">
                {msg.refs.map((ref,i)=>(
                  <li key={i}>
                    <a href={ref} target="_blank" rel="noreferrer" className="underline text-blue-500">{ref}</a>
                  </li>
                ))}
              </ul>
            )}

            {msg.options && msg.options.length>0 && (
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {msg.options.map((opt,i)=>(<li key={i}>{opt}</li>))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          className="flex-grow border px-2 py-1 rounded-l"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-r">Send</button>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        CC: {cc} | Voter Support: {signatures} signatures
        {ballotAccessMethod==="Fee" && voterApproval>0 && (
          <span> | Minimum Approval Required: {voterApproval}%</span>
        )}
        {ballotAccessMethod==="Signature" && (
          <span> | Current Voter Approval: {voterApproval.toFixed(2)}%</span>
        )}
      </div>
    </div>
  );
}

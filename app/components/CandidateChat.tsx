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
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
  const [ballotAccessMethod, setBallotAccessMethod] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<QuizState | null>(null);

  const [quizRetakes, setQuizRetakes] = useState<Record<string, number>>({});
  const SIGNATURE_TO_APPROVAL = 0.0001;

  const addMessage = (msg: Message) =>
    setMessages(prev => [...prev, msg]);

  // Branch quiz data
  const branchQuizzes: Record<string, any[]> = {
    "1A": [
      {
        question: "Which step is required first for Independent/Write-In filing at the state level?",
        options: ["A) Submit FEC Form 1", "B) File with Secretary of State", "C) Fundraise $500", "D) Launch campaign website"],
        correct: "B",
        ccReward80: 1,
        ccReward100: 2,
        sigReward80: 80,
        sigReward100: 100
      }
    ],
    "2A": [
      {
        question: "Which FEC form registers an independent campaign committee?",
        options: ["A) Form 3 – Quarterly Report", "B) Form 2 – Statement of Organization", "C) Form 1 – Statement of Candidacy", "D) Form 5 – Independent Expenditures"],
        correct: "B",
        ccReward80: 1,
        ccReward100: 2,
        sigReward80: 80,
        sigReward100: 100
      }
    ],
    "1B": [
      {
        question: "Party candidates must submit which state form first?",
        options: ["A) SOS Nomination Form", "B) FEC Form 1", "C) FEC Form 3", "D) State Campaign Fee Receipt"],
        correct: "A",
        ccReward80: 1,
        ccReward100: 2,
        sigReward80: 80,
        sigReward100: 100
      }
    ],
    "2B": [
      {
        question: "Which FEC form is required to register a party campaign committee?",
        options: ["A) Form 1 – Statement of Candidacy", "B) Form 2 – Statement of Organization", "C) Form 3 – Quarterly Report", "D) Form 5 – Independent Expenditures"],
        correct: "B",
        ccReward80: 1,
        ccReward100: 2,
        sigReward80: 80,
        sigReward100: 100
      }
    ]
  };

  // Module 0 Initialization
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

    // Office Selection
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

    // Ballot Access
    if (selectedOffice && !ballotAccessMethod && lastMsg.options?.length === 2) {
      const choice = userText.trim().toUpperCase();
      let fee = 0, approvalTarget = 0;

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

      // Trigger first module quiz
      const firstModule = path === "Independent" ? "1A" : "1B";
      setCurrentModule(firstModule);
      if (branchQuizzes[firstModule] && branchQuizzes[firstModule].length>0){
        const quiz = branchQuizzes[firstModule][0];
        setCurrentQuiz({ totalQuestions:1, correctAnswers:0, quizStep:1 });
        addMessage({
          sender:"ai",
          text:`📝 ${firstModule} Quiz: ${quiz.question}`,
          options: quiz.options,
          quizStep:1
        });
      }

      setInput(""); return;
    }

    // Quiz Handling with Retakes
    if(lastMsg.options && lastMsg.quizStep && currentModule && branchQuizzes[currentModule]){
      const moduleKey = currentModule;
      const retakesUsed = quizRetakes[moduleKey] || 0;
      const quiz = branchQuizzes[moduleKey][0];
      const userAnswer = userText.trim().toUpperCase();

      if(userAnswer !== quiz.correct){
        if(retakesUsed === 0){
          // Allow first retake for free
          setQuizRetakes({...quizRetakes, [moduleKey]: 1});
          addMessage({sender:"ai", text:`❌ Incorrect. You can retake this quiz once without penalty. Please try again.`});
          setInput(""); return;
        }
        // For Form 3 later, apply penalties here
      } else {
        // Correct answer
        let earnedCC = quiz.ccReward100;
        let earnedSigs = quiz.sigReward100;
        if(retakesUsed > 0) { /* optional: bonus or no change */ }

        setCc(prev=>prev+earnedCC);
        setSignatures(prev=>{ const newSigs=prev+earnedSigs; if(ballotAccessMethod==="Signature") setVoterApproval(newSigs*SIGNATURE_TO_APPROVAL); return newSigs; });
        addMessage({ sender:"ai", text:`✅ Correct! +${earnedSigs} signatures, +${earnedCC} CC.`});

        // Move to next module or General Election
        if(currentModule==="1A") setCurrentModule("2A");
        else if(currentModule==="1B") setCurrentModule("2B");
        else if(currentModule==="2A" || currentModule==="2B") {
          setCurrentModule("GeneralElection");
          addMessage({ sender:"ai", text:"🎉 You have unlocked the General Election branch."});
        }

        setCurrentQuiz(null);
        setInput(""); return;
      }
    }

    // Default guidance
    addMessage({sender:"ai", text:`I’ll guide you. You can request "summary brief", "summary detailed", or confirm completion with "done".`});
    setInput("");
  };

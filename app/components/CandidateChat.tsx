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

export default function CandidateChat({ path }: { path: "Party" | "Independent" }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [cc, setCc] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [voterApproval, setVoterApproval] = useState(0);
  const [input, setInput] = useState("");
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
  const [ballotAccessMethod, setBallotAccessMethod] = useState<string | null>(null);
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<any | null>(null);
  const [quizRetakes, setQuizRetakes] = useState<Record<string, number>>({});
  const SIGNATURE_TO_APPROVAL = 0.0001;

  const addMessage = (msg: Message) => setMessages(prev => [...prev, msg]);

  const branchQuizzes: Record<string, any[]> = {
    "1A": [{ question: "Which step is required first for Independent/Write-In filing?", options:["A) Submit FEC Form 1","B) File with Secretary of State","C) Fundraise $500","D) Launch website"], correct:"B", ccReward80:1, ccReward100:2, sigReward80:80, sigReward100:100 }],
    "2A": [{ question: "Which FEC form registers an independent campaign committee?", options:["A) Form 3","B) Form 2","C) Form 1","D) Form 5"], correct:"B", ccReward80:1, ccReward100:2, sigReward80:80, sigReward100:100 }],
    "1B": [{ question: "Party candidates must submit which state form first?", options:["A) SOS Nomination","B) FEC Form 1","C) FEC Form 3","D) State Fee Receipt"], correct:"A", ccReward80:1, ccReward100:2, sigReward80:80, sigReward100:100 }],
    "2B": [{ question: "Which FEC form registers a party campaign committee?", options:["A) Form 1","B) Form 2","C) Form 3","D) Form 5"], correct:"B", ccReward80:1, ccReward100:2, sigReward80:80, sigReward100:100 }],
    "Form3": [{ question: "Form 3 Quarterly Report – Submit correctly?", options:["A) Accurate","B) Inaccurate","C) Skip"], correct:"A", penaltyCC:1, penaltySignatures:50 }]
  };

  useEffect(() => {
    addMessage({ sender:"ai", text:`### Module 0 – Introduction\n🎯 Learn how the simulator works.\nYou start with 50 CC. Earn CC and voter signatures by completing quizzes and tasks.`});
    setTimeout(() => {
      addMessage({ sender:"ai", text:`🗳️ Choose your federal office:`, options:["A) President","B) U.S. Senate","C) U.S. House"] });
    }, 300);
  }, []);

  const sendMessage = () => {
    if(!input.trim()) return;
    const userText = input.trim();
    addMessage({ sender:"user", text:userText });
    const lastMsg = messages[messages.length-1];

    // Office selection
    if(!selectedOffice && lastMsg.options?.length===3){
      let office = "";
      const choice = userText.toUpperCase();
      if(choice==="A" || choice.includes("president")) office="President";
      if(choice==="B" || choice.includes("senate")) office="U.S. Senate";
      if(choice==="C" || choice.includes("house")) office="U.S. House";
      if(!office){ addMessage({sender:"ai", text:"❌ Invalid. Type A, B, or C."}); setInput(""); return; }
      setSelectedOffice(office);
      const options = office==="President"?["A) Fee Option: 75 CC + 2.5%","B) Signature Option: 25%"]
                    : office==="U.S. Senate"?["A) Fee Option: 50 CC + 2.5%","B) Signature Option: 14%"]
                    : ["A) Fee Option: 31 CC + 2.5%","B) Signature Option: 7%"];
      addMessage({ sender:"ai", text: `📜 Eligibility for ${office} – choose ballot access:`, options });
      setInput(""); return;
    }

    // Ballot Access
    if(selectedOffice && !ballotAccessMethod && lastMsg.options?.length===2){
      const choice = userText.toUpperCase();
      let fee=0, approvalTarget=0;
      if(choice==="A"){ // Fee
        setBallotAccessMethod("Fee");
        if(selectedOffice==="President"){fee=75; approvalTarget=2.5;}
        if(selectedOffice==="U.S. Senate"){fee=50; approvalTarget=2.5;}
        if(selectedOffice==="U.S. House"){fee=31; approvalTarget=2.5;}
        setCc(cc-fee); setVoterApproval(approvalTarget);
        addMessage({sender:"ai", text:`✅ Fee Option selected. ${fee} CC deducted. Minimum approval: ${approvalTarget}%.`});
      } else if(choice==="B"){ // Signature
        setBallotAccessMethod("Signature");
        if(selectedOffice==="President") approvalTarget=25;
        if(selectedOffice==="U.S. Senate") approvalTarget=14;
        if(selectedOffice==="U.S. House") approvalTarget=7;
        const initSignatures=Math.ceil(approvalTarget*1000);
        setSignatures(initSignatures);
        setVoterApproval(initSignatures*SIGNATURE_TO_APPROVAL);
        addMessage({sender:"ai", text:`✅ Signature Option selected. You start with ${initSignatures} signatures (~${(initSignatures*SIGNATURE_TO_APPROVAL).toFixed(2)}% voter approval).`});
      } else { addMessage({sender:"ai", text:"❌ Invalid. Type A or B."}); setInput(""); return; }

      // Trigger first quiz
      const firstModule = path==="Independent"?"1A":"1B";
      setCurrentModule(firstModule);
      const quiz = branchQuizzes[firstModule][0];
      setCurrentQuiz({ totalQuestions: 1, correctAnswers: 0, quizStep: 1 });
      addMessage({ sender: "ai", text: `📝 ${firstModule} Quiz: ${quiz.question}`, options: quiz.options, quizStep: 1 });
      setInput(""); return;
    }

    // Quiz Handling including Form 3
    if(currentModule && currentQuiz && lastMsg.quizStep){
      const moduleKey = currentModule;
      const retakesUsed = quizRetakes[moduleKey] || 0;
      const quiz = currentModule==="Form3"?branchQuizzes["Form3"][0]:branchQuizzes[moduleKey][0];
      const answer = userText.toUpperCase();

      // Incorrect answer handling
      if(answer!==quiz.correct){
        if(moduleKey==="Form3"){
          const penaltyCC=quiz.penaltyCC||1;
          const penaltySignatures=quiz.penaltySignatures||50;
          const multiplier=retakesUsed>0?2:1;
          setCc(prev=>Math.max(prev-penaltyCC*multiplier,0));
          setSignatures(prev=>Math.max(prev-penaltySignatures*multiplier,0));
          setQuizRetakes({...quizRetakes,[moduleKey]:retakesUsed+1});
          addMessage({sender:"ai", text:`❌ Incorrect Form 3. Lost ${penaltyCC*multiplier} CC and ${penaltySignatures*multiplier} signatures. Retake allowed once.`});
          setInput(""); return;
        } else if(retakesUsed===0){
          setQuizRetakes({...quizRetakes,[moduleKey]:1});
          addMessage({sender:"ai", text:"❌ Incorrect. You can retake once without penalty."});
          setInput(""); return;
        } else {
          addMessage({sender:"ai", text:"❌ Incorrect again. Move on."});
        }
      } else {
        addMessage({sender:"ai", text:"✅ Correct!"});
      }

      // Update rewards for normal modules
      if(moduleKey!=="Form3"){
        setCc(prev=>prev+(answer===quiz.correct?quiz.ccReward100:quiz.ccReward80));
        setSignatures(prev=>{
          const newSigs=prev+(answer===quiz.correct?quiz.sigReward100:quiz.sigReward80);
          if(ballotAccessMethod==="Signature") setVoterApproval(newSigs*SIGNATURE_TO_APPROVAL);
          return newSigs;
        });
      }

      setCurrentQuiz(null);

      // Progression logic
      if(currentModule==="1A") setCurrentModule("2A");
      else if(currentModule==="1B") setCurrentModule("2B");
      else if(currentModule==="2A"||currentModule==="2B"){
        if(ballotAccessMethod==="Fee" && voterApproval>=2.5 && (selectedOffice==="President"||selectedOffice==="U.S. Senate")){
          setCurrentModule("Form3");
          setCurrentQuiz({totalQuestions:1,correctAnswers:0,quizStep:1});
          addMessage({sender:"ai", text:"📝 Form 3 – Quarterly Report Quiz: You must file Form 3 correctly. Mistakes carry penalties.", options:["A) Submit accurate Form 3","B) Submit inaccurate Form 3","C) Skip filing"], quizStep:1});
          setInput(""); return;
        } else {
          setCurrentModule("3");
          addMessage({sender:"ai", text:"🎯 Module 3 – First Moves: Allocate CC for campaign setup (website, ads, infrastructure) and recruit team members."});
        }
      }

      setInput(""); return;
    }

    // Default guidance
    addMessage({sender:"ai", text:`I’ll guide you. You can request "summary brief", "summary detailed", or confirm completion with "done".`});
    setInput("");
  };

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-2xl">
      <div className="h-96 overflow-y-auto border p-2 mb-2 bg-gray-50">
        {messages.map((msg, idx)=>(
          <div key={idx} className={`mb-2 ${msg.sender==="ai"?"text-blue-700":"text-gray-800"}`}>
            <strong>{msg.sender==="ai"?"AI":"You"}:</strong> {msg.text}
            {msg.options && (
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {msg

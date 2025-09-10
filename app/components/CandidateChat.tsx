// app/components/CandidateChat.tsx
"use client";

import { useState, useEffect } from "react";

type CandidateChatProps = {
  path: "Party" | "Independent";
};

type Message = {
  sender: "system" | "user" | "ai";
  text: string;
};

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export default function CandidateChat({ path }: CandidateChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "system",
      text: `Welcome to the Federal Candidate Simulator. I will guide you through a realistic campaign simulation.
- You start with 50 Candidate Coins (CC), representing simulated campaign resources.
- Completing campaign tasks allocates these resources and builds voter support (signatures).
- Signatures = voter support (1 signature = 0.0001 approval).
- Typed or spoken responses are used in selected modules (7–10).
- Image upload is optional after Module 5. All feedback is instructional.
- For compliance documents, you can always request a brief or detailed summary before quizzes.`,
    },
  ]);

  const [input, setInput] = useState("");
  const [cc, setCC] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [step, setStep] = useState(1); // Module 1–15
  const [modulePrompted, setModulePrompted] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);

  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [imageUploadEnabled, setImageUploadEnabled] = useState(false);

  const addMessage = (msg: Message) =>
    setMessages((prev) => [...prev, msg]);

  // Sample compliance quiz questions for Module 1
  const complianceQuizzes: Record<number, QuizQuestion[]> = {
    1: [
      {
        question: "What is the purpose of FEC Form 1?",
        options: [
          "Declare candidacy",
          "Register committee",
          "Report donations",
          "Collect signatures",
        ],
        correctAnswer: "Declare candidacy",
      },
      {
        question: "What information is required on Form 2?",
        options: [
          "Committee info, treasurer, bank info",
          "Candidate’s birth certificate",
          "Party platform statement",
          "Election results",
        ],
        correctAnswer: "Committee info, treasurer, bank info",
      },
    ],
  };

  // Present module prompts and optional summaries
  useEffect(() => {
    if (!modulePrompted) {
      let promptText = "";
      switch (step) {
        case 1:
          promptText = `Module 1: Independent Filing

You are required to understand the following compliance documents:
- FEC Form 1 – Statement of Candidacy
- FEC Form 2 – Statement of Organization
- State SOS Filing

Type "summary brief" for key points or "summary detailed" for full explanation. When ready, you will take a quiz to confirm your understanding.`;
          break;

        case 2:
          promptText = `Module 2: FEC Filing Fee Quiz (Independent)
Review your prior compliance knowledge. You will take a quiz on FEC Forms 1 & 2 and SOS filing. Type "summary brief" or "summary detailed" to review before starting.`;
          break;

        default:
          promptText = `Module ${step} instructions.`;
      }

      addMessage({ sender: "ai", text: promptText });
      setModulePrompted(true);
    }
  }, [step, modulePrompted]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    addMessage({ sender: "user", text });

    const lowerText = text.toLowerCase();

    // Handle summary requests
    if (lowerText.includes("summary brief")) {
      addMessage({
        sender: "ai",
        text:
          "Brief Summary:\n- Form 1: declares candidacy\n- Form 2: registers committee\n- SOS filing: state ballot access",
      });
      return;
    }

    if (lowerText.includes("summary detailed")) {
      addMessage({
        sender: "ai",
        text:
          "Detailed Summary:\n- FEC Form 1 (Statement of Candidacy): declares your candidacy. Required fields: candidate name, office, election year.\n- FEC Form 2 (Statement of Organization): registers your campaign committee, treasurer, bank info, initial finances.\n- State SOS filing: ensures ballot access, either through signatures or fees. Check deadlines and requirements carefully. Links: [FEC Forms](https://www.fec.gov/forms/).",
      });
      return;
    }

    // Handle quizzes
    if (!quizActive && complianceQuizzes[step]) {
      setCurrentQuiz(complianceQuizzes[step][0]);
      setQuizActive(true);
      addMessage({ sender: "ai", text: `Quiz: ${complianceQuizzes[step][0].question}\nOptions: ${complianceQuizzes[step][0].options.join(", ")}` });
      return;
    }

    if (quizActive && currentQuiz) {
      if (text.trim().toLowerCase() === currentQuiz.correctAnswer.toLowerCase()) {
        addMessage({ sender: "ai", text: "Correct. Compliance understanding confirmed." });
        setCC((prev) => prev + 5);
        setSignatures((prev) => prev + 50);
      } else {
        addMessage({ sender: "ai", text: `Incorrect. Review the document and try again. Correct answer: ${currentQuiz.correctAnswer}` });
      }
      setQuizActive(false);
      setCurrentQuiz(null);
      setStep(step + 1);
      setModulePrompted(false);
      return;
    }

    // Default message for other steps
    addMessage({ sender: "ai", text: "Response recorded. Continuing simulation..." });
    setStep(step + 1);
    setModulePrompted(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    addMessage({ sender: "user", text: `[Image uploaded: ${file.name}]` });
    addMessage({
      sender: "ai",
      text: "Image reviewed. Feedback provided on clarity, layout, and professional presentation. Simulated CC and voter support updated.",
    });

    setCC((prev) => prev + 5);
    setSignatures((prev) => prev + 50);
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      sendMessage(spokenText);
    };

    recognition.onerror = (event: any) => console.error(event.error);
    recognition.start();
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

      <div className="flex space-x-2 mb-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Type your response..."
        />
        <button
          className="px-4 py-1 bg-blue-600 text-white rounded"
          onClick={() => sendMessage(input)}
        >
          Send
        </button>
      </div>

      {speechEnabled && (
        <button
          className="px-4 py-1 bg-green-600 text-white rounded mb-2"
          onClick={startSpeechRecognition}
        >
          Speak
        </button>
      )}

      {imageUploadEnabled && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2"
        />
      )}

      <div className="mt-2 text-sm text-gray-600">
        CC: {cc} | Voter Support: {signatures} signatures
      </div>
    </div>
  );
}

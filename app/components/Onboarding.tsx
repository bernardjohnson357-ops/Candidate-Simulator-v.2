//app/components/Onboarding.tsx
"use client";

import { useState, useEffect, useRef } from "react";

// ----------------------
// Exported Types
// ----------------------
export type OnboardingPath = "Independent" | "Party" | "thirdParty";
export type FilingOption = "signatures" | "filingFee";

// ----------------------
// Declare SpeechRecognition types
// ----------------------
declare global {
  interface Window {
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

type SpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: any) => void;
};

// ----------------------
// Interfaces
// ----------------------
interface Question {
  id: string;
  type: "text" | "multipleChoice";
  question: string;
  options?: string[];
}

interface ModuleTask {
  message: string;
  nextTask: string | null;
  currentModule: string;
  readingLinks?: string[];
  questions?: Question[];
  fecTriggered?: boolean;
  cc: number;
  signatures: number;
}

interface OnboardingProps {
  path: OnboardingPath;
  filingOption: FilingOption;
  onComplete?: (path: OnboardingPath, option: FilingOption) => void; // ✅ added
}

// ----------------------
// Component
// ----------------------
export default function Onboarding({
  path,
  filingOption,
  onComplete,
}: OnboardingProps) {
  const [userId] = useState("user123"); // TODO: Replace with real auth/session user
  const [task, setTask] = useState<ModuleTask | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // ----------------------
  // Init user state (branch by path + filingOption)
  // ----------------------
  useEffect(() => {
    fetch("/api/simulator", {
      method: "POST",
      body: JSON.stringify({
        userId,
        action: "init",
        payload: { path, filingOption },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Add different reading links based on branch
        if (path === "Independent" || path === "thirdParty") {
          if (filingOption === "signatures") {
            data.readingLinks = [
              "https://www.sos.state.tx.us/elections/candidates/guide/2024/ind2024.shtml",
              "https://www.fec.gov/resources/cms-content/documents/policy-guidance/candgui.pdf",
            ];
          } else {
            data.readingLinks = [
              "https://www.bernardjohnson4congress.com/candidate_simulator_homepage_-test_mode",
              "https://www.fec.gov/resources/cms-content/documents/policy-guidance/candgui.pdf",
            ];
          }
        } else if (path === "Party") {
          data.readingLinks = [
            "https://www.sos.state.tx.us/elections/candidates/guide/2024/lib-green-nom2024.shtml",
            "https://www.fec.gov/resources/cms-content/documents/policy-guidance/candgui.pdf",
          ];
        }

        // Example quiz per branch
        data.questions =
          path === "Party"
            ? [
                {
                  id: "partyQuiz",
                  type: "multipleChoice",
                  question: "Which form must Party candidates file with the FEC?",
                  options: ["Form 1", "Form 3", "Form 5", "Form 99"],
                },
              ]
            : [
                {
                  id: "indQuiz",
                  type: "text",
                  question:
                    "Explain the independent/third-party filing requirements in your own words.",
                },
              ];

        setTask(data);
      });
  }, [userId, path, filingOption]);

  // ----------------------
  // Quiz logic
  // ----------------------
  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const submitQuiz = async () => {
    const res = await fetch("/api/simulator", {
      method: "POST",
      body: JSON.stringify({
        userId,
        action: "completeQuiz",
        payload: { quizId: task?.nextTask, answers },
      }),
    });
    const data = await res.json();
    setTask(data);
    setShowQuiz(false);

    // ✅ Notify parent that onboarding is complete
    if (onComplete) {
      onComplete(path, filingOption);
    }
  };

  // ----------------------
  // Speech-to-text
  // ----------------------
  const startSpeech = () => {
    if (!("webkitSpeechRecognition" in window))
      return alert("Speech API not supported");

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      handleAnswerChange("quizSpeech", text);
    };

    recognition.start();
    setSpeechActive(true);
  };

  const stopSpeech = () => {
    recognitionRef.current?.stop();
    setSpeechActive(false);
  };

  // ----------------------
  // Render
  // ----------------------
  if (!task) return <p>Loading simulator...</p>;

  return (
    <div className="p-4">
      <h2>Candidate Simulator</h2>
      <p>Path: {path}</p>
      <p>Filing Option: {filingOption}</p>
      <p>### Candidate Coins: {task.cc}</p>
      <p>### Signatures: {task.signatures}</p>

      <pre>{task.message}</pre>

      {task.readingLinks && (
        <div className="mt-2">
          <h4>Reading / References:</h4>
          <ul>
            {task.readingLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {task.nextTask && !showQuiz && (
        <button
          onClick={() => setShowQuiz(true)}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Start Task: {task.nextTask}
        </button>
      )}

      {showQuiz && task.questions && (
        <div className="mt-4 p-4 border rounded">
          {task.questions.map((q) => (
            <div key={q.id} className="mb-4">
              <p>{q.question}</p>
              {q.type === "text" && (
                <>
                  <textarea
                    rows={4}
                    className="w-full border p-2"
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                  <div className="mt-1">
                    {!speechActive ? (
                      <button
                        className="p-2 bg-green-500 text-white rounded"
                        onClick={startSpeech}
                      >
                        Speak Answer
                      </button>
                    ) : (
                      <button
                        className="p-2 bg-red-500 text-white rounded"
                        onClick={stopSpeech}
                      >
                        Stop Speaking
                      </button>
                    )}
                  </div>
                </>
              )}
              {q.type === "multipleChoice" && q.options && (
                <div>
                  {q.options.map((opt) => (
                    <label key={opt} className="block">
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={() => handleAnswerChange(q.id, opt)}
                      />{" "}
                      {opt}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            className="p-2 bg-green-600 text-white rounded"
            onClick={submitQuiz}
          >
            Submit Task
          </button>
        </div>
      )}
    </div>
  );
}

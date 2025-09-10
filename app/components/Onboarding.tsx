// components/Onboarding.tsx
"use client";

import { useState, useEffect, useRef } from "react";

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

export default function Simulator() {
  const [userId] = useState("user123");
  const [task, setTask] = useState<ModuleTask | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize user
  useEffect(() => {
    fetch("/api/simulator", {
      method: "POST",
      body: JSON.stringify({ userId, action: "init" }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Example: add reading links to Module 1
        data.readingLinks = [
          "https://www.sos.state.tx.us/elections/candidates/guide/2024/ind2024.shtml",
          "https://www.bernardjohnson4congress.com/candidate_simulator_homepage_-test_mode",
          "https://www.fec.gov/resources/cms-content/documents/policy-guidance/candgui.pdf",
        ];
        // Example questions
        data.questions = [
          {
            id: "quiz1",
            type: "text",
            question: "Explain the filing requirements in your own words.",
          },
          {
            id: "quiz2",
            type: "multipleChoice",
            question: "What is the minimum voter approval to enter the general election?",
            options: ["1%", "5%", "10%", "15%"],
          },
        ];
        setTask(data);
      });
  }, [userId]);

  // Handle quiz answer change
  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  // Submit quiz
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
  };

  // Start speech recognition for text input
  const startSpeech = () => {
    if (!("webkitSpeechRecognition" in window)) return alert("Speech API not supported");
    const recognition = new webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
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

  if (!task) return <p>Loading simulator...</p>;

  return (
    <div className="p-4">
      <h2>Candidate Simulator</h2>
      <p>### Candidate Coins: {task.cc}</p>
      <p>### Signatures: {task.signatures}</p>

      <pre>{task.message}</pre>

      {task.readingLinks && (
        <div className="mt-2">
          <h4>Reading / References:</h4>
          <ul>
            {task.readingLinks.map((link, i) => (
              <li key={i}>
                <a href={link} target="_blank" className="text-blue-600 underline">
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

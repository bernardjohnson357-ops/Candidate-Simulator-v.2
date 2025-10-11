// ./app/ai/aiLoop.ts
"use client";

import { Task, TaskType, QuizQuestion, CandidateState, Module } from "./types";
import OpenAI from "openai";

// ---------- OPENAI CLIENT ----------
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ your key
});

// ---------- AUDIO ----------
export const speak = (text: string) => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
};

export const queueSpeak = (texts: string[]) => {
  let delay = 0;
  for (const line of texts) {
    setTimeout(() => speak(line), delay);
    const words = line.split(" ").length;
    const isOption = /^[A-D]\)/.test(line.trim());
    delay += isOption ? words * 400 : words * 250;
  }
};

// ---------- AI LOOP ----------
export const processTask = async (
  task: Task,
  candidateState: CandidateState,
  module: Module,
  userInput?: string
): Promise<CandidateState> => {
  switch (task.type) {
    case "read":
    case "speak":
      // Just speak or show the prompt
      speak(task.prompt);
      break;

    case "quiz":
      if (!task.questions?.length) break;

      const quiz: QuizQuestion = task.questions[0];
      console.log("Quiz task:", quiz);

      // If userInput exists, check answer
      if (userInput) {
        const userLetter = userInput.trim()[0].toUpperCase();
        const correctLetter = Array.isArray(quiz.correct)
          ? quiz.correct[0][0].toUpperCase()
          : quiz.correct[0].toUpperCase();

        if (userLetter === correctLetter) {
          console.log("✅ Correct!");
          return {
            ...candidateState,
            cc: candidateState.cc + 5, // example reward
            signatures: candidateState.signatures + 5,
          };
        } else {
          console.log("❌ Incorrect. Correct:", quiz.correct);
        }
      }
      break;

    case "choice":
    case "decision":
      if (!task.options?.length) break;

      if (userInput) {
        const choice = userInput.toLowerCase();
        if (!task.options.map((o) => o.toLowerCase()).includes(choice)) {
          console.warn("Invalid choice:", userInput);
        } else {
          console.log("✅ Chosen option:", choice);
          return { ...candidateState, office: choice };
        }
      }
      break;

    case "write":
      console.log("Write task prompt:", task.prompt);
      break;

    case "upload":
      console.log("Upload task prompt:", task.prompt);
      break;

    default:
      console.warn("Unknown task type:", task.type);
      break;
  }

  return candidateState;
};

// ---------- OPENAI RESPONSE HELPER ----------
export const askOpenAI = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message?.content || "";
};

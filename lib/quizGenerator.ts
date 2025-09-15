// /lib/quizGenerator.ts
import OpenAI from "openai";
import { QuizQuestion } from "@/types";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateQuizFromReference(refText: string, moduleId: string): Promise<QuizQuestion[]> {
  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      {
        role: "system",
        content: "Generate multiple-choice quiz questions from the following text. Return a JSON array of objects with id, prompt, and options (label/text/correct)."
      },
      { role: "user", content: refText }
    ]
  });

  const content = response.choices[0].message?.content ?? "[]";
  try {
    return JSON.parse(content) as QuizQuestion[];
  } catch (e) {
    console.error("Failed to parse AI-generated quiz:", e, content);
    return [];
  }
}

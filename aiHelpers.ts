import OpenAI from "openai";
import { GameState } from "@/context/GameStateContext";

export interface AIResponse {
  narrative: string;
  quiz?: {
    id: string;
    prompt: string;
    options?: string[];
    type: "multiple-choice" | "open-ended";
  };
  ccDelta?: number;
  signaturesDelta?: number;
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getAINarrative(
  moduleText: string,
  state: GameState,
  userInput?: string
): Promise<AIResponse> {
  const prompt = `
You are the Candidate Simulator AI. 
Module text: ${moduleText}
Current state: CC=${state.cc}, Signatures=${state.signatures}, VoterApproval=${state.voterApproval}, Module=${state.currentModule}
User input: ${userInput ?? "none"}
Respond with structured JSON: narrative, optional quiz, CC and signature changes.
`;

  const response = await client.chat.completions.create({
    model: "gpt-5-mini",
    messages: [{ role: "user", content: prompt }],
  });

  try {
    return JSON.parse(response.choices[0].message?.content ?? "{}") as AIResponse;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return { narrative: "Error parsing AI response" };
  }
}

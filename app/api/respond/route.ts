// app/api/respond/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { mode, payload } = await req.json();

    switch (mode) {
      case "quiz":
        return await handleQuiz(payload);
      case "cc":
        return await handleCC(payload);
      case "coaching":
        return await handleCoaching(payload);
      default:
        return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ----- HANDLERS -----

async function handleQuiz(payload: any) {
  // Example: auto-grade a quiz with OpenAI
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a strict quiz grader. Return JSON with {score: number, feedback: string}.",
      },
      { role: "user", content: JSON.stringify(payload) },
    ],
  });

  const result = completion.choices[0].message?.content;
  return NextResponse.json({ result });
}

async function handleCC(payload: any) {
  // Example: update candidate coin balances
  // In reality, you'd use a database. Here is a placeholder:
  const { userId, action, amount } = payload;

  let balance = 100; // TODO: fetch from DB
  if (action === "spend") balance -= amount;
  if (action === "earn") balance += amount;

  return NextResponse.json({ balance });
}

async function handleCoaching(payload: any) {
  // Example: communication feedback
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a communication coach. Give structured feedback on clarity, tone, and organization, without political advice.",
      },
      { role: "user", content: payload.text },
    ],
  });

  const feedback = completion.choices[0].message?.content;
  return NextResponse.json({ feedback });
}

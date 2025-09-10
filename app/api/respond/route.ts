// app/api/respond/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages) return NextResponse.json({ error: "No messages provided" }, { status: 400 });

    // Convert messages to GPT format
    const chatMessages = messages.map((m: any) => ({
      role: m.type === "user" ? "user" : "assistant",
      content: m.content,
    }));

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages as any, // cast to bypass strict typing
      temperature: 0.7,
    });

    const reply = completion.choices?.[0]?.message?.content || "No response from AI.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "OpenAI error" }, { status: 500 });
  }
}

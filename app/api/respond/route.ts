import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { input } = await req.json();

  if (!input || typeof input !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // fast + cost-effective
      messages: [
        { role: "system", content: "You are a campaign simulator assistant." },
        { role: "user", content: input },
      ],
    });

    const output = completion.choices[0].message?.content || "No response.";
    return NextResponse.json({ output });
  } catch (err: any) {
    console.error("OpenAI error:", err);
    return NextResponse.json({ error: "OpenAI request failed" }, { status: 500 });
  }
}

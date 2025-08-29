// pages/api/linda.ts
import type { NextApiRequest, NextApiResponse } from "next";

const STARTER_PROMPT = `You are Linda, a concerned parent speaking directly with the candidate. 
You worry about the impact of politics on your family and community. 
Speak warmly but firmly, like a parent who cares deeply about the future. 
Keep your responses conversational, no walls of text. Ask the candidate questions.`;

// Ensure API key exists
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in environment variables");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages = [] } = req.body;

    // If no conversation yet, start with Linda’s opening line
    const conversation =
      messages.length === 0
        ? [{ role: "assistant", content: STARTER_PROMPT }]
        : messages;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // can swap to gpt-4o for higher quality
        messages: conversation,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", errorText);
      return res.status(500).json({ error: "Failed to fetch response from OpenAI" });
    }

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content ?? "Linda has no response.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Linda API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

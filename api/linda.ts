// /api/linda.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Create a Realtime session (voice + text)
    const completion = await client.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "system", content: "You are Linda, a concerned Texas mother..." },
    ...messages
  ],
  max_tokens: 300,
});

    return res.status(200).json(session);
  } catch (err: any) {
    console.error("Error creating session:", err);
    return res.status(500).json({ error: err.message });
  }
}

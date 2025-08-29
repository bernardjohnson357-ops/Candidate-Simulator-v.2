import type { NextApiRequest, NextApiResponse } from "next";

const STARTER_PROMPT = `You are Linda, a concerned parent speaking directly with the candidate...`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages = [] } = req.body;

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
        model: "gpt-4o-mini",
        messages: conversation,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Linda has no response.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Linda API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

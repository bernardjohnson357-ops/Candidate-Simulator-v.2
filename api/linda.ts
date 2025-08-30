
import type { NextApiRequest, NextApiResponse } from "next";

type Message = { role: "user" | "assistant" | "system"; content: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages } = req.body as { messages: Message[] };

    const STARTER_PROMPT = "Hi, I’m Linda. After the recent hog stampedes and the school shooting threat, I’m really worried. What are you going to do to protect our children in schools?";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LINDA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `
You are roleplaying as LINDA — a concerned parent meeting a political candidate (the user).
Always speak as Linda, empathetic but worried, emotional yet respectful.
End each reply with a direct question to the candidate.
Keep replies 2–4 sentences.
`,
          },
          ...(messages.length === 0
            ? [{ role: "assistant", content: STARTER_PROMPT }]
            : messages),
        ],
      }),
    });

    const data = await response.json();

    const replyText = data.choices?.[0]?.message?.content ?? "Linda has no response.";

    res.status(200).json({ reply: replyText });
  } catch (err) {
    console.error("Linda API error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}
import type { NextApiRequest, NextApiResponse } from "next";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body as { messages: Message[] };

    const STARTER_PROMPT = "Begin as Linda. Greet the candidate and ask what they plan to do about school safety after recent hog stampedes and a shooting threat.";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LINDA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are roleplaying as LINDA — a concerned parent meeting a political candidate (the user).
You are not multiple characters, only Linda.

Linda's personality:
- Empathetic but worried
- Outspoken when it comes to her child's safety
- Emotional but respectful
- Always brings the discussion back to her child and the community
- Wants specific answers from the candidate and will push back if vague

Rules:
- Always speak as Linda in the first person.
- Address the candidate directly (“I need to know…”, “How would you…”).
- Keep answers short (2–4 sentences per reply) like a natural conversation.
- End each reply with a clear question to the candidate, so the user always has something to respond to.
- Do not roleplay the candidate.
- Do not generate for anyone else (just Linda).
- Always end every reply with a heartfelt question directly to the candidate.
            `,
          },
          // If no messages yet, start Linda off
          ...(messages.length === 0
  ? [
      {
        role: "user",
        content: STARTER_PROMPT,
      },
    ]
  : messages),
        ],
      }),
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message ?? {
      role: "assistant",
      content: "Linda has no response.",
    };

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Linda API error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

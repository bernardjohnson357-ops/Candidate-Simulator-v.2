// pages/api/linda.ts
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
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages must be an array" });
    }

    const SYSTEM_PROMPT = `
You are roleplaying as LINDA — a concerned parent meeting a political candidate (the user).
Only speak as Linda. 
Linda's personality:
- Empathetic but worried
- Outspoken on child safety
- Emotional but respectful
- Brings discussion back to her child and the community
- Wants specific answers and pushes back if vague

Rules:
- Always speak in first person
- End each reply with a clear question to the candidate
- Keep responses short (2–4 sentences)
- Do not roleplay anyone else
    `;

    const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LINDA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 250,
      }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("OpenAI API error:", errorText);
      return res.status(500).json({ error: "OpenAI API request failed" });
    }

    const data = await apiResponse.json();

    const assistantMessage = data.choices?.[0]?.message?.content ?? "Linda has no response.";

    res.status(200).json({ reply: assistantMessage });
  } catch (err) {
    console.error("Linda API error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

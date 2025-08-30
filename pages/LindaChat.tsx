import type { NextApiRequest, NextApiResponse } from "next";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages } = req.body as { messages: Message[] };
    if (!Array.isArray(messages)) return res.status(400).json({ error: "Messages must be an array." });

    const STARTER_PROMPT = `
You are Linda, a concerned parent meeting a political candidate (the user). 
You are empathetic but worried, outspoken about child safety, and emotional but respectful. 
Always ask specific questions to the candidate about protecting children and school safety. 
Speak only as Linda. Keep answers short (2-4 sentences) and end with a question to the candidate.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LINDA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: STARTER_PROMPT },
          ...messages,
        ],
      }),
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });

    const reply: Message = data.choices?.[0]?.message ?? {
      role: "assistant",
      content: "Linda has no response.",
    };

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Linda API error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

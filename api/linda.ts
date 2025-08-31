// pages/api/linda.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Types used in this handler
type UIMessage = { role: "user" | "assistant"; content: string };
type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Quick runtime checks
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is missing at runtime");
    return res.status(500).json({ error: "Server misconfiguration: missing OpenAI API key." });
  }

  try {
    // Validate incoming body
    const { messages } = req.body as { messages?: UIMessage[] };
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request: messages must be an array." });
    }

    // Safe system prompt (externalized reasoning, no chain-of-thought)
    const systemMessage: ChatMessage = {
      role: "system",
      content: `You are Linda, a Texas mother who is polite, earnest, and slightly anxious about school safety—especially wild hogs on campus and proposals for school personnel to carry firearms. Stay in character and be persistent but respectful. Do NOT reveal internal chain-of-thought. Instead, provide a concise externalized summary of your reasoning (2–4 short sentences) that covers emotional reaction and primary logical concerns, then give a clear one-sentence conclusion or question. Keep answers as a single coherent paragraph and open the conversation (first turn) with a warm greeting and the question: \"How will you keep children safe in school?\"`,
    };

    // Few-shot examples (helps lock style & structure; safe, non-chain-of-thought)
    const fewShot: ChatMessage[] = [
      {
        role: "user",
        content: "What are you most worried about at your kid's school?",
      },
      {
        role: "assistant",
        content:
          "I feel tight in my chest imagining unpredictable dangers like wild hogs wandering on campus; logically, wild animals and unsecured access create real physical risks and I worry current protections may not be enough; we need both preventative measures and trained responders; overall, my biggest worry is that something unexpected could happen and the kids wouldn't be safe.",
      },
      {
        role: "user",
        content: "Do you think teachers should carry guns?",
      },
      {
        role: "assistant",
        content:
          "Emotionally, the idea of guns near my child makes me anxious; logically, while an armed adult might deter some threats, it also introduces risks of accidents or escalation; weighing those trade-offs, I am not comfortable with teachers carrying guns in schools.",
      },
    ];

    // Build messages to send to the model
    const chatMessages: ChatMessage[] = [
      systemMessage,
      ...fewShot,
      ...messages.map((m) => ({ role: m.role as ChatMessage["role"], content: m.content })),
    ];

    // Debug log incoming payload (will appear in Vercel logs)
    console.debug("API incoming chatMessages length:", chatMessages.length);
    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // swap to the model you tested in Studio if you want exact parity
      messages: chatMessages as any, // cast to any to avoid SDK type mismatch issues
      max_tokens: 400,
      temperature: 0.65,
    });

    // Log raw response for debugging (trim or remove in production if desired)
    console.debug("OpenAI completion:", completion);

    const reply = completion.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      console.error("Empty reply from OpenAI:", completion);
      return res.status(502).json({ error: "Empty reply from model." });
    }

    return res.status(200).json({ reply });
  } catch (err: any) {
    // Deep logging helps troubleshooting on Vercel
    console.error("Linda API error:", err?.response?.data || err);
    const message =
      err?.response?.data?.error?.message ||
      err?.message ||
      "Unknown error when calling OpenAI";
    return res.status(500).json({ error: message });
  }
}

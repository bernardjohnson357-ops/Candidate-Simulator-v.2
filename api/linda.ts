// pages/api/linda.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type UIMessage = { role: "user" | "assistant"; content: string };
type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ===== GET → Realtime ephemeral session (voice) =====
  if (req.method === "GET") {
    try {
      const resp = await fetch("https://api.openai.com/v1/realtime/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview",
          voice: "verse",
        }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        console.error("Error from OpenAI:", data);
        return res.status(resp.status).json({ error: data });
      }

      return res.status(200).json(data);
    } catch (err: any) {
      console.error("Server error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // ===== POST → Linda turn-based text chat =====
  if (req.method === "POST") {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Server misconfiguration: missing OpenAI API key." });
    }

    try {
      const { messages } = req.body as { messages?: UIMessage[] };
      if (!Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request: messages must be an array." });
      }

      const systemMessage: ChatMessage = {
        role: "system",
        content: `You are Linda, a polite but anxious Texas mother focused on school safety, especially wild hogs and proposals for school staff carrying firearms. Always explain your reasoning step-by-step (emotional reaction → logical concerns) before giving a final conclusion. Respond in a single coherent paragraph. Open the conversation (first turn) with: "Hello there! How will you keep children safe in school?"`,
      };

      const fewShot: ChatMessage[] = [
        {
          role: "user",
          content: "What are you most worried about at your kid's school?",
        },
        {
          role: "assistant",
          content:
            "I feel tight in my chest imagining unpredictable dangers like wild hogs on campus; logically, wild animals and unsecured access create real physical risks and I worry current protections may not be enough; we need both preventative measures and trained responders; overall, my biggest worry is that something unexpected could happen and the kids wouldn't be safe.",
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

      const chatMessages: ChatMessage[] = [
        systemMessage,
        ...fewShot,
        ...messages.map((m) => ({ role: m.role as ChatMessage["role"], content: m.content })),
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: chatMessages as any,
        max_tokens: 400,
        temperature: 0.65,
      });

      const reply = completion.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        console.error("Empty reply from OpenAI:", completion);
        return res.status(502).json({ error: "Empty reply from model." });
      }

      return res.status(200).json({ reply });
    } catch (err: any) {
      console.error("Linda API error:", err?.response?.data || err);
      const message =
        err?.response?.data?.error?.message || err?.message || "Unknown error when calling OpenAI";
      return res.status(500).json({ error: message });
    }
  }

  // ===== Unsupported method =====
  return res.status(405).json({ error: "Method not allowed" });
}

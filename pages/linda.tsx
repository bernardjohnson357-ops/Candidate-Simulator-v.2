import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  throw new Error("OPENAI_API_KEY is missing in environment variables.");
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body as { messages: { role: "user" | "assistant"; content: string }[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "No conversation messages provided" });
    }

    const chatMessages: ChatMessage[] = [
      {
        role: "system",
        content:
          "You are Linda, a concerned parent and single mother. Respond empathetically, stay in character, and focus on school safety and community issues. Keep responses concise and natural. Avoid repeating messages.",
      },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    let completion;
    try {
      completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: chatMessages,
        max_tokens: 300,
        temperature: 0.7,
      });
    } catch (openaiError: any) {
      // Log and send OpenAI error for debugging
      console.error("OpenAI error:", openaiError);
      return res.status(500).json({ error: "Failed to call OpenAI API: " + (openaiError?.message || JSON.stringify(openaiError)) });
    }

    const reply = completion.choices?.[0]?.message?.content ?? null;

    if (!reply) {
      return res.status(500).json({ error: "OpenAI did not return a reply." });
    }

    res.status(200).json({ reply });
  } catch (error: any) {
    // General error logging
    console.error("API error:", error);
    res.status(500).json({ error: error?.message || JSON.stringify(error) || "Something went wrong, please try restarting the chat." });
  }
}

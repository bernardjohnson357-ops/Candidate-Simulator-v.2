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


import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function LindaPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/linda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, data.reply]);
      }
    } catch (err) {
      console.error("Error talking to Linda:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-xl font-bold mb-4">Chat with Linda</h1>
        <div className="space-y-2 mb-4 max-h-96 overflow-y-auto border rounded p-2 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-200 text-right"
                  : "bg-green-200 text-left"
              }`}
            >
              <strong>{msg.role === "user" ? "You" : "Linda"}:</strong>{" "}
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="text-gray-500 text-sm italic">Linda is typing...</div>
          )}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your response..."
            className="flex-grow border rounded p-2"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

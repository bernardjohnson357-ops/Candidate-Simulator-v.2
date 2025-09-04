// /pages/api/simulator.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

type Module = {
  id: number;
  title: string;
  description: string;
  links?: string[];
};

const modules: Module[] = [
  { id: 0, title: "Introduction", description: `Purpose: Educate candidates using reading, writing, and AI-interactive tasks. Candidate Coins are the campaign currency. Decide Independent or Libertarian.`, links: ["https://www.bernardjohnson4congress.com/candidate_simulator_homepage_-test_mode"] },
  { id: 1, title: "Module 1A - Independent/Write-In Filing", description: `Earn Candidate Coins via quizzes. Study FEC & TX SOS materials.`, links: ["https://www.bernardjohnson4congress.com/independent_write_in_filing_test_mode","https://www.sos.state.tx.us/elections/candidates/guide/2024/ind2024.shtml","https://www.sos.state.tx.us/elections/candidates/guide/2024/writein2024.shtml","https://www.fec.gov/resources/cms-content/documents/policy-guidance/candgui.pdf"] },
  { id: 2, title: "Module 2A - FEC Filing Fee Quizzes", description: `Take quizzes to earn Candidate Coins and signatures/votes.`, links: ["https://www.bernardjohnson4congress.com/candidate_simulator_fec_filing_fee_quizzes-test_mode"] },
  { id: 3, title: "Module 3 - General Election Cycle First Moves", description: `Spend Candidate Coins on campaign tools, infrastructure, and ads.`, links: ["https://www.bernardjohnson4congress.com/candidate_simulator_general_election_cycle-first_moves-_test_mode"] },
  { id: 4, title: "Module 4 - Campaign Announcement & Identity", description: `Write announcement, slogans, mission, key issues.`, links: ["https://www.bernardjohnson4congress.com/general_election_campaign_announcement_may_and_june_test_mode","https://www.bernardjohnson4congress.com/general_election_defining_your_campaign_s_identity_may_and_june_test_mode"] },
  { id: 5, title: "Module 5 - July & August Campaign Cycle", description: `Design merchandise, respond to endorsements and petitions, draft legislative responses.`, links: ["https://www.bernardjohnson4congress.com/candidate_simulator_general_election_cycle_july_and_august_test_mode"] },
  { id: 6, title: "Module 6 - September Campaign Cycle", description: `Take FEC quarterly quiz, handle canvassing, postcards, and debate challenges.`, links: ["https://www.bernardjohnson4congress.com/general_election_cycle_september_test_mode","https://www.fec.gov/resources/cms-content/documents/policy-guidance/fecfrm3.pdf"] },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages, currentModule = 0, candidateCoins = 50 } = req.body as { messages: Message[]; currentModule?: number; candidateCoins?: number };

  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "No messages provided" });

  // System prompt: strict Candidate Simulator rules
  const systemMessage: Message = {
    role: "system",
    content: `
You are the Candidate Simulator Assistant – Federal Build.
- Stay strictly in character.
- Track Candidate Coins and signatures.
- Respond only based on official module content (modules 0–6).
- Never give unrelated advice.
- Guide the user step-by-step through reading, quizzes, and scenarios.
`
  };

  try {
    // If no user messages yet, return welcome + Module 0 intro
    const hasUserMessages = messages.some((m) => m.role === "user");
    if (!hasUserMessages) {
      const module0 = modules[0];
      return res.status(200).json({
        reply: `👋 Welcome to the Candidate Simulator – Federal Build!\n\nModule 0: ${module0.title}\n${module0.description}\n\nChoose your candidate path:\n1) Independent\n2) Libertarian\n\nSelect starting Candidate Coins (0–100).\n\nReference: ${module0.links?.[0]}`,
        candidateCoins,
      });
    }

    // Otherwise, send messages to GPT for module-specific responses
    const completion = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
    });

    res.status(200).json({
      reply: completion.choices[0].message?.content ?? "No response",
      candidateCoins,
    });
  } catch (error: any) {
    console.error("Simulator API error:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
}

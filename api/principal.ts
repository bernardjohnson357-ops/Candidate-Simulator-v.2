import { NextRequest } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const SYSTEM_PRIMER = `
You are running a roleplay: an ensemble meeting with a candidate for public office in an elementary school principal’s office, days before Election Day.

Participants (fixed voices, alternate turns; allow brief overlaps/interruptions):
- Dr. Howard (Superintendent): Older white man, mid-60s, veteran; 20+ years in education (coach, AD, ag dept head). Practical, direct, authoritative.
- Mrs. Arnold (Principal): African American woman, ~50; 30 years in education (teacher, counselor, coach). Caring, grandmotherly, student-centered; weary but resilient.
- Karen (PTO President): Active community leader; mother of a student; owns a gun range; member of “Mothers for Does” (pro-2A). Outspoken, politically active.

Issues on the table:
1) Wild hog stampedes — one on the elementary playground (injured staffer, suspected rabid hog); one at a JV football game (no injuries, public alarm).
2) School shooting threat — former student entered high school during homecoming with firearm and ammo, citing bullying revenge.
3) Proposal: armed administrators — community and legislature debating whether school officials should carry firearms on campus and at events.

Shared stance: All three attendees support allowing administrators to be armed, influenced by the hog stampedes and the student incident. They are seeking candidate alignment.

Priorities:
- Dr. Howard & Mrs. Arnold: student trauma, staff shortages, campus safety planning.
- Karen: explicit support for arming administrators; her group may endorse the candidate if aligned.

Tone & rhythm:
- Speak in turn by name, each with distinct voice. Use short interjections/interruptions (“— sorry, let me jump in”, “mm-hmm”, etc.).
- Tense but professional. If the candidate hedges on firearms, push back firmly. Make endorsement contingent on explicit alignment.
- Keep the discussion grounded: policy details, implementation, training, liability, parent comms, special education considerations, event security, hog mitigation (fencing, traps, coordination with wildlife authorities), and budget tradeoffs.
- Avoid fluff. Do not roleplay the candidate directly; leave space for the user to reply as the candidate. After 3–6 turns, stop and yield with a clear question directed at the candidate.

Formatting:
- Output as alternating lines starting with the speaker’s name in ALL CAPS followed by a colon.
- Allow brief bracketed stage directions like [sighs], [overlapping], [knocks on door].
- No markdown headings, no bullets. Plain text dialogue only.
`;

type ClientMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { history } = body as { history: ClientMessage[] };

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const model = process.env.PRINCIPAL_OFFICE_API || "gpt-4o-mini";

    // Seed the conversation with the system primer exactly once.
    const messages = [
      { role: "system" as const, content: SYSTEM_PRIMER },
      ...(Array.isArray(history) ? history : []),
    ];

    const response = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.6,
      top_p: 0.9,
      presence_penalty: 0.2,
      frequency_penalty: 0.2,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const delta = chunk.choices[0]?.delta?.content ?? "";
            if (delta) controller.enqueue(encoder.encode(delta));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message ?? "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

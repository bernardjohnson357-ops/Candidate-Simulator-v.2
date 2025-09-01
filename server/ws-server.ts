const { WebSocketServer } = require("ws");
const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const { tmpdir } = require("os");

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Your system primer
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

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  let chatHistory: { role: string; content: string }[] = [];

  ws.on("message", async (msg) => {
    try {
      // Convert incoming message to Buffer (expecting audio chunk)
      const buffer = Buffer.isBuffer(msg) ? msg : Buffer.from(msg as ArrayBuffer);
      const tempFile = path.join(tmpdir(), `chunk-${Date.now()}.webm`);
      fs.writeFileSync(tempFile, buffer);

      // Whisper transcription
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(tempFile),
        model: "whisper-1",
        response_format: "text",
      });

      fs.unlinkSync(tempFile);

      const userText = transcription;
      chatHistory.push({ role: "user", content: userText });

      // Chat streaming response
      const stream = await openai.chat.completions.stream({
        model: process.env.PRINCIPAL_OFFICE_API || "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PRIMER.trim() },
          ...chatHistory,
        ],
        temperature: 0.6,
      });

      let assistantText = "";
      for await (const event of stream) {
        if (event.type === "response.output_text.delta") {
          const delta = event.delta;
          if (delta) {
            assistantText += delta;
            ws.send(delta); // stream to client
          }
        }
      }

      chatHistory.push({ role: "assistant", content: assistantText });
    } catch (err: any) {
      console.error(err);
      ws.send(JSON.stringify({ error: err.message }));
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log("WebSocket server running on ws://localhost:8080");

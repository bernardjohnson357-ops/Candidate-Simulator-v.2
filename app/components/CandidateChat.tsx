// app/components/CandidateChat.tsx
"use client";

import { useState } from "react";

// Reference Roadmaps
const realWorldReferences: Record<number, string[]> = {
  1: [
    "[TX SOS – Independent Candidate Guide 2024](https://www.sos.state.tx.us/elections/candidates/guide/2024/ind2024.shtml)",
    "[TX SOS – Write-In Candidate Guide 2024](https://www.sos.state.tx.us/elections/candidates/guide/2024/writein2024.shtml)",
    "[FEC Party Guide PDF](https://www.fec.gov/resources/cms-content/documents/policy-guidance/partygui.pdf)",
  ],
  2: [
    "[TX SOS – Independent Candidate Guide 2024](https://www.sos.state.tx.us/elections/candidates/guide/2024/ind2024.shtml)",
    "[TX SOS – Write-In Candidate Guide 2024](https://www.sos.state.tx.us/elections/candidates/guide/2024/writein2024.shtml)",
    "[FEC Party Guide PDF](https://www.fec.gov/resources/cms-content/documents/policy-guidance/partygui.pdf)",
  ],
  4: [
    "[FEC Committee Data Example](https://www.fec.gov/data/committee/C00588657/?cycle=2026)",
    "[FEC File Getting Started Manual (PDF)](https://www.fec.gov/resources/cms-content/documents/FECFile_GettingStartedManual_Candidates.pdf)",
  ],
  6: [
    "[FEC Form 3 PDF](https://www.fec.gov/resources/cms-content/documents/policy-guidance/fecfrm3.pdf)",
  ],
};

const simulatorReferences: Record<number, string[]> = {
  1: [
    "[Independent/Write-In Filing – Test Mode](https://www.bernardjohnson4congress.com/independent_write_in_filing_test_mode)",
  ],
  2: [
    "[Independent FEC Quiz – Test Mode](https://www.bernardjohnson4congress.com/candidate_simulator_fec_filing_fee_quizzes_-_test_mode)",
    "[Party FEC Quiz – Test Mode](https://www.bernardjohnson4congress.com/candidate_simulator_fec_filing_fee_quizzes_-_test_mode)",
  ],
  3: [
    "[First Moves – Test Mode](https://www.bernardjohnson4congress.com/candidate_simulator_general_election_cycle_-_first_moves_-_test_mode)",
  ],
  4: [
    "[Campaign Identity Overview](https://www.bernardjohnson4congress.com/candidate_simulator_general_election_cycle_may_and_june_test_mode)",
    "[Campaign Announcement](https://www.bernardjohnson4congress.com/general_election_campaign_announcement_may_and_june_test_mode)",
    "[Defining Campaign Identity](https://www.bernardjohnson4congress.com/general_election_defining_your_campaign_s_identity_may_and_june_test_mode)",
    "[FEC Getting Started Quiz](https://www.bernardjohnson4congress.com/general_election_fec_getting_started_quiz_may_and_june_test_mode)",
  ],
  5: [
    "[July & August Expansion – Test Mode](https://www.bernardjohnson4congress.com/general_election_cycle_july_and_august_test_mode)",
  ],
  6: [
    "[September Overview](https://www.bernardjohnson4congress.com/general_election_cycle_september_test_mode)",
    "[Constitution Day](https://www.bernardjohnson4congress.com/general_election_cycle_september_constitution_day_test_mode)",
    "[Scenario](https://www.bernardjohnson4congress.com/general_election_cycle_september_scenario_test_mode)",
    "[Postcard Offer](https://www.bernardjohnson4congress.com/general_election_cycle_september_postcard_offer_test_mode)",
    "[Debate Challenge](https://www.bernardjohnson4congress.com/general_election_cycle_september_debate_challenge_test_mode)",
  ],
  7: [
    "[October 1–7 – Test Mode](https://www.bernardjohnson4congress.com/general_election_cycle_october_1_7_test_mode)",
  ],
  8: [
    "[October 8–14 – Test Mode](https://www.bernardjohnson4congress.com/general_election_october_8_14_test_mode)",
  ],
  9: [
    "[October 15–22 A](https://www.bernardjohnson4congress.com/general_election_october_15-22_a_test_mode)",
    "[October 15–22 B](https://www.bernardjohnson4congress.com/general_election_october_15-22_b_test_mode)",
  ],
  10: [
    "[October 23–29 A](https://www.bernardjohnson4congress.com/general_election_cycle_october_23_29_test_mode)",
    "[October 23–29 B](https://www.bernardjohnson4congress.com/general_election_cycle_october_23_29_b_test_mode)",
  ],
};

// Chat Component
export default function CandidateChat({ path }: { path: string }) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    {
      sender: "ai",
      text: `Welcome to the Candidate Simulator. You’ve chosen the **${path} path**. 
Candidate Coins (CC) are used to represent simulated campaign resources. 
**1 CC = $100 (simulated)**. These will be referenced whenever financial obligations arise.`,
    },
  ]);
  const [step, setStep] = useState(1);
  const [cc, setCc] = useState(50);
  const [signatures, setSignatures] = useState(0);
  const [input, setInput] = useState("");

  const addMessage = (msg: { sender: string; text: string }) =>
    setMessages((prev) => [...prev, msg]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    addMessage({ sender: "user", text: userText });

    const lowerText = userText.toLowerCase();

    // Summaries with references
    if (lowerText.includes("summary brief")) {
      const refs = [
        ...(realWorldReferences[step] || []),
        ...(simulatorReferences[step] || []),
      ].join("\n");

      addMessage({
        sender: "ai",
        text: `📘 **Brief Summary – Module ${step}**\nThis module introduces key compliance and campaign concepts.\n\n**References:**\n${refs}`,
      });
      setInput("");
      return;
    }

    if (lowerText.includes("summary detailed")) {
      const refs = [
        ...(realWorldReferences[step] || []),
        ...(simulatorReferences[step] || []),
      ].join("\n");

      addMessage({
        sender: "ai",
        text: `📘 **Detailed Summary – Module ${step}**\nThis module explains filing requirements and simulation mechanics step-by-step.\n\n**References:**\n${refs}`,
      });
      setInput("");
      return;
    }

    // Step advancement
    if (lowerText.includes("complete") || lowerText.includes("done")) {
      setStep(step + 1);
      setCc(cc + 10);
      setSignatures(signatures + 100);

      addMessage({
        sender: "ai",
        text: `✅ Module ${step} complete. Resources updated.\nCC: ${cc + 10} | Voter Support: ${
          signatures + 100
        } signatures`,
      });
      setInput("");
      return;
    }

    // Default assistant guidance
    addMessage({
      sender: "ai",
      text: `I’ll guide you through Module ${step}. You can request a "summary brief" or "summary detailed", or confirm completion by typing "done".`,
    });

    setInput("");
  };

  return (
    <div className="p-4 border rounded shadow-md w-full max-w-2xl">
      <div className="h-96 overflow-y-auto border p-2 mb-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.sender === "ai" ? "text-blue-700" : "text-gray-800"
            }`}
          >
            <strong>{msg.sender === "ai" ? "AI" : "You"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border px-2 py-1 rounded-l"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}

      <div className="mt-2 text-sm text-gray-600">
        CC: {cc} | Voter Support: {signatures} signatures
      </div>
    </div>
  );
}

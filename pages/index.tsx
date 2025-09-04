import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Module = {
  id: number;
  title: string;
  description: string;
  links?: string[];
};

const modules: Module[] = [
  {
    id: 0,
    title: "Introduction",
    description: `Purpose: Educate prospective candidates using reading, writing, and AI-interactive tasks. All currency references use Candidate Coins. Decide whether to run as Independent or Libertarian.`,
    links: ["https://www.bernardjohnson4congress.com/candidate_simulator_homepage_-test_mode"],
  },
  {
    id: 1,
    title: "Module 1A - Independent/Write-In Filing",
    description: `Earn Candidate Coins by scoring 80+ on quizzes. Study FEC and Texas SOS materials.`,
    links: [
      "https://www.bernardjohnson4congress.com/independent_write_in_filing_test_mode",
      "https://www.sos.state.tx.us/elections/candidates/guide/2024/ind2024.shtml",
      "https://www.sos.state.tx.us/elections/candidates/guide/2024/writein2024.shtml",
      "https://www.fec.gov/resources/cms-content/documents/policy-guidance/candgui.pdf",
    ],
  },
  {
    id: 2,
    title: "Module 2A - FEC Filing Fee Quizzes",
    description: `Take federal campaign quizzes to earn Candidate Coins and signatures/votes.`,
    links: [
      "https://www.bernardjohnson4congress.com/candidate_simulator_fec_filing_fee_quizzes-test_mode",
    ],
  },
  {
    id: 3,
    title: "Module 3 - General Election Cycle First Moves",
    description: `Spend Candidate Coins on websites, packs, and ads. Build campaign infrastructure.`,
    links: [
      "https://www.bernardjohnson4congress.com/candidate_simulator_general_election_cycle-first_moves-_test_mode",
    ],
  },
  {
    id: 4,
    title: "Module 4 - Campaign Announcement & Identity",
    description: `Write a campaign announcement, develop slogans, mission statement, and key issues.`,
    links: [
      "https://www.bernardjohnson4congress.com/general_election_campaign_announcement_may_and_june_test_mode",
      "https://www.bernardjohnson4congress.com/general_election_defining_your_campaign_s_identity_may_and_june_test_mode",
    ],
  },
  {
    id: 5,
    title: "Module 5 - July & August Campaign Cycle",
    description: `Design campaign merchandise, respond to endorsements and petitions, and draft legislative responses.`,
    links: [
      "https://www.bernardjohnson4congress.com/candidate_simulator_general_election_cycle_july_and_august_test_mode",
    ],
  },
  {
    id: 6,
    title: "Module 6 - September Campaign Cycle",
    description: `Take FEC quarterly filing quiz, handle canvassing scenarios, postcards, and debate challenges.`,
    links: [
      "https://www.bernardjohnson4congress.com/general_election_cycle_september_test_mode",
      "https://www.fec.gov/resources/cms-content/documents/policy-guidance/fecfrm3.pdf",
    ],
  },
];

export default function CandidateSimulator() {
  const [currentModule, setCurrentModule] = useState<number>(0);
  const [candidateCoins, setCandidateCoins] = useState<number>(50);
  const [messages, setMessages] = useState<Message[]>([]);

  const module = modules.find((m) => m.id === currentModule)!;

  const nextModule = () => {
    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  };

  const sendMessage = (input: string) => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    // For now, AI responses can be placeholders or fetched from your API
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Received your response for ${module.title}. Proceed to next step.`,
      },
    ]);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Candidate Simulator – Federal Build</h1>
      <p>
        Current Module: <strong>{module.title}</strong>
      </p>
      <p>
        Candidate Coins: <strong>{candidateCoins}</strong>
      </p>
      <div style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
        <p>{module.description}</p>
        {module.links?.map((link) => (
          <p key={link}>
            🔗 <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
          </p>
        ))}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Type your response..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage((e.target as HTMLInputElement).value);
          }}
        />
        <button onClick={nextModule} style={{ marginLeft: "1rem" }}>Next Module</button>
      </div>

      <div style={{ borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: "0.5rem" }}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>
    </main>
  );
}

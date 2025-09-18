// modules.ts
export interface Task {
  type: "read" | "write" | "quiz" | "scenario";
  prompt: string;
  options?: string[];
  correctAnswer?: string;
}

export interface Module {
  id: string;
  title: string;
  brief: string;
  detailed: string;
  tasks: Task[];
  referenceLinks?: string[];
}

export const modules: Module[] = [
  {
    id: "0",
    title: "Orientation & Introduction",
    brief: "Candidates learn about Candidate Coins (CC), signatures, voter approval, and ballot eligibility. They choose whether to run for President, Senate, or House.",
    detailed: "This module serves as the campaign boot camp. Players are introduced to the simulator's scoring system (CC = campaign funds, signatures = grassroots support, voter approval = polling). The AI explains task types (read, write, upload, speak, or button-choice) and how each affects campaign performance. Candidates declare for President, Senate, or House — each with different thresholds for CC and signatures. This decision determines the difficulty of the road ahead.",
    tasks: [
      { type: "read", prompt: "Please read the following summary:\n\nCandidates learn about Candidate Coins (CC), signatures, voter approval, and ballot eligibility. They choose whether to run for President, Senate, or House." },
      { type: "write", prompt: "Reflect on the simulator rules, scoring, and campaign structure. How will you plan your campaign?" }
    ],
    referenceLinks: []
  },
  {
    id: "1A",
    title: "Independent / Write-In Filing",
    brief: "Candidates must file with the Texas Secretary of State, choosing between paying a filing fee or collecting petition signatures. Quiz scores convert into signatures and CC bonuses.",
    detailed: "Independents and write-ins must submit an Application of Candidacy with the Secretary of State. They can either pay the filing fee or collect valid signatures (from voters who didn’t vote in another party’s primary). Deadlines differ: independents must file by May, write-ins by August. Candidates learn about disqualification risks, such as missing deadlines or submitting invalid petitions. In the simulator, filing mistakes cost CC, while high quiz performance earns signatures and voter approval. This establishes the first real 'make or break' decision for their campaign.",
    tasks: [
      { type: "read", prompt: "Please read the following summary:\n\nCandidates must file with the Texas Secretary of State, choosing between paying a filing fee or collecting petition signatures. Quiz scores convert into signatures and CC bonuses." },
      { type: "quiz", prompt: "What is the filing deadline for an independent candidate in Texas?", options: ["March", "May", "August", "October"], correctAnswer: "May" },
      { type: "quiz", prompt: "Which of the following can disqualify an independent candidate?", options: ["Submitting invalid petitions", "Paying the filing fee on time", "Choosing a political party", "Submitting signatures from eligible voters"], correctAnswer: "Submitting invalid petitions" },
      { type: "quiz", prompt: "What is one way an independent candidate can qualify for the ballot?", options: ["Collect signatures", "Win a party primary", "Pay CC only", "Get endorsed by a political party"], correctAnswer: "Collect signatures" }
    ],
    referenceLinks: [
      "https://www.sos.state.tx.us/elections/candidates/guide/2024/ind2024.shtml",
      "https://www.sos.state.tx.us/elections/candidates/guide/2024/writein2024.shtml",
      "https://www.fec.gov/resources/cms-content/documents/policy-guidance/partygui.pdf"
    ]
  },
  {
    id: "1B",
    title: "Party Filing",
    brief: "Party candidates must be nominated through conventions or primaries, then file with the Secretary of State. Quiz performance converts into signatures and CC bonuses.",
    detailed: "Party candidates must secure nomination through their party (e.g., convention for Libertarians, primaries for Democrats/Republicans). After nomination, they must still file with the SOS, choosing between a filing fee or signature path. Deadlines usually occur in December before the election year. Signature rules mirror independents (voters cannot have voted in another primary). The simulator emphasizes that nomination is not the finish line — compliance with both party rules and state filing laws is mandatory. Mistakes here reduce CC, while mastery boosts credibility, signatures, and approval.",
    tasks: [
      { type: "read", prompt: "Please read the following summary:\n\nParty candidates must be nominated through conventions or primaries, then file with the Secretary of State. Quiz performance converts into signatures and CC bonuses." },
      { type: "quiz", prompt: "How does a party candidate typically secure a nomination?", options: ["Through a convention or primary", "By collecting signatures only", "By submitting an independent application", "By paying a fee to the state"], correctAnswer: "Through a convention or primary" },
      { type: "quiz", prompt: "After nomination, what must party candidates still do to qualify for the ballot?", options: ["File with the Secretary of State", "Run as an independent", "Skip filing if endorsed", "Only raise funds"], correctAnswer: "File with the Secretary of State" },
      { type: "quiz", prompt: "Who can vote for party candidate signatures?", options: ["Anyone", "Voters who did not vote in another party primary", "Only registered independents", "Only members of other parties"], correctAnswer: "Voters who did not vote in another party primary" }
    ],
    referenceLinks: [
      "https://www.sos.state.tx.us/elections/candidates/guide/2024/lib-green-nom2024.shtml",
      "https://www.fec.gov/resources/cms-content/documents/policy-guidance/partygui.pdf"
    ]
  }
];

// ./app/utils/libertarianSimulator.ts
import { Module, TaskType } from "../ai/types";

export const libertarianSimulator: Module[] = [
  {
    id: "0",
    title: "Orientation & Introduction",
    description:
      "Candidates learn about Candidate Coins (CC), signatures, voter approval, and ballot eligibility. They choose whether to run for President, Senate, or House.",
    tasks: [
      { type: "read", prompt: "Read the campaign manual and scoring system." },
      { type: "write", prompt: "Declare which office you are running for." },
    ],
  },
  {
    id: "1A",
    title: "Independent / Write-In Filing",
    description:
      "Candidates file as independents or write-ins, earning signatures and CC from quizzes.",
    tasks: [
      { type: "read", prompt: "Review independent/write-in filing rules and deadlines." },
      { type: "write", prompt: "Complete the quiz on filing fees and petitions." },
    ],
  },
  {
    id: "1B",
    title: "Party Filing",
    description:
      "Party candidates secure nomination and file with the SOS. Quiz performance converts into signatures and CC bonuses.",
    tasks: [
      { type: "read", prompt: "Review party nomination and filing rules." },
      { type: "write", prompt: "Complete the quiz on party filing compliance." },
    ],
  },
  {
    id: "2A",
    title: "Independent FEC Filing Quizzes",
    description:
      "Candidates complete quizzes on FEC Forms 1 and 2. Correct answers earn signatures and CC; errors cost them.",
    tasks: [
      { type: "read", prompt: "Review federal filing rules for independent candidates." },
      { type: "write", prompt: "Answer the FEC Form 1 & 2 quiz." },
    ],
  },
  {
    id: "2B",
    title: "Party FEC Filing Quizzes",
    description:
      "Similar to 2A but for party candidates. Quizzes cover FEC Forms 1–3 and reporting deadlines.",
    tasks: [
      { type: "read", prompt: "Review federal filing rules for party candidates." },
      { type: "write", prompt: "Answer the FEC Forms 1–3 quiz." },
    ],
  },
  {
    id: "3",
    title: "First Moves (Strategy & Spending)",
    description:
      "Candidates make early campaign decisions: advertising, travel, and press outreach. Each choice impacts CC, signatures, and voter approval.",
    tasks: [
      { type: "write", prompt: "Choose how to allocate your early campaign funds." },
      { type: "read", prompt: "See potential outcomes of early campaign choices." },
    ],
  },
  {
    id: "4",
    title: "Campaign Identity",
    description:
      "Candidates draft slogans, mission statements, and announcement speeches. Strong messaging increases signatures and CC; poor messaging lowers approval.",
    tasks: [
      { type: "write", prompt: "Draft your slogan and mission statement." },
      { type: "write", prompt: "Prepare your announcement speech." },
    ],
  },
  {
    id: "5",
    title: "Campaign Expansion (Visuals & Community)",
    description:
      "Candidates design logos, yard signs, and T-shirts, collect petitions, respond to constituent concerns, and handle endorsements.",
    tasks: [
      { type: "write", prompt: "Respond to constituent Q&A scenarios." },
      { type: "upload", prompt: "Upload your mock campaign visuals (logos, signs, T-shirts)." },
    ],
  },
  {
    id: "6",
    title: "September Compliance & Scenarios",
    description:
      "Candidates file FEC Form 3, complete a compliance quiz, and respond to September campaign scenarios.",
    tasks: [
      { type: "read", prompt: "Review FEC Form 3 reporting requirements." },
      { type: "write", prompt: "Complete the September compliance quiz." },
      { type: "write", prompt: "Handle Constitution Day outreach and postcards." },
    ],
  },
  {
    id: "7",
    title: "Early October Ops (Safe)",
    description:
      "Candidates manage their team, deliver a community safety speech, and respond to weekly news.",
    tasks: [
      { type: "write", prompt: "Assign tasks to your campaign team." },
      { type: "speak", prompt: "Deliver your community safety speech." },
      { type: "write", prompt: "Respond to weekly news scenario." },
    ],
  },
  {
    id: "8",
    title: "Mid-October Ops (Safe)",
    description:
      "Candidates practice press conferences and constituent engagement on healthcare, Second Amendment, and fiscal ethics.",
    tasks: [
      { type: "speak", prompt: "Answer press conference questions." },
      { type: "write", prompt: "Respond to constituent concerns." },
    ],
  },
  {
    id: "9",
    title: "Final Push (Safe)",
    description:
      "Candidates appear on a podcast, manage campaign media, and draft a final narrative.",
    tasks: [
      { type: "speak", prompt: "Participate in the campaign podcast." },
      { type: "write", prompt: "Draft your final campaign narrative." },
    ],
  },
  {
    id: "10",
    title: "Election Countdown (Safe)",
    description:
      "Candidates conduct town halls, engage in rapid Q&A, and finalize their endgame strategy.",
    tasks: [
      { type: "speak", prompt: "Lead a town hall with live constituent questions." },
      { type: "write", prompt: "Finalize your endgame strategy." },
    ],
  },
  {
    id: "11",
    title: "School Visit",
    description:
      "Candidates visit a local school, delivering a short speech focused on education and community engagement.",
    tasks: [
      { type: "speak", prompt: "Deliver a speech to students and teachers." },
    ],
  },
  {
    id: "12",
    title: "TV Interview",
    description:
      "Candidates answer live questions from media on platform and past decisions.",
    tasks: [
      { type: "speak", prompt: "Respond to televised interview questions." },
    ],
  },
  {
    id: "13",
    title: "Endorsements",
    description:
      "Candidates weigh public endorsements from organizations or figures.",
    tasks: [
      { type: "write", prompt: "Decide whether to accept or decline endorsements." },
    ],
  },
  {
    id: "14",
    title: "Debate",
    description:
      "Candidates participate in a final public debate, giving an opening statement and answering questions.",
    tasks: [
      { type: "speak", prompt: "Give your opening debate statement." },
      { type: "speak", prompt: "Answer debate questions." },
    ],
  },
  {
    id: "15",
    title: "Final Summary",
    description:
      "AI generates a narrative summarizing the candidate’s performance, key decisions, and outcome.",
    tasks: [
      { type: "read", prompt: "Review your campaign summary and results." },
    ],
  },
];

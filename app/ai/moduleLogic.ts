// app/ai/moduleLogic.ts

import modulesData from "../../config/modules.json";

export const modules = modulesData as Module[];
  {
    id: "0",
    title: "Orientation & Introduction",
    description: "Learn about Candidate Coins (CC), signatures, voter approval, and office eligibility.",
    tasks: [
      { type: "read", prompt: "Welcome to the Federal Candidate Simulator! You'll manage CC, signatures, and voter approval." },
      { type: "write", prompt: "Type your name and the office you plan to run for (President, Senate, House)." },
    ],
  },
  {
    id: "1A",
    title: "Independent / Write-In Filing",
    description: "File as an independent or write-in candidate and learn filing requirements.",
    tasks: [
      { type: "quiz", prompt: "What is required to file as an independent candidate?", options: ["Pay fee", "Collect signatures", "Both", "None"], correctAnswer: "Both" },
    ],
  },
  {
    id: "1B",
    title: "Party Filing",
    description: "File as a party candidate and learn nomination rules.",
    tasks: [
      { type: "quiz", prompt: "How do party candidates usually secure nomination?", options: ["Primary", "Convention", "Both", "None"], correctAnswer: "Both" },
    ],
  },
  {
    id: "2A",
    title: "Independent FEC Filing Quiz",
    description: "Quiz on federal filing rules for independent candidates.",
    tasks: [
      { type: "quiz", prompt: "Which form names your treasurer for federal filings?", options: ["Form 1", "Form 2", "Form 3", "Form 4"], correctAnswer: "Form 2" },
    ],
  },
  {
    id: "2B",
    title: "Party FEC Filing Quiz",
    description: "Quiz on federal filing rules for party candidates.",
    tasks: [
      { type: "quiz", prompt: "Which FEC form starts quarterly reporting?", options: ["Form 1", "Form 2", "Form 3", "Form 4"], correctAnswer: "Form 3" },
    ],
  },
  {
    id: "3",
    title: "First Moves (Strategy & Spending)",
    description: "Practice early campaign decisions and budgeting.",
    tasks: [
      { type: "write", prompt: "Plan your first campaign moves: advertising, travel, press outreach." },
      { type: "scenario", prompt: "AI evaluates your early strategy and updates CC, signatures, and approval." },
    ],
  },
  {
    id: "4",
    title: "Campaign Identity",
    description: "Define slogans, mission, and public messaging.",
    tasks: [
      { type: "write", prompt: "Draft your campaign slogan." },
      { type: "write", prompt: "Write your mission statement." },
      { type: "write", prompt: "Prepare your campaign announcement speech." },
    ],
  },
  {
    id: "5",
    title: "Campaign Expansion",
    description: "Design visuals and expand community outreach.",
    tasks: [
      { type: "write", prompt: "Describe your campaign logo, yard signs, or T-shirt design." },
      { type: "scenario", prompt: "Decide how to spend CC on design, volunteers, and endorsements." },
    ],
  },
  {
    id: "6",
    title: "September Compliance & Scenarios",
    description: "Review FEC Form 3, complete compliance quiz, handle scenarios.",
    tasks: [
      { type: "quiz", prompt: "When must FEC Form 3 be filed?", options: ["Monthly", "Quarterly", "Yearly", "Never"], correctAnswer: "Quarterly" },
      { type: "scenario", prompt: "Decide on debate invitation, postcards, and Constitution Day outreach." },
    ],
  },
  {
    id: "7",
    title: "Early October Ops",
    description: "Team management, community safety speech, weekly news response.",
    tasks: [
      { type: "write", prompt: "Assign staff to outreach, fundraising, or media prep." },
      { type: "write", prompt: "Deliver a community safety speech." },
    ],
  },
  {
    id: "8",
    title: "Mid-October Ops",
    description: "Press conferences and constituent engagement.",
    tasks: [
      { type: "scenario", prompt: "Answer questions from reporters and constituents." },
    ],
  },
  {
    id: "9",
    title: "Final Push",
    description: "Manage podcast appearance, media engagement, final narrative.",
    tasks: [
      { type: "write", prompt: "Draft your final campaign message for undecided voters." },
    ],
  },
  {
    id: "10",
    title: "Election Countdown",
    description: "Rapid response, town halls, and endgame strategy.",
    tasks: [
      { type: "scenario", prompt: "Answer lightning round questions from voters." },
      { type: "write", prompt: "Decide endgame strategy: ads, ground game, debate prep." },
    ],
  },
  {
    id: "11",
    title: "School Visit",
    description: "Engage with students, teachers, and parents safely.",
    tasks: [
      { type: "write", prompt: "Deliver a short speech highlighting education and community engagement." },
    ],
  },
  {
    id: "12",
    title: "TV Interview",
    description: "Prepare for live, high-pressure media questioning.",
    tasks: [
      { type: "write", prompt: "Answer journalist questions clearly and persuasively." },
    ],
  },
  {
    id: "13",
    title: "Endorsements",
    description: "Weigh benefits and risks of public endorsements.",
    tasks: [
      { type: "scenario", prompt: "Accept or decline endorsements and see impact on CC and approval." },
    ],
  },
  {
    id: "14",
    title: "Debate",
    description: "Demonstrate debate readiness.",
    tasks: [
      { type: "write", prompt: "Deliver opening statement and answer 2 debate-style questions." },
    ],
  },
  {
    id: "15",
    title: "Final Summary",
    description: "AI generates a narrative summary of the campaign.",
    tasks: [
      { type: "scenario", prompt: "Review your final campaign stats and narrative outcome." },
    ],
  },
];

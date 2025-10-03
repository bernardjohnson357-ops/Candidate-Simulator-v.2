// ./config/modules.ts
import { Module, Task } from "../app/ai/types";

export const modules: Module[] = [
  {
    id: "0",
    title: "Orientation & Introduction",
    content: `Welcome to the Federal Candidate Simulator — AI Edition. 
This simulator will take you through filing, fundraising, compliance, and campaigning. 
You start with 50 Candidate Coins (CC), 0 signatures, and 0% voter approval.`,
    tasks: [
      {
        id: "0-1",
        type: "read",
        prompt: "Read the campaign manual and scoring system.",
      },
      {
        id: "0-2",
        type: "choice",
        prompt: "Which office will you run for?",
        options: ["🏛 President", "🏛 U.S. Senate", "🏛 U.S. House"],
      },
      {
        id: "0-3",
        type: "write",
        prompt: "Optionally explain why you chose this office.",
      },
    ],
  },
  {
    id: "1",
    title: "Filing Phase – Party Candidate",
    content: `As a party candidate, you must file with your party and the Texas Secretary of State (SOS). 
Pay the filing fee OR submit petition signatures. Deadlines must be met to proceed.`,
    tasks: [
      {
        id: "1-1",
        type: "read",
        prompt: "Review the Texas SOS Party Candidate Guide.",
      },
      {
        id: "1-2",
        type: "quiz",
        prompt: "When must Party Candidates file their application with the Texas SOS?",
        options: [
          "A) December of the year before the election ✅",
          "B) January of election year",
          "C) May of election year",
          "D) August of election year",
        ],
        correctAnswer: "A) December of the year before the election ✅",
      },
      {
        id: "1-3",
        type: "quiz",
        prompt: "Who nominates Party Candidates in Texas?",
        options: [
          "A) Secretary of State",
          "B) FEC",
          "C) Their political party ✅",
          "D) Any registered voter",
        ],
        correctAnswer: "C) Their political party ✅",
      },
    ],
  },
  {
    id: "2",
    title: "Federal Compliance – FEC Forms",
    content: `Once you exceed $5,000 in contributions or spending, federal compliance begins. 
File FEC Forms 1 and 2 to register your candidacy and campaign committee.`,
    tasks: [
      {
        id: "2-1",
        type: "read",
        prompt: "Study FEC Candidate Guide for Forms 1 & 2.",
      },
      {
        id: "2-2",
        type: "quiz",
        prompt: "Which form registers your principal campaign committee?",
        options: ["Form 1", "Form 2 ✅", "Form 3"],
        correctAnswer: "Form 2 ✅",
      },
      {
        id: "2-3",
        type: "quiz",
        prompt: "When must Forms 1 and 2 be filed?",
        options: [
          "Before raising any funds",
          "Within 15 days after raising/spending $5,000 ✅",
          "After Election Day",
        ],
        correctAnswer: "Within 15 days after raising/spending $5,000 ✅",
      },
    ],
  },
  {
    id: "3",
    title: "First Campaign Moves",
    content: `Now that filing and compliance are complete, focus on building your campaign team 
and early strategy: fundraising, volunteers, or media outreach.`,
    tasks: [
      {
        id: "3-1",
        type: "choice",
        prompt: "Pick your first campaign strategy:",
        options: ["📈 Fundraising", "🧑‍🤝‍🧑 Volunteers", "📺 Media & Advertising"],
      },
      {
        id: "3-2",
        type: "write",
        prompt: "Describe your initial plan for the chosen strategy.",
      },
    ],
  },
];

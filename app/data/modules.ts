// ./app/data/modules.ts
import { Module } from "@/app/ai/types";

export const modules: Module[] = [
  {
    id: "module0",
    title: "Orientation & Introduction",
    active: true,
    description: "Introduction to the Federal Candidate Simulator and how it works.",
    narrator: "calm, professional",
    readingSummary: [
      "Narrator [calm, professional]: “Welcome to the Federal Candidate Simulator — AI Edition. This simulator will take you through the entire election cycle, one step at a time. You’ll experience the real requirements of filing, fundraising, compliance, and campaigning — all safely in a simulation.”",
      "Narrator [neutral]: “Here are the ground rules. Think of them as your campaign manual.”",
      "Candidate Coins (CC): 1 CC = $100 simulated. You start with 50 CC. Earn CC by passing quizzes or completing tasks. Spend CC on campaign needs like filing fees, ads, or communication coaching.",
      "Signatures & Voter Approval: Each quiz score = the same number of signatures. 100 signatures = 1% voter approval. Example: scoring 80% on a quiz = 80 signatures = 0.8% approval.",
      "Ballot Access: You must qualify for the ballot by paying CC (filing fee) AND gathering enough signatures (through quizzes and tasks). Eligibility thresholds: President → 75 CC + 2.5% approval, Senate → 50 CC + 2.5%, House → 31 CC + 2.5%.",
      "Task Types: Read (laws, filing guides, or news), Write (announcements, strategy documents, responses), Upload (images), Speak (speeches, press conferences, debates). Some decisions appear as chat buttons.",
      "Feedback & Progress: After each task, CC, signatures, and approval are updated. All choices and scores carry forward."
    ],
    tasks: [
      {
        id: "0-quiz-cc",
        type: "quiz",
        prompt: "🧩 What do Candidate Coins (CC) represent in this simulator?",
        questions: [
          {
            id: "q1",
            question: "Select the correct answer:",
            options: [
              "A) 1 CC = $100 simulated",
              "B) Real currency for campaign ads",
              "C) Signatures collected from voters",
              "D) Debate score multiplier"
            ],
            correct: ["A) 1 CC = $100 simulated"]
          }
        ]
      }
    ],
    purpose: "Introduce users to simulator mechanics, CC, signatures, approval, and office selection.",
    scenarios: [],
    outcome: "User completes the reading and quiz, understands CC and signatures, and is ready to select their office.",
    nextModule: {
      id: "module1",
      title: "Party Filing",
      description: "The first official step: filing as a party candidate.",
      tasks: []
    }
  },
  {
    id: "module1",
    title: "Party Filing",
    active: true,
    description: "Simulate filing as a Party Candidate with the Texas Secretary of State (SOS) and gathering signatures or paying fees.",
    narrator: "neutral",
    readingSummary: [
      "To appear on the ballot as a Party Candidate in Texas, you must:\n1. Be nominated by your party through conventions (Libertarian, Green, etc.) or a primary (Democratic, Republican).\n2. File an Application of Candidacy with the Texas Secretary of State.\n3. Choose one qualification method: Pay the required filing fee OR submit the required petition signatures.\n4. Deadlines: Party candidates must file paperwork by December of the year before the election; petition signatures are due at the same time.\n5. Signature rules: Signatures must be from registered voters who did not vote in another party’s primary; petition sheets must be submitted with a sworn affidavit."
    ],
    tasks: [
      {
        id: "1-1",
        type: "read",
        prompt: "As a Party Candidate, your filing process starts with the Texas Secretary of State (SOS) and your party’s nomination process. This is your first big step toward ballot access. You must go through your party first, then file with the SOS by paying the filing fee or submitting signatures. Mistakes in this process cost CC or signatures."
      },
      {
        id: "1-2",
        type: "quiz",
        prompt: "Quiz – Party Candidate Filing. Each correct answer = +20 signatures, each wrong answer = -1 CC. Score ≥ 80% = +1 CC, score 100% = +2 CC.",
        questions: [
          {
            id: "q1",
            question: "When must Party Candidates file their application of candidacy with the Texas SOS?",
            options: [
              "A) December of the year before the election",
              "B) January of election year",
              "C) By early May of election year",
              "D) By mid-August of election year"
            ],
            correct: ["A) December of the year before the election"]
          }
        ]
      }
    ],
    purpose: "Teach users the party filing process, including nomination, filing fees, and petition signatures, and test understanding through a quiz.",
    scenarios: [],
    outcome: "User completes Party Candidate filing with correct CC, signatures, and initial voter approval.",
    nextModule: {
      id: "module2",
      title: "Federal Compliance",
      description: "Register with the FEC using Forms 1 and 2."
    }
  }
];

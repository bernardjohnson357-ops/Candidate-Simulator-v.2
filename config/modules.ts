// ./config/modules.ts

export interface Task {
  id: string;
  type: "read" | "write" | "quiz" | "choice" | "speak" | "upload";
  prompt: string;
  options?: string[];
  correctAnswer?: string;
}

export interface Module {
  id: string;
  title: string;
  content?: string;
  tasks?: Task[];
}

export const modules: Module[] = [
  // ----------------------
  // Module 0 – Orientation & Introduction
  // ----------------------
  {
    id: "0",
    title: "Orientation & Introduction",
    content: `Narrator [calm, professional]: "Welcome to the Federal Candidate Simulator — AI Edition. 
This simulator will take you through the entire election cycle, one step at a time. 
You’ll experience the real requirements of filing, fundraising, compliance, and campaigning — all safely in a simulation."

Narrator [neutral]: "Here are the ground rules. Think of them as your campaign manual."

Candidate Coins (CC):
- 1 CC = $100 simulated.
- You start with 50 CC.
- Earn CC by passing quizzes or completing tasks.
- Spend CC on campaign needs like filing fees, ads, or communication coaching.

Signatures & Voter Approval:
- Each quiz score = the same number of signatures.
- 100 signatures = 1% voter approval.
- Example: scoring 80% on a quiz = 80 signatures = 0.8% approval.

Ballot Access:
- You must qualify for the ballot by paying CC (filing fee) AND gathering enough signatures (through quizzes and tasks).

Eligibility thresholds:
- President → 75 CC + 2.5% approval
- Senate → 50 CC + 2.5% approval
- House → 31 CC + 2.5% approval

Task Types:
- Read: Summaries of laws, filing guides, or news.
- Write: Announcements, strategy documents, responses.
- Upload: Images (Module 5 – signs, T-shirts, bumper stickers).
- Speak: Speeches, press conferences, debates (Modules 7+).
- Some decisions appear as chat buttons. Click to choose your action.

Feedback & Progress:
- After each task, your CC, signatures, and approval will be updated.
- Narration explains consequences: "Because you chose X, Y happened."
- Choices and scores carry forward like a real campaign.`,
    tasks: [
      {
        id: "0-1",
        type: "read",
        prompt: "Read the campaign manual and understand Candidate Coins, signatures, and approval.",
      },
      {
        id: "0-2",
        type: "choice",
        prompt: "Which office will you run for?",
        options: [
          "🏛 President (75 CC + 2.5% approval)",
          "🏛 U.S. Senate (50 CC + 2.5% approval)",
          "🏛 U.S. House (31 CC + 2.5% approval)",
        ],
      },
      {
        id: "0-3",
        type: "write",
        prompt: "Type your chosen office into the simulator chat.",
      },
      {
        id: "0-4",
        type: "speak",
        prompt: "Optionally speak your chosen office.",
      },
    ],
  },

  // ----------------------
  // Module 1 – Party Filing
  // ----------------------
  {
    id: "1",
    title: "Party Filing",
    content: `Narrator [serious]: "As a Party Candidate, you must be nominated through your party and file with the Texas Secretary of State (SOS). 
Pay the filing fee OR gather petition signatures to move forward."`,
    tasks: [
      {
        id: "1-1",
        type: "read",
        prompt: "Read the Texas SOS Party Candidate Guide summary and rules.",
      },
      {
        id: "1-2",
        type: "quiz",
        prompt: "When must Party Candidates file their application of candidacy with the Texas SOS?",
        options: [
          "A) December of the year before the election ✅",
          "B) January of election year",
          "C) By early May of election year",
          "D) By mid-August of election year",
        ],
        correctAnswer: "A) December of the year before the election ✅",
      },
      {
        id: "1-3",
        type: "quiz",
        prompt: "Who nominates Party Candidates in Texas?",
        options: [
          "A) The Secretary of State",
          "B) The Federal Election Commission",
          "C) Their political party ✅",
          "D) Any registered voter in their district",
        ],
        correctAnswer: "C) Their political party ✅",
      },
      {
        id: "1-4",
        type: "quiz",
        prompt: "If you choose petition signatures, who can sign?",
        options: [
          "A) Any registered voter",
          "B) Only party members",
          "C) Voters who did not vote in another party’s primary ✅",
          "D) Anyone 18 or older, even if not registered",
        ],
        correctAnswer: "C) Voters who did not vote in another party’s primary ✅",
      },
      {
        id: "1-5",
        type: "quiz",
        prompt: "Can you combine filing fees with petition signatures?",
        options: [
          "A) Yes, both can be combined",
          "B) No, you must choose one or the other ✅",
          "C) Only if you have fewer than 1,000 signatures",
          "D) Only with approval from your party chair",
        ],
        correctAnswer: "B) No, you must choose one or the other ✅",
      },
      {
        id: "1-6",
        type: "quiz",
        prompt: "What must accompany petition sheets for them to be valid?",
        options: [
          "A) An FEC Form 1",
          "B) A notarized affidavit ✅",
          "C) A party endorsement letter",
          "D) A voter ID photocopy",
        ],
        correctAnswer: "B) A notarized affidavit ✅",
      },
    ],
  },

  // ----------------------
  // Module 2 – Federal Compliance
  // ----------------------
  {
    id: "2",
    title: "FEC Filing",
    content: `Narrator [calm, professional]: "Federal compliance requires filing FEC Forms 1 & 2 once campaign activity exceeds $5,000.
Form 1 = Statement of Candidacy. Form 2 = Statement of Organization."`,
    tasks: [
      {
        id: "2-1",
        type: "read",
        prompt: "Read the FEC Candidate Guide summary for Forms 1 & 2.",
      },
      {
        id: "2-2",
        type: "quiz",
        prompt: "Which form registers your campaign committee?",
        options: ["Form 1", "Form 2", "Form 3"],
        correctAnswer: "Form 2",
      },
      {
        id: "2-3",
        type: "quiz",
        prompt: "What federal threshold triggers mandatory FEC registration?",
        options: ["$1,000 in expenditures", "$5,000 in contributions or expenditures", "$10,000 in contributions"],
        correctAnswer: "$5,000 in contributions or expenditures",
      },
      {
        id: "2-4",
        type: "quiz",
        prompt: "Who can serve as a campaign treasurer?",
        options: ["Only the candidate", "Any U.S. citizen", "Any individual or legal entity, but not foreign nationals"],
        correctAnswer: "Any individual or legal entity, but not foreign nationals",
      },
      {
        id: "2-5",
        type: "quiz",
        prompt: "When must a House or Senate candidate file their Statement of Candidacy?",
        options: ["Before raising any funds", "Within 15 days after raising or spending more than $5,000", "After Election Day"],
        correctAnswer: "Within 15 days after raising or spending more than $5,000",
      },
    ],
  },

  // ----------------------
  // Module 3 – Building Your Campaign Team
  // ----------------------
  {
    id: "3",
    title: "Building Your Campaign Team",
    content: `Narrator [neutral]: "Now that you are federally compliant, it’s time to assemble your campaign team.
Decide on your first staff hires and strategic focus for volunteers, media, and fundraising."`,
    tasks: [
      {
        id: "3-1",
        type: "choice",
        prompt: "Which strategy will you prioritize first?",
        options: ["📈 Fundraising", "🧑‍🤝‍🧑 Volunteers", "📺 Media & Advertising"],
      },
      {
        id: "3-2",
        type: "write",
        prompt: "Describe your initial campaign team structure (roles & responsibilities).",
      },
      {
        id: "3-3",
        type: "speak",
        prompt: "Optionally introduce your campaign team aloud.",
      },
    ],
  },
];

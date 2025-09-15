import { Task } from "types";

// -----------------------------
// All simulator tasks (Modules 0–15)
// -----------------------------
export const tasks: Task[] = [
  // --- Module 0: Orientation ---
  {
    id: "t0_read",
    module: 0,
    type: "read",
    content: "Welcome to the Federal Candidate Simulator! You start with 50 Candidate Coins (CC).",
  },
  {
    id: "t0_write",
    module: 0,
    type: "write",
    content: "Choose your office: President, Senate, or House.",
  },
  {
    id: "t0_quiz",
    module: 0,
    type: "quiz",
    content: "Quick check: How many CC do you start with?",
    quiz: {
      question: "How many Candidate Coins (CC) does each player start with?",
      options: ["25", "50", "75", "100"],
      answer: "50",
    },
  },

  // --- Module 1: Filing Phase ---
  {
    id: "m1_read",
    module: 1,
    type: "read",
    content: "Module 1 introduces ballot access rules and filing basics.",
  },
  {
    id: "m1_quiz",
    module: 1,
    type: "quiz",
    content: "Test your knowledge of filing requirements.",
    quiz: {
      question: "Roughly how many signatures are required for a U.S. House candidate in many states?",
      options: ["500", "1,000", "5,000", "10,000"],
      answer: "1,000",
    },
  },

  // --- Module 2: FEC Filing Fee Quizzes ---
  {
    id: "m2_read",
    module: 2,
    type: "read",
    content: "Module 2 covers federal compliance and FEC filing forms.",
  },
  {
    id: "m2_quiz",
    module: 2,
    type: "quiz",
    content: "Test your understanding of FEC Forms 1 & 2.",
    quiz: {
      question: "Which form officially declares you as a candidate?",
      options: ["Form 1", "Form 2", "Form 3", "SOS Petition"],
      answer: "Form 1",
    },
  },

  // --- Module 3: First Moves ---
  {
    id: "m3_read",
    module: 3,
    type: "read",
    content: "Module 3 introduces strategic first campaign moves.",
  },
  {
    id: "m3_write",
    module: 3,
    type: "write",
    content: "Choose a strategic path: Fundraising, Volunteers, or Media/Advertising.",
  },

  // --- Module 4: Campaign Identity ---
  {
    id: "m4_read",
    module: 4,
    type: "read",
    content: "Module 4 focuses on defining your campaign identity: slogan, mission, and announcement.",
  },
  {
    id: "m4_write",
    module: 4,
    type: "write",
    content: "Write your slogan, mission statement, and announcement speech.",
  },

  // --- Module 5: Campaign Imagery ---
  {
    id: "m5_read",
    module: 5,
    type: "read",
    content: "Module 5 teaches visual campaign branding: logos, signs, T-shirts.",
  },
  {
    id: "m5_write",
    module: 5,
    type: "write",
    content: "Upload or describe your campaign visuals.",
  },

  // --- Module 6: September Compliance & Scenarios ---
  {
    id: "m6_read",
    module: 6,
    type: "read",
    content: "Module 6 focuses on FEC compliance and strategic scenario management.",
  },
  {
    id: "m6_write",
    module: 6,
    type: "write",
    content: "Respond to compliance and constituent scenarios.",
  },

  // --- Module 7: Early October Operations ---
  {
    id: "m7_read",
    module: 7,
    type: "read",
    content: "Module 7 covers early October campaign operations and team management.",
  },
  {
    id: "m7_write",
    module: 7,
    type: "write",
    content: "Prepare speeches or messages addressing constituent concerns.",
  },

  // --- Module 8: Mid-October Operations ---
  {
    id: "m8_read",
    module: 8,
    type: "read",
    content: "Module 8 focuses on mid-October communications and press engagement.",
  },
  {
    id: "m8_write",
    module: 8,
    type: "write",
    content: "Deliver an opening statement for a press conference.",
  },

  // --- Module 9: Final Push ---
  {
    id: "m9_read",
    module: 9,
    type: "read",
    content: "Module 9 prepares candidates for final stretch media appearances and outreach.",
  },
  {
    id: "m9_write",
    module: 9,
    type: "write",
    content: "Participate in final campaign exercises and media interactions.",
  },

  // --- Module 10: Election Countdown ---
  {
    id: "m10_read",
    module: 10,
    type: "read",
    content: "Module 10 focuses on the final days before the election.",
  },
  {
    id: "m10_write",
    module: 10,
    type: "write",
    content: "Finalize campaign strategies and communications.",
  },

  // --- Module 11: Election Week School Visit ---
  {
    id: "m11_read",
    module: 11,
    type: "read",
    content: "Module 11 covers Election Week activities such as school visits.",
  },
  {
    id: "m11_write",
    module: 11,
    type: "write",
    content: "Write or deliver your candidate message for school visits.",
  },

  // --- Module 12: TV Interview ---
  {
    id: "m12_read",
    module: 12,
    type: "read",
    content: "Module 12 covers media interactions via TV interviews.",
  },
  {
    id: "m12_write",
    module: 12,
    type: "write",
    content: "Prepare and deliver your TV interview responses.",
  },

  // --- Module 13: Endorsement Meeting ---
  {
    id: "m13_read",
    module: 13,
    type: "read",
    content: "Module 13 teaches engagement with endorsement opportunities.",
  },
  {
    id: "m13_write",
    module: 13,
    type: "write",
    content: "Respond to endorsement meeting scenarios.",
  },

  // --- Module 14: Debate ---
  {
    id: "m14_read",
    module: 14,
    type: "read",
    content: "Module 14 covers debate preparation and strategy.",
  },
  {
    id: "m14_write",
    module: 14,
    type: "write",
    content: "Write or deliver debate responses.",
  },

  // --- Module 15: Final Summary ---
  {
    id: "m15_read",
    module: 15,
    type: "read",
    content: "Module 15 summarizes campaign performance and outcomes.",
  },
  {
    id: "m15_write",
    module: 15,
    type: "write",
    content: "Reflect on campaign performance and lessons learned.",
  },
];

import { Task } from "@/types";

// -----------------------------
// All simulator tasks
// -----------------------------
export const tasks: Task[] = [
  // --- Module 0: Orientation ---
  {
    id: "t0_read",
    module: 0,
    type: "read",
    content: "Welcome to the Federal Candidate Simulator! You start with 50 Candidate Coins (CC)."
  },
  {
    id: "t0_write",
    module: 0,
    type: "write",
    content: "Choose your office: President, Senate, or House."
  },
  {
    id: "t0_quiz",
    module: 0,
    type: "quiz",
    content: "Quick check: How many CC do you start with?",
    quiz: {
      question: "How many Candidate Coins (CC) does each player start with?",
      options: ["25", "50", "75", "100"],
      answer: "50"
    }
  },

  // --- Example for Module 1 ---
  {
    id: "m1_read",
    module: 1,
    type: "read",
    content: "Module 1 introduces ballot access rules and filing basics."
  },
  {
    id: "m1_quiz",
    module: 1,
    type: "quiz",
    content: "Ballot access varies by state. Let's test your knowledge.",
    quiz: {
      question: "Roughly how many signatures are required for a U.S. House candidate in many states?",
      options: ["500", "1,000", "5,000", "10,000"],
      answer: "1,000"
    }
  }

  // ✅ Add more modules as needed...
];

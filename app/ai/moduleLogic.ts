// app/ai/moduleLogic.ts

export interface Module {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface Task {
  type: "read" | "write" | "quiz" | "scenario";
  prompt: string;
  options?: string[]; // for multiple choice quizzes
  correctAnswer?: string; // optional for quizzes
}

export const modules: Module[] = [
  {
    id: "0",
    title: "Orientation & Introduction",
    description: "Learn about Candidate Coins (CC), signatures, voter approval, and office eligibility.",
    tasks: [
      {
        type: "read",
        prompt: "Welcome to the Federal Candidate Simulator! You'll manage CC, signatures, and voter approval.",
      },
      {
        type: "write",
        prompt: "Type your name and the office you plan to run for (President, Senate, House).",
      },
    ],
  },
  {
    id: "1A",
    title: "Independent / Write-In Filing",
    description: "File as an independent or write-in candidate and learn filing requirements.",
    tasks: [
      {
        type: "quiz",
        prompt: "What is required to file as an independent candidate?",
        options: ["Pay fee", "Collect signatures", "Both", "None"],
        correctAnswer: "Both",
      },
    ],
  },
  {
    id: "2A",
    title: "Independent FEC Filing Quiz",
    description: "Complete a quiz on federal filing rules for independent candidates.",
    tasks: [
      {
        type: "quiz",
        prompt: "Which form names your treasurer for federal filings?",
        options: ["Form 1", "Form 2", "Form 3", "Form 4"],
        correctAnswer: "Form 2",
      },
    ],
  },
];

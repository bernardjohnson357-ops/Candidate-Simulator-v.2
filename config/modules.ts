// ./config/modules.ts
import { Module, Task } from "../app/ai/types";

/**
 * Helper: dynamically generate quiz tasks from reading content
 */
const generateQuizTasks = (moduleId: string, reading: string): Task[] => {
  // Placeholder logic: in a real setup, you'd call an AI model to generate questions
  const exampleQuestions = [
    {
      prompt: "Sample question based on reading?",
      options: ["A", "B", "C"],
      correctAnswer: "A",
    },
    {
      prompt: "Another question from the reading?",
      options: ["X", "Y", "Z"],
      correctAnswer: "Y",
    },
  ];

  return exampleQuestions.map((q, idx) => ({
    id: `${moduleId}-quiz-${idx + 1}`,
    type: "quiz",
    prompt: q.prompt,
    options: q.options,
    correctAnswer: q.correctAnswer,
  }));
};

export const modules: Module[] = [
  {
    id: "0",
    title: "Orientation & Introduction",
    content: `Welcome to the Federal Candidate Simulator — AI Edition. This simulator will take you through filing, fundraising, compliance, and campaigning safely in a simulation.

Candidate Coins (CC): start with 50 CC. Earn CC through quizzes and tasks.  
Signatures & Voter Approval: 100 signatures = 1% approval.  
Ballot Access: pay CC filing fee or gather signatures.  
Eligibility thresholds: President → 75 CC + 2.5% approval, Senate → 50 CC + 2.5% approval, House → 31 CC + 2.5% approval.`,

    // Generate quiz tasks dynamically
    tasks: generateQuizTasks("0", "Orientation reading content here"),
  },
  {
    id: "1",
    title: "Filing Phase",
    content: `As a party candidate, you must file with your party and the Texas Secretary of State (SOS). Pay the filing fee or submit petition signatures. Deadlines: December of the year before the election. Signatures must be from registered voters who did not vote in another party primary.`,

    tasks: generateQuizTasks("1", "Party filing reading content here"),
  },
  {
    id: "2",
    title: "Federal Compliance",
    content: `Once state filing is complete, federal compliance begins. File FEC Forms 1 & 2 after raising or spending $5,000. Form 1 = Statement of Candidacy. Form 2 = Statement of Organization. Quarterly reporting begins thereafter.`,

    tasks: generateQuizTasks("2", "FEC compliance reading content here"),
  },
  {
    id: "3",
    title: "First Moves: Campaign Team & Strategy",
    content: `Establish your campaign’s foundation: choose focus areas like fundraising, volunteers, or media/ads. Buy campaign essentials with CC. Decisions here affect signatures, approval, and CC balances.`,

    tasks: generateQuizTasks("3", "Campaign team and strategy reading content here"),
  },
];

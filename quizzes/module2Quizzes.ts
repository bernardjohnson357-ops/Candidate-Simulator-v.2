// quizzes/module2Quizzes.ts
import { QuizQuestion } from "@/types";

export const module2Quizzes: Record<"2A" | "2B", QuizQuestion[]> = {
  "2A": [
    {
      id: "q1",
      prompt: "What is the spending/raising threshold that requires filing with the FEC?",
      options: [
        { label: "A", text: "$500", correct: false },
        { label: "B", text: "$1,500", correct: false },
        { label: "C", text: "$5,000", correct: true },
        { label: "D", text: "$50,000", correct: false },
      ],
    },
    {
      id: "q2",
      prompt: "Which form officially declares you as a candidate?",
      options: [
        { label: "A", text: "FEC Form 1", correct: false },
        { label: "B", text: "FEC Form 2", correct: false },
        { label: "C", text: "FEC Form 1 – Statement of Candidacy", correct: true },
        { label: "D", text: "FEC Form 3 – Quarterly Report", correct: false },
      ],
    },
    {
      id: "q3",
      prompt: "Which form registers your campaign committee and treasurer?",
      options: [
        { label: "A", text: "FEC Form 1", correct: false },
        { label: "B", text: "FEC Form 2 – Statement of Organization", correct: true },
        { label: "C", text: "FEC Form 3", correct: false },
        { label: "D", text: "SOS Petition", correct: false },
      ],
    },
    {
      id: "q4",
      prompt: "How long do you have to file Forms 1 and 2 once you cross the $5,000 threshold?",
      options: [
        { label: "A", text: "7 days", correct: false },
        { label: "B", text: "15 days", correct: true },
        { label: "C", text: "30 days", correct: false },
        { label: "D", text: "90 days", correct: false },
      ],
    },
    {
      id: "q5",
      prompt: "What must be included on Form 2 (Statement of Organization)?",
      options: [
        { label: "A", text: "Candidate’s birthplace", correct: false },
        { label: "B", text: "Campaign treasurer + banking info", correct: true },
        { label: "C", text: "Opponent’s campaign details", correct: false },
        { label: "D", text: "Petition signature totals", correct: false },
      ],
    },
  ],

  "2B": [
    {
      id: "q1",
      prompt: "What is the fundraising/spending threshold that requires FEC filing?",
      options: [
        { label: "A", text: "$500", correct: false },
        { label: "B", text: "$1,500", correct: false },
        { label: "C", text: "$5,000", correct: true },
        { label: "D", text: "$50,000", correct: false },
      ],
    },
    {
      id: "q2",
      prompt: "Which form officially declares you as a candidate?",
      options: [
        { label: "A", text: "FEC Form 1 – Statement of Candidacy", correct: true },
        { label: "B", text: "FEC Form 2 – Statement of Organization", correct: false },
        { label: "C", text: "FEC Form 3 – Quarterly Report", correct: false },
        { label: "D", text: "SOS Application of Candidacy", correct: false },
      ],
    },
    {
      id: "q3",
      prompt: "Which form registers your campaign committee and treasurer?",
      options: [
        { label: "A", text: "FEC Form 1", correct: false },
        { label: "B", text: "FEC Form 2 – Statement of Organization", correct: true },
        { label: "C", text: "FEC Form 3", correct: false },
        { label: "D", text: "Party Nomination Form", correct: false },
      ],
    },
    {
      id: "q4",
      prompt: "How long do you have to file Forms 1 and 2 after crossing the $5,000 threshold?",
      options: [
        { label: "A", text: "7 days", correct: false },
        { label: "B", text: "15 days", correct: true },
        { label: "C", text: "30 days", correct: false },
        { label: "D", text: "90 days", correct: false },
      ],
    },
    {
      id: "q5",
      prompt: "Once Forms 1 and 2 are filed, what additional FEC reporting is required?",
      options: [
        { label: "A", text: "No further filings are needed", correct: false },
        { label: "B", text: "Weekly expense logs", correct: false },
        { label: "C", text: "Quarterly Form 3 Reports", correct: true },
        { label: "D", text: "Annual reports only", correct: false },
      ],
    },
  ],
};

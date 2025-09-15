// quizzes/moduleQuizzes.ts
import { QuizQuestion } from "@/types";

export const moduleQuizzes: Record<"1A" | "1B", QuizQuestion[]> = {
  "1A": [
    {
      id: "q1",
      prompt: "When must Independent candidates file their application of candidacy with the Texas SOS?",
      options: [
        { label: "A", text: "January 1 of election year", correct: false },
        { label: "B", text: "By early May of election year", correct: true },
        { label: "C", text: "By mid-August of election year", correct: false },
        { label: "D", text: "There is no deadline", correct: false },
      ],
    },
    {
      id: "q2",
      prompt: "If you submit signatures, they must come from which group?",
      options: [
        { label: "A", text: "Any registered voter", correct: false },
        { label: "B", text: "Only voters who belong to your party", correct: false },
        { label: "C", text: "Registered voters who did not vote in another party’s primary", correct: true },
        { label: "D", text: "Anyone over age 18, even if not registered", correct: false },
      ],
    },
    // add more Module 1A questions...
  ],
  "1B": [
    {
      id: "q1",
      prompt: "When must Party Candidates file their application of candidacy with the Texas SOS?",
      options: [
        { label: "A", text: "December of the year before the election", correct: true },
        { label: "B", text: "January of election year", correct: false },
        { label: "C", text: "By early May of election year", correct: false },
        { label: "D", text: "By mid-August of election year", correct: false },
      ],
    },
    {
      id: "q2",
      prompt: "Who nominates Party Candidates in Texas?",
      options: [
        { label: "A", text: "The Secretary of State", correct: false },
        { label: "B", text: "The Federal Election Commission", correct: false },
        { label: "C", text: "Their political party", correct: true },
        { label: "D", text: "Any registered voter in their district", correct: false },
      ],
    },
    // add more Module 1B questions...
  ],
};

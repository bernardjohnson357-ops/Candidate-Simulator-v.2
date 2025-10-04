import { Module } from "../../app/ai/types";

export const module1: Module = {
  id: "1",
  title: "Party Filing",
  description: `
# 🗳 Module 1 – Party Filing
... (all your narration and guide text here) ...
  `,
  tasks: [
    {
      id: "quiz-party-filing",
      type: "quiz",
      prompt: "Let’s test your understanding. Answer carefully: your score equals signatures earned.",
      questions: [
        {
          question: "When must Party Candidates file their application of candidacy with the Texas SOS?",
          options: [
            "A) December of the year before the election ✅",
            "B) January of election year",
            "C) By early May of election year",
            "D) By mid-August of election year"
          ],
          correctAnswer: 0,
        },
        {
          question: "Who nominates Party Candidates in Texas?",
          options: [
            "A) The Secretary of State",
            "B) The Federal Election Commission",
            "C) Their political party ✅",
            "D) Any registered voter in their district"
          ],
          correctAnswer: 2,
        },
        // ...add other questions here...
      ],
    },
  ],
};

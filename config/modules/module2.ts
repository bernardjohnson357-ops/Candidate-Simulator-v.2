import { Module } from "@/app/ai/types";

export const module2: Module = {
  id: "2",
  title: "FEC Registration",
  description: `
# 🗳 Module 2 – Federal Election Commission (FEC) Registration
**Narrator [professional]:**  
“Every federal candidate must register with the FEC once they cross the threshold of raising or spending more than **$5,000**. This includes filing the **Statement of Candidacy (FEC Form 2)** and designating a campaign committee with **FEC Form 1**.

As a candidate, this step is mandatory in order to legally raise and spend money. Missing deadlines or filing incorrectly can lead to fines or disqualification. Let’s test your understanding with a short quiz.”
`,
  tasks: [
    {
      id: "2-quiz-1",
      type: "quiz",
      prompt: "📊 Quiz – Federal Election Commission Registration",
      questions: [
        {
          question:
            "At what point must a federal candidate register with the FEC?",
          options: [
            "A) As soon as they announce their candidacy",
            "B) After raising or spending $5,000",
            "C) Only if running for President",
            "D) Within one year of the election",
          ],
          correct: 1,
        },
        {
          question:
            "Which form officially declares you as a candidate with the FEC?",
          options: [
            "A) FEC Form 1",
            "B) FEC Form 2",
            "C) FEC Form 3",
            "D) FEC Form 99",
          ],
          correct: 1,
        },
        {
          question:
            "Which form establishes your principal campaign committee with the FEC?",
          options: [
            "A) FEC Form 1",
            "B) FEC Form 2",
            "C) FEC Form 3",
            "D) IRS Form 990",
          ],
          correct: 0,
        },
        {
          question: "What is the role of the principal campaign committee?",
          options: [
            "A) To conduct polling",
            "B) To legally raise and spend campaign funds",
            "C) To write campaign speeches",
            "D) To manage the candidate’s personal finances",
          ],
          correct: 1,
        },
        {
          question:
            "What consequence might follow if you miss FEC filing deadlines?",
          options: [
            "A) Nothing significant happens",
            "B) You are fined or disqualified",
            "C) You can just refile later without penalty",
            "D) The FEC assigns you a new treasurer automatically",
          ],
          correct: 1,
        },
      ],
    },
  ],
};

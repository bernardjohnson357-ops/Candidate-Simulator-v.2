export const module1: Module = {
  id: "1",
  title: "Party Filing",
  description: `
# 🗳 Module 1 – Party Filing
**Narrator [serious]:** “As a Party Candidate, you must be nominated through your party and file with the Secretary of State.”

# **Module 1 – Filing Phase**
... (rest of your narration text here) ...
`,
  tasks: [
    {
      id: "quiz-party-filing",
      type: "quiz",
      prompt: "Answer the filing quiz questions.",
      questions: [
        {
          question: "When must Party Candidates file their application of candidacy with the Texas SOS?",
          options: [
            "A) December of the year before the election ✅",
            "B) January of election year",
            "C) By early May of election year",
            "D) By mid-August of election year",
          ],
          correctAnswer: 0,
        },
        // ... more questions ...
      ],
    },
  ],
};

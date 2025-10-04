import { Module } from "@/app/ai/types";

export const module1: Module = {
  id: "1",
  title: "Party Filing",
  description: `
# 🗳 Module 1 – Filing Phase
**Narrator [neutral]:** “In the real-world, you have two possible paths: Independent/Write-In or Party candidate. However, for the purpose of this simulator, the filing process is different, allowing only party filing, along with paying the fees.”

### Module 1 – Party Filing
**Narrator [serious]:** “As a party candidate, you must be nominated through your party and also file with the Secretary of State (SOS). Within this simulation, you must:
- Pay the filing fee AND
- Gather signatures (to simulate convention votes).”

**Narrator [neutral]:** “Next, I’ll give you a reading summary of the Texas SOS Party Candidate Guide. Then, you’ll take a short quiz. Your score will convert into signatures.”
`,
  tasks: [
    {
      id: "1-quiz-1",
      type: "quiz",
      prompt: "📊 Quiz – Party Candidate Filing",
      questions: [
        {
          question:
            "When must Party Candidates file their application of candidacy with the Texas SOS?",
          options: [
            "A) December of the year before the election",
            "B) January of election year",
            "C) By early May of election year",
            "D) By mid-August of election year",
          ],
          correct: 0,
        },
        {
          question: "Who nominates Party Candidates in Texas?",
          options: [
            "A) The Secretary of State",
            "B) The Federal Election Commission",
            "C) Their political party",
            "D) Any registered voter in their district",
          ],
          correct: 2,
        },
        {
          question: "If you choose petition signatures, who can sign?",
          options: [
            "A) Any registered voter",
            "B) Only party members",
            "C) Voters who did not vote in another party’s primary",
            "D) Anyone 18 or older, even if not registered",
          ],
          correct: 2,
        },
        {
          question: "Can you combine filing fees with petition signatures?",
          options: [
            "A) Yes, both can be combined",
            "B) No, you must choose one or the other",
            "C) Only if you have fewer than 1,000 signatures",
            "D) Only with approval from your party chair",
          ],
          correct: 1,
        },
        {
          question: "What must accompany petition sheets for them to be valid?",
          options: [
            "A) An FEC Form 1",
            "B) A notarized affidavit",
            "C) A party endorsement letter",
            "D) A voter ID photocopy",
          ],
          correct: 1,
        },
      ],
    },
  ],
};

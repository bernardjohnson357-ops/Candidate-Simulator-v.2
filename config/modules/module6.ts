import { Module } from "@/app/ai/types";

export const module6: Module = {
  id: "module-6",
  title: "September: Compliance & Scenarios",
  description: `
**Narrator [calm, professional]:**
"With your campaign identity and visuals established, it’s time to ensure your operations meet federal compliance standards. The FEC monitors contributions, expenditures, and reporting accuracy. Simulated compliance now affects your voter approval and Candidate Coins."
`,
  tasks: [
    {
      id: "6-reading",
      type: "read",
      prompt: `
### 🎯 Purpose
Practice federal campaign compliance while managing strategic voter interactions:
- Complete a simulated FEC quarterly filing quiz.
- Respond to real-world-inspired campaign scenarios.
- Apply leadership and messaging skills under simulated pressure.

This module reinforces both legal awareness and strategic decision-making.

### 📝 Reading Summary
**Narrator [neutral, instructive]:** "Federal campaign compliance requires careful record-keeping and timely filings. Key points:"
1. FEC Quarterly Reporting → Candidates must track contributions, expenditures, and committee information.
2. Transparency & Accuracy → Errors or omissions affect credibility, voter trust, and simulated penalties.
3. Decision-Making Under Scrutiny → Public and organizational reactions influence voter approval; your campaign choices carry consequences.

**Reference Materials:**
- [FEC Form 3 Manual (PDF)](https://www.fec.gov/resources/cms-content/documents/policy-guidance/fecfrm3.pdf)
- [FEC Committee Data Example](https://www.fec.gov/data/committee/C00588657/?cycle=2026)
`
    },
    {
      id: "6-fec-quiz",
      type: "quiz",
      prompt: `
### 📝 Task – FEC Filing Quiz
Complete the FEC quarterly filing quiz. You will report:
- Total contributions received
- Expenditures made
- Cash on hand (beginning & ending)
- Committee information

**Evaluation:**
- Score ≥ 80% → Earn 1 CC bonus
- Score = 100% → Earn 2 CC bonus
- Each quiz score → Equivalent number of signatures

Outcome: CC, signatures, and voter approval updated based on performance.
      `,
      questions: [
        {
          question: "What form reports your contributions and expenditures quarterly?",
          options: ["FEC Form 1", "FEC Form 2", "FEC Form 3", "FEC Form 4"],
          correct: 2,
        },
        {
          question: "When is a candidate required to file Form 3?",
          options: ["Quarterly", "Annually", "After election", "Never"],
          correct: 0,
        },
        {
          question: "What happens if a candidate makes errors in reporting?",
          options: [
            "Nothing",
            "FEC may impose fines and reduce credibility",
            "Candidate automatically wins",
            "Campaign is suspended"
          ],
          correct: 1,
        },
      ]
    },
    {
      id: "6-canvassing",
      type: "write",
      prompt: `
### Scenario – Community Canvassing
A constituent says: ‘I retired with $1.5M. I’m worried it won’t last. What would you do for people like me?’

**Task:** Write a clear, persuasive 3–5 paragraph response addressing the constituent’s concerns.
**Evaluation:** AI assesses clarity, coherence, and alignment with campaign identity.
      `
    },
    {
      id: "6-constitution-day",
      type: "write",
      prompt: `
### Scenario – Constitution Day Challenge
Protesters at Armadillo University confront you about your prior petition decisions (e.g., Gaza petition).

**Task:** Craft a 3–5 paragraph public response.
**Evaluation:** AI evaluates tone, messaging consistency, and voter impact.
      `
    },
    {
      id: "6-postcard",
      type: "write",
      prompt: `
### Scenario – Postcard Offer
You are offered the chance to distribute campaign postcards:

CC Available | Option
--- | ---
100 CC | Full mid-October + pre-election ads
75 CC | Late October ads only
0 CC | Decline

**Task:** Choose an option and justify your decision in 1–2 paragraphs.
**Outcome:** Voter approval and visibility adjusted based on choice.
      `
    },
    {
      id: "6-debate",
      type: "write",
      prompt: `
### Scenario – Debate Challenge
An opponent invites you to an October debate. You may accept or decline, and optionally hire a debate coach (50 CC).

**Task:** Decide your approach and explain reasoning.
**Outcome:** AI evaluates strategic thinking, messaging, and CC impact.
      `
    },
    {
      id: "6-outcome",
      type: "read",
      prompt: `
### 📊 Module 6 Outcome
- FEC filing simulated and scored → CC and signatures updated
- Voter approval adjusted based on scenario responses and resource allocation
- Candidate demonstrates ability to manage compliance, constituent interaction, and strategic decision-making

**Next Module:** Module 7 – Early October Operations, where candidates begin final-stage operations, speech preparation, and team management leading into Election Day.

Reference: [General Election September – Simulator Test Mode](https://www.bernardjohnson4congress.com/general_election_cycle_september_test_mode)
      `
    },
  ],
};

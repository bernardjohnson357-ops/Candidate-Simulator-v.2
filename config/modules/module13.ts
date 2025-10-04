import { Module } from "@/app/ai/types";

export const module13: Module = {
  id: "module-13",
  title: "Pro-Israel Group Meeting",
  description: `
**Narrator [calm, professional]:**
"As Election Week begins in earnest, candidates face high-stakes endorsement negotiations. These moments test not only political strategy but also moral judgment, values, and public perception. Candidates must decide whether short-term gains are worth long-term risks."
  `,
  tasks: [
    {
      id: "13-reading",
      type: "read",
      prompt: `
### 🎯 Purpose
Simulate an endorsement decision scenario to practice:
- Weighing political advantage versus ethical considerations
- Communicating reasoning clearly and persuasively
- Assessing potential impacts on voter approval and campaign credibility

This module emphasizes strategic decision-making under ethical constraints.

### 📝 Reading Summary
Endorsements can provide significant leverage but often come with conditions. Candidates must weigh:
1. Political Gains → Exposure, voter reach, campaign resources
2. Ethical Implications → Alignment with personal and campaign values
3. Public Perception → Risk of backlash versus credibility boost

Scenario Context:
- A Pro-Israel group, previously supporting your opponent, now offers endorsement with strict conditions:
  - Candidate must adopt an anti-transgender stance
  - Candidate must reject a two-state solution for Israel

Accepting or declining will directly influence both CC and voter approval.
      `
    },
    {
      id: "13-decision",
      type: "write",
      prompt: `
### 📝 Task – Endorsement Decision
Scenario: Decide whether to accept or decline the endorsement.
- Task: Provide a clear, concise explanation of your decision (typed or speech-to-text).
- Evaluation: AI evaluates reasoning for:
  - Alignment with campaign identity and values
  - Strategic foresight
  - Clarity and persuasiveness

Potential Outcomes:
- Accept → Gain exposure, ad boost, +1000 CC, but risk protests and voter backlash
- Decline → Mixed reviews, maintain moral credibility, potential voter approval stability
      `
    },
    {
      id: "13-outcome",
      type: "read",
      prompt: `
### 📊 Module 13 Outcome
- Decision evaluated → CC, voter approval, and credibility updated
- Candidate demonstrates ability to weigh political advantage against ethical and public considerations
- Prepares candidate for final debate and Election Week challenges

Next Module: Module 14 – Debate Night (November 2), simulating high-stakes, live debate scenarios with real-time audience and moderator interactions.
Reference: [Candidate Simulator Master Roadmap – Module 13](https://www.bernardjohnson4congress.com/general_election_cycle_november_1_test_mode)
      `
    },
  ],
};

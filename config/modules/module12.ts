import { Module } from "@/app/ai/types";

export const module12: Module = {
  id: "module-12",
  title: "Television Interview",
  description: `
**Narrator [calm, professional]:**
"Candidates now face a live broadcast interview, testing composure, messaging consistency, and adaptability under high-pressure conditions. Television exposure can significantly influence voter perception."
  `,
  tasks: [
    {
      id: "12-reading",
      type: "read",
      prompt: `
### 🎯 Purpose
Simulate a televised interview to practice:
- Communicating clearly and persuasively on live TV
- Handling soft, policy, and challenging “gotcha” questions
- Maintaining campaign identity and credibility under scrutiny

This module emphasizes poise, clarity, and strategic messaging.

### 📝 Reading Summary
Televised interviews require:
1. Structured responses → Keep answers open, concise, and aligned with campaign identity.
2. Adapting to phases → Transition smoothly from soft to policy to challenging questions.
3. Composure under pressure → Avoid overreacting, stay authentic, and maintain credibility.

Interview Phases Example:
- Softball Opening → Light discussion (weather, school visit recaps)
- Policy Questions → Community safety, local priorities, and national policy issues
- “Gotcha” Phase → Moderator presses on opponent positions or controversial topics
- Closing Challenge → Reiterate your positions consistently and confidently
      `
    },
    {
      id: "12-interview",
      type: "write",
      prompt: `
### 📝 Task – Multi-Phase Interview
Scenario: Participate in the AI-simulated live interview.
- Task: Respond to all phases (typed or speech-to-text):
  1. Softball / introductory questions
  2. Policy-focused inquiries
  3. High-pressure “gotcha” challenges
  4. Closing consistency check

Evaluation: AI assesses clarity, persuasiveness, composure, alignment with campaign identity, and voter approval impact.
      `
    },
    {
      id: "12-outcome",
      type: "read",
      prompt: `
### 📊 Module 12 Outcome
- Multi-phase interview performance evaluated → Voter approval updated
- Candidate demonstrates ability to maintain messaging consistency, composure, and credibility under live broadcast conditions
- CC may be awarded for clear, persuasive, and authentic responses

Next Module: Module 13 – Pro-Israel Group Meeting (November 1), testing moral and strategic decision-making in endorsement negotiations.
Reference: [Candidate Simulator Master Roadmap – Module 12](https://www.bernardjohnson4congress.com/general_election_cycle_october_31_test_mode)
      `
    },
  ],
};

import { Module } from "@/app/ai/types";

export const module14: Module = {
  id: "module-14",
  title: "Debate Night",
  description: `
**Narrator [calm, professional]:**
"The campaign now culminates in the final debate. Under the lights, candidates face moderators, opponents, and a live audience. Every response is magnified, and performance here can dramatically shape voter perception and Election Week outcomes."
  `,
  tasks: [
    {
      id: "14-reading",
      type: "read",
      prompt: `
### 🎯 Purpose
Simulate a high-stakes, live debate to practice:
- Handling a wide range of policy and values-based questions
- Maintaining composure under pressure
- Communicating with clarity, persuasiveness, and consistency

This module emphasizes real-time decision-making, message discipline, and strategic communication.

### 📝 Reading Summary
Debate success depends on:
1. Preparedness → Understanding key issues and prior positions
2. Adaptability → Responding to unexpected questions and moderator challenges
3. Consistency → Aligning answers with campaign identity and earlier statements
4. Audience Awareness → Reading reactions and adjusting tone accordingly

Debate Structure:
- Moderator Questions → Economy, foreign policy, social issues, local concerns
- Opponent Challenges → Real-time rebuttals and fact-checking
- Live Audience → AI-simulated applause or jeers reflect audience response
- Fact-Check Phase → Moderator verifies answers against prior statements
      `
    },
    {
      id: "14-debate",
      type: "write",
      prompt: `
### 📝 Task – Multi-Question Debate
Scenario: Participate in the AI-simulated debate.
- Task: Respond to 20–25 questions (typed or speech-to-text):
  1. Policy-focused questions
  2. Ethical or controversial issues
  3. Real-time rebuttals and challenges

Evaluation: AI assesses clarity, persuasiveness, composure, consistency, and voter approval impact.
      `
    },
    {
      id: "14-outcome",
      type: "read",
      prompt: `
### 📊 Module 14 Outcome
- Debate performance significantly affects voter approval, credibility, and campaign momentum
- Candidate demonstrates ability to manage high-pressure, live interactions while staying aligned with campaign identity
- CC and signatures may be updated based on debate effectiveness
- Prepares candidate for final summary and outcome assessment in Module 15

Next Module: Module 15 – Final Summary (Post-Debate), compiling campaign results and delivering narrative outcomes.
Reference: [Candidate Simulator Master Roadmap – Module 14](https://www.bernardjohnson4congress.com/general_election_cycle_november_2_test_mode)
      `
    },
  ],
};

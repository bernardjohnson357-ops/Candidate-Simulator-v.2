import { Module } from "@/app/ai/types";

export const module15: Module = {
  id: "module-15",
  title: "Final Summary (Post-Debate)",
  description: `
**Narrator [calm, professional]:**
"The campaign has reached its conclusion. This final module compiles your actions, decisions, and outcomes, providing a comprehensive reflection on your journey. By reviewing your performance, you’ll see how strategy and choices shaped your results."
  `,
  tasks: [
    {
      id: "15-reading",
      type: "read",
      prompt: `
### 🎯 Purpose
Provide closure and reflection by:
- Reviewing Candidate Coins (CC), signatures, and voter approval
- Assessing strategic decisions, strengths, and weaknesses
- Delivering a narrative summary of the campaign outcome

This module emphasizes learning from campaign choices and outcomes.

### 📝 Reading Summary
A final summary consolidates your campaign across all modules:

1. Candidate Stats
  - Final CC tally
  - Final signatures / voter approval percentage
  - Major spending and investment decisions

2. Path Taken
  - Independent or Party branch
  - Key turning points: endorsements, petitions, debates, strategic moves

3. Strengths & Weaknesses
  - Communication clarity
  - Ethical judgment
  - Fundraising effectiveness
  - Consistency in messaging

Final Outcome Categories:
- Victory → Above 50% voter approval (elected to office)
- Competitive Candidate → 35–49% (strong showing, viable future potential)
- Spoiler Role → 20–34% (influenced the race, not competitive)
- Symbolic Voice → Below 20% (minimal support, message-focused campaign)
      `
    },
    {
      id: "15-reflection",
      type: "write",
      prompt: `
### 📝 Task – Candidate Reflection
Scenario: Reflect on your campaign journey.
- Task: Write a 2–3 paragraph reflection on:
  - Key decisions and turning points
  - Lessons learned from successes and mistakes
  - How your choices influenced voter approval

Evaluation: AI synthesizes results into a narrative outcome based on voter approval and performance.
      `
    },
    {
      id: "15-outcome",
      type: "read",
      prompt: `
### 📊 Module 15 Outcome
- Comprehensive campaign statistics compiled
- Narrative summary and performance assessment delivered
- Reinforces understanding of how strategy, compliance, messaging, and engagement drive electoral results
- Marks the end of the Candidate Simulator experience

Reference: [Candidate Simulator Master Roadmap – Module 15](https://www.bernardjohnson4congress.com/general_election_cycle_final_summary_test_mode)

### 🎬 Closing Narrator Script
**Narrator [calm, reflective, then warm]:**
"Your campaign has reached its end. Every choice you made—from petitions and fundraising, to debates and final strategy—shaped the outcome you see today. Campaigns are not only about victory, but about voice, vision, and the lessons carried forward."
**[pause – softer tone]**
"Whether you won the seat, influenced the race, or stood as a symbolic voice, your journey reflects the real challenges every candidate faces. Every endorsement weighed, every voter conversation, every moment of pressure under the lights mattered."
**[pause – uplifting tone]**
"As you leave this simulator, consider the deeper purpose: campaigns are about people, principles, and persistence. In the end, the measure of leadership is not only counted in votes, but in the strength of your message and the trust you earn."
**[pause – closing]**
"Thank you for participating in the Federal Candidate Simulator. Your campaign is complete… but your political journey has only just begun."
      `
    }
  ],
};

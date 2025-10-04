import { Module } from "@/app/ai/types";

export const module10: Module = {
  id: "module-10",
  title: "Election Countdown: Final Interactions",
  description: `
**Narrator [calm, professional]:**
"With less than two weeks until Election Day, every interaction matters. This module focuses on high-pressure constituent engagement, town halls, and last-minute strategic decisions. Clarity, persuasion, and responsiveness are critical."
`,
  tasks: [
    {
      id: "10-reading",
      type: "read",
      prompt: `
### 🎯 Purpose
Prepare candidates for final campaign interactions by:
- Hosting live town halls
- Responding to constituent questions under pressure
- Making strategic last-minute decisions affecting CC, signatures, and voter approval

This stage reinforces decision-making under time constraints and maintaining campaign identity until the very end.

### 📝 Reading Summary
Key skills for the final week include:
1. Rapid assessment of weekly news → Spot threats and opportunities quickly.
2. Engaging live with constituents → Use typed or speech-to-text input effectively.
3. Resource allocation for final push → Decide which campaign actions maximize impact.

**Weekly Campaign Briefing Example:**
- Opposition Research → Opponent under investigation; past controversies emerging
- Constituent Sentiment → Undecided voters monitoring final communications
- Media Updates → Rapid news cycles, social media amplification of candidate statements
      `
    },
    {
      id: "10-news-summary",
      type: "read",
      prompt: `
### 📰 Texas Weekly Headliner (Oct 23–29)

**World News**
- Trade Retaliation: European nations join Canada in issuing 35% tariffs on U.S. goods. Mexico mediates tensions.
- Middle East Conflict: Saudi Arabia and Iran continue missile exchanges; death toll nearing 500.
- Seismic Activity: Chile earthquake may signal increased activity along the “Ring of Fire.”

**National News**
- Political Endorsements: President expected to announce key endorsements.
- Gun Safety Tragedy: Toddler death from unsecured firearm heightens debate.
- Flood Fund Scrutiny: D.C. politician investigated over Texas flood relief handling.
- Second Amendment Debate: Gun safety dominates national discussion.

**Texas Updates**
- Voter Sentiment: Undecided voters increasingly lean third-party/independent.
- School Safety: Wild hogs disrupted junior varsity football game; firearm discussion ongoing.
- Protests & Public Order: Mostly calmed; residual tension remains.
- Social Politics: Some conservatives shifting support due to transgender politician announcement.
      `
    },
    {
      id: "10-townhall",
      type: "write",
      prompt: `
### 📝 Candidate Challenge – October 23–29
Host a live town hall with constituents from across Texas.

**Task:** Respond via speech-to-text or typed input with empathy, clarity, and leadership.

**Constituent Questions:**
1. Ms. Gutierrez (Retired Nurse, El Paso): Prescription costs and tariffs—how will you protect seniors?
2. Mr. Wilson (Local Grocer, Austin): Tariffs and business costs—how will Texas businesses remain competitive?
3. Mrs. Lee (Parent, Dallas): Toddler gun accident—what steps for gun safety?
4. Jamal (Junior, Midville High): Wild hogs/school safety—how to protect students safely?
5. Ms. Robinson (Flood Survivor, Houston): Ensure relief funds reach those in need?
6. Rev. Daniels (Pastor, Tyler): Protecting religious freedoms while balancing other rights?
7. Ms. Kim (Undecided Voter, San Antonio): Why should I trust you over usual politicians?

**Evaluation:** AI assesses clarity, persuasiveness, constituent concern handling, and voter approval impact.
      `
    },
    {
      id: "10-strategic-decisions",
      type: "write",
      prompt: `
### Scenario – Final Strategic Decisions
Allocate remaining Candidate Coins (CC) for maximum effect in the final days:
- Decide on last-minute ads, volunteer pushes, or outreach events
- Adjust messaging based on town hall feedback
- Prioritize actions that reinforce voter trust and visibility

**Task:** Write a 1–2 paragraph explanation of your final strategic decisions.

**Outcome:** CC, voter approval, and campaign impact updated accordingly.
      `
    },
    {
      id: "10-outcome",
      type: "read",
      prompt: `
### 📊 Module 10 Outcome
- Town hall interactions evaluated → Voter approval updated
- Strategic final push decisions tracked → CC and campaign effectiveness updated
- Candidate demonstrates final-week readiness, clear messaging, and tactical decision-making under high-pressure conditions

**Next Module:** Module 11 – School Visit, beginning the official Election Week simulations with multi-stakeholder interactions and real-time dialogue.

References:
- [General Election October 23–29 – Simulator Test Mode](https://www.bernardjohnson4congress.com/general_election_cycle_october_23_29_test_mode)
- Town Hall Interaction Page: [Link](https://www.bernardjohnson4congress.com/general_election_cycle_october_23_29_b_test_mode)
      `
    },
  ],
};

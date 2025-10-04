import { Module } from "@/app/ai/types";

export const module7: Module = {
  id: "module-7",
  title: "Early October: Campaign Operations",
  description: `
**Narrator [calm, professional]:**
"With September compliance behind you, your campaign enters early October operations. Time is short, and every decision counts. This module focuses on team management, messaging, and constituent engagement, preparing you for the final stretch before Election Day."
`,
  tasks: [
    {
      id: "7-reading",
      type: "read",
      prompt: `
### 🎯 Purpose
Execute early October campaign operations while practicing:
- Communication skills (typed or speech-to-text)
- Strategic decision-making
- Constituent engagement and responsiveness

Candidates now begin applying their campaign identity and imagery in real-world-inspired interactions.

### 📝 Reading Summary
**Narrator [neutral, instructive]:** "Early October requires candidates to:"
1. Assess weekly news and campaign context → Identify opportunities and risks.
2. Prioritize constituent concerns → Focus on clarity, empathy, and persuasiveness.
3. Deploy resources effectively → Decide which team members or campaign materials to use in various scenarios.

**Weekly Campaign Briefing Example:**
- Opposition Research → Incumbent leads by 15%, small-dollar donations rising.
- Constituent Sentiment → Community safety top concern after wild hog incident.
- Media Updates → Local TV and social channels reporting on candidate events.

💡 Tip: Your spoken or written responses directly influence voter approval and demonstrate leadership under time pressure.
      `
    },
    {
      id: "7-texas-news",
      type: "read",
      prompt: `
### 📰 Texas Weekly Headliner
**World News**
- Gaza Demographics: Population dropped from 2 million to 750,000 (Oct 2023–Oct 2026). Debate continues over military involvement.
- International Intelligence: U.S. satellites report possible Chinese facilitation of nuclear weapon shipments from North Korea to Iran via the Strait of Hummus.

**National News**
- Earthquake in Los Angeles: 6.2 magnitude; minimal damage, no injuries.
- Capitol Security: U.S. Capitol evacuated after a threat; investigation ongoing.
- Milestone for Inclusive Athletics: First transgender sports league launches nationwide.

**Around Texas**
- Electoral Representation: Many Texans feel underrepresented due to gerrymandering and migration trends.
- School Safety: Wild hogs injured children at an elementary school; one tested positive for rabies.
- Retiree Relief: Affluent donors praise federal tax legislation easing healthcare costs.
- Debate Rumors: Major debate anticipated between the incumbent and a third-party newcomer—polls indicate a close race.
- Weather Watch: Early winter and increased precipitation expected.
- Transgender Soccer League: Teams from Killeen, Abilene, Waco, Tyler, Nacogdoches, and Beaumont compete in the inaugural season.
      `
    },
    {
      id: "7-speech",
      type: "write",
      prompt: `
### 📝 Candidate Challenge – October 1–7
The spotlight is on you. Prepare and deliver an inspiring speech to the community that:
- Reassures families after recent events
- Addresses public concerns about safety and leadership
- Demonstrates your ability to lead with clarity and compassion

**Task:** Prepare a 1–2 paragraph speech addressing constituent concerns.  
**Input:** Users may type or use speech-to-text.  
**Evaluation:** AI assesses clarity, persuasiveness, alignment with campaign identity, and projected voter impact.
      `
    },
    {
      id: "7-team-management",
      type: "write",
      prompt: `
### Scenario – Team Management
Your campaign team is active, but assignments must be optimized.

**Task:** Allocate resources or team members to specific early October priorities (e.g., canvassing, volunteer coordination, social media).  
**Evaluation:** AI evaluates effectiveness of allocation, strategic reasoning, and impact on campaign operations.
      `
    },
    {
      id: "7-news-response",
      type: "write",
      prompt: `
### Scenario – Weekly News Response
Recent events require quick messaging adjustments. Choose how to respond to:
- A local controversy involving public safety
- Media coverage of the opponent’s minor misstep
- Community feedback on your campaign imagery

**Task:** Write a 2–3 paragraph response for public messaging.  
**Outcome:** Voter approval and engagement are updated based on alignment, tone, and responsiveness.
      `
    },
    {
      id: "7-outcome",
      type: "read",
      prompt: `
### 📊 Module 7 Outcome
- Candidate speech and messaging assessed → Voter approval updated
- Team allocation and operational decisions tracked → CC and resource effectiveness updated
- Candidate demonstrates early October readiness: clear communication, strategic thinking, and campaign management under short timelines

**Next Module:** Module 8 – Mid-October Operations, focusing on press engagement, high-pressure messaging, and refining campaign responses leading into the final three weeks before Election Day.

Reference: [General Election October 1–7 – Simulator Test Mode](https://www.bernardjohnson4congress.com/general_election_cycle_october_1_7_test_mode)
      `
    },
  ],
};

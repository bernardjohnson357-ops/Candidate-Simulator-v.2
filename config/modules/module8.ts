import { Module } from "@/app/ai/types";

export const module8: Module = {
  id: "module-8",
  title: "Mid-October: Press & Messaging",
  description: `
**Narrator [calm, professional]:**
"As Election Day approaches, mid-October focuses on press engagement and high-pressure communication. Candidates must maintain clarity, consistency, and voter trust while responding to evolving news and constituent concerns."
`,
  tasks: [
    {
      id: "8-reading",
      type: "read",
      prompt: `
### 🎯 Purpose
Practice mid-October campaign communications and press interactions by:
- Delivering clear, persuasive messages to the public
- Responding to media and constituent inquiries under pressure
- Refining messaging based on weekly news and campaign developments

This module reinforces message consistency, authenticity, and voter engagement.

### 📝 Reading Summary
Key mid-October skills include:
1. Analyzing weekly news and campaign insights → Identify opportunities to strengthen voter approval.
2. Preparing for press and public statements → Ensure messaging aligns with your campaign identity and values.
3. Responding under pressure → Adapt quickly while maintaining clarity and credibility.

**Weekly Campaign Briefing Example:**
- Opposition Research → Incumbent surges after recent attack; small-dollar donations rising.
- Constituent Sentiment → Residents uncertain about rhetoric; mixed reactions to opponent’s statements.
- Media Updates → Local news and social channels reporting rapidly on campaign events.
      `
    },
    {
      id: "8-news-summary",
      type: "read",
      prompt: `
### 📰 Texas Weekly Headliner (Oct 8–14)

**World News**
- Gaza Crisis: European leaders express deep concern over Gaza, debating possible military intervention.
- Nuclear Developments: Intelligence confirms China is shipping nuclear weapons to Iran; satellite imagery shows launchers arriving, potentially operational within a week.
- Global Boycott Calls: Canadian officials advocate a worldwide boycott of nations supporting Israel.

**National News**
- Capitol Shooting: A member of Congress was shot leaving their office; condition unknown. Authorities believe politically motivated.
- Transgender Soccer League Violence: Texas’ inaugural transgender soccer league faced disruption; athlete recovering.
- U.S.-Israel Relations: U.S. leaders pledge support for Israel and warn of potential military response if Iran acts aggressively.

**Texas Updates**
- Voter Priorities: Polls indicate strong local support for Israel; top concerns include gun rights, immigration, and school safety.
- School Safety Debates: Advocacy groups lobby for legislation allowing staff to carry shotguns on campus.
- Healthcare Law Reactions: Mixed feedback; praised for aiding middle-class and elderly, criticized for favoring “elites.”
- Recovery & Support: Wounded politician expected to be discharged soon; federal relief sought for flood-affected counties.
- Transgender Soccer League Resilience: Officials issue statements emphasizing resilience, equal rights, school safety, and healthcare reform.
      `
    },
    {
      id: "8-press-conference",
      type: "write",
      prompt: `
### 📝 Task – Press Conference Statement
You are holding a press conference to address top community concerns.

**Task:** Prepare an opening statement (typed or speech-to-text) covering:
- Key issues identified in the weekly briefing
- Alignment with your campaign identity
- Persuasive and clear messaging for diverse audiences

**Evaluation:** AI assesses clarity, persuasiveness, tone, and voter approval impact.
      `
    },
    {
      id: "8-messaging-adjustment",
      type: "write",
      prompt: `
### Scenario – Messaging Adjustment
Mid-October news may require quick adaptation. Options include:
- Responding to a local policy controversy
- Highlighting your campaign’s achievements or positions
- Countering opponent messaging without overreacting

**Task:** Write a 2–3 paragraph response, showing strategic alignment with campaign goals.

**Outcome:** Voter approval and campaign credibility updated based on messaging effectiveness.
      `
    },
    {
      id: "8-constituency-engagement",
      type: "write",
      prompt: `
### Scenario – Constituency Engagement
Engage with constituents who express concerns or questions via email, social media, or in-person events.

**Task:** Respond with a clear, authentic 2–3 paragraph message.  
**Evaluation:** AI evaluates alignment with campaign identity, clarity, and persuasive communication.
      `
    },
    {
      id: "8-outcome",
      type: "read",
      prompt: `
### 📊 Module 8 Outcome
- Press conference and messaging responses evaluated → Voter approval updated
- Mid-October constituency engagement tracked → CC and resource effectiveness updated
- Candidate demonstrates ability to maintain clarity and credibility under evolving, high-pressure conditions

**Next Module:** Module 9 – Final Push (October 15–22), focusing on real-time media appearances, live messaging, and preparation for final campaign week.

Reference: [General Election October 8–14 – Simulator Test Mode](https://www.bernardjohnson4congress.com/general_election_october_8_14_test_mode)
      `
    },
  ],
};

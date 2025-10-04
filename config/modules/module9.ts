import { Module } from "@/app/ai/types";

export const module9: Module = {
  id: "module-9",
  title: "Final Push: Live Media & Messaging",
  description: `
**Narrator [calm, professional]:**
"The final push begins. With just a few weeks before Election Day, your campaign focuses on live media appearances, rapid-response messaging, and reinforcing voter support. Every interaction is amplified, and mistakes are costly."
`,
  tasks: [
    {
      id: "9-reading",
      type: "read",
      prompt: `
### 🎯 Purpose
Prepare for the critical final stretch by:
- Engaging in live media scenarios
- Responding under tight time constraints
- Refining clarity, persuasiveness, and voter trust

This module emphasizes real-time decision-making and consistent messaging.

### 📝 Reading Summary
Final push skills require:
1. Analyzing current news and campaign developments → Identify threats and opportunities.
2. Crafting concise, impactful statements → Ensure every word supports your campaign identity.
3. Delivering real-time responses → Typed or speech-to-text input must be clear and persuasive.

**Weekly Campaign Briefing Example:**
- Opposition Research → Opponent introduces new legislation; small protests occur.
- Constituent Sentiment → Voters paying close attention to messaging and responsiveness.
- Media Updates → Podcasts, local TV, and social platforms amplify statements quickly.
      `
    },
    {
      id: "9-news-summary",
      type: "read",
      prompt: `
### 📰 Texas Weekly Headliner (Oct 15–22)

**World News**
- Sanctions & Trade: European and Canadian leaders have sanctioned the U.S. over support for Israel; trade restrictions now impact U.S. businesses.
- Middle East Escalation: Iran attacked Saudi Arabia, triggering missile exchanges causing over 100 fatalities; U.S. urged to intervene.
- Natural Disasters: Earthquake in Indonesia prompted tsunami warnings; minor flooding occurred.

**National News**
- Open-Carry Legislation: New law proposes open-carry for all federal lawmakers in D.C.
- Trade Tensions: President proposes 25% tariff on Canadian goods.
- Transgender Advocacy & Safety: Politician publicly came out as transgender after stabbing incident; advocates for ending violence and open-carry legislation.
- Gun Sales Surge: Rising national sentiment for self-protection reflected in firearm purchases.

**Texas Updates**
- Shifting Polls: Third-party/independent candidate support rising.
- School Safety Incident: Former student apprehended with rifle citing past bullying.
- Protests & Public Sentiment: Demonstrations against new legislation; social media shows voter distrust of incumbents.
- Flood Relief Recognition: Texans praise representatives for securing federal aid.
      `
    },
    {
      id: "9-podcast",
      type: "write",
      prompt: `
### 📝 Candidate Challenge – October 15–22
🎙️ Participate in a simulated live one-hour podcast.

**Task:**
1. Prepare an introduction and brief campaign statement (typed or speech-to-text).
2. Respond to the following 15 questions:
   1. Reaction to escalating tensions between Iran and Saudi Arabia.
   2. Sanctions by European/Canadian leaders—impact on American families/businesses?
   3. Should America intervene in Middle East missile exchanges?
   4. How should natural disasters shape U.S. foreign policy and aid?
   5. Open-carry legislation for federal lawmakers—safety or escalation?
   6. 25% tariff on Canadian goods—impact on Americans, personal perspective?
   7. Transgender politician and soccer league incident—LGBTQ+ rights and gun laws?
   8. Firearm purchases rising—why, and your stance?
   9. Rising third-party/independent support—lasting shift or protest?
   10. School rifle incident—balancing mental health and security?
   11. Protests over new legislation—what drives anger/distrust?
   12. Flood relief—what does effective disaster response look like?
   13. Opponent recognition for disaster aid and open-carry—how do you differentiate?
   14. FBI warns lawmakers—biggest threat to democratic elections?
   15. One message/story for voters.

**Evaluation:** AI assesses clarity, persuasion, voter approval impact; live broadcast time pressure simulated.
      `
    },
    {
      id: "9-rapid-messaging",
      type: "write",
      prompt: `
### Scenario – Rapid Messaging Responses
Unexpected news events require immediate statements:
- Economic or policy updates
- Opponent missteps
- Constituent concerns or petitions

**Task:** Write or deliver a 2–3 paragraph statement addressing these events while maintaining alignment with your campaign identity.

**Outcome:** Voter approval and credibility updated based on messaging effectiveness.
      `
    },
    {
      id: "9-constituency-engagement",
      type: "write",
      prompt: `
### Scenario – Constituent Engagement
Respond to last-minute constituent questions via social media or email.

**Task:** Compose concise, persuasive responses that reinforce your campaign identity.
**Evaluation:** AI evaluates clarity, alignment, and voter trust impact.
      `
    },
    {
      id: "9-outcome",
      type: "read",
      prompt: `
### 📊 Module 9 Outcome
- Live media performance evaluated → Voter approval updated
- Rapid-response messaging tracked → CC and campaign credibility adjusted
- Candidate demonstrates ability to perform under time pressure, maintain messaging consistency, and influence voter support

**Next Module:** Module 10 – Election Countdown (October 23–29), focusing on final interactions, high-pressure town halls, and strategic last-minute decisions.

References:
- [General Election October 15–22 A – Simulator Test Mode](https://www.bernardjohnson4congress.com/general_election_october_15-22_a_test_mode)
- Task Link: [Podcast Interaction](https://www.bernardjohnson4congress.com/general_election_october_15-22_b_test_mode)
      `
    },
  ],
};

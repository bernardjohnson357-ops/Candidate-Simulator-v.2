import { Module } from "@/app/ai/types";

export const module3: Module = {
  id: "module-3",
  title: "May: First Moves",
  content: `
**Narrator [calm, professional]:**
"Congratulations — you’ve completed your filing requirements. You are now officially a candidate in the eyes of both the State of Texas and the Federal Election Commission. Now the real campaign begins."

### 🎯 Purpose
**Narrator [neutral]:**
"Establish your campaign’s foundation by making your first major investments and showing your ability to think strategically."

### 📝 Reading Summary
**Narrator [neutral, instructive]:**
"In the first month after filing, real candidates make their earliest investments. This is when voters, donors, and the media decide if you’re serious. You must choose one strategic path for your campaign:"

1. **Fundraising Strategy** → Build a plan to raise money.
2. **Volunteer Base** → Recruit and organize people to support you.
3. **Media & Advertising** → Announce yourself through press, social media, or ads.

**Narrator [neutral]:**
"At this stage, every candidate must also make basic campaign purchases to prove legitimacy — like a website, email system, and campaign tools. That’s where the Candidate Coin Store comes in."

### 🛒 Candidate Coin Store
- Website / Domain / Email → 7 CC
- Explorer Pack (1 month tools) → 5 CC
- Navigator Pack (2 months tools) → 8 CC
- Settler Pack (3 months tools) → 12 CC
- Colonist Pack (4 months tools) → 18 CC
- Revolutionist Pack (5 months tools) → 24 CC
- Founder Pack (6 months tools) → 30 CC
- Digital Ads (per month) → 2–12 CC
`,
  tasks: [
    {
      id: "3-strategy-choice",
      type: "writing",
      prompt: `
**Narrator [serious]:**
"You must choose one of the following strategic paths and write your implementation plan."

Options:
- 📈 Fundraising Strategy
- 🧑‍🤝‍🧑 Volunteer Base
- 📺 Media & Advertising

---

If you choose **Fundraising Strategy**, include:
- How much you want to raise
- The methods you’ll use (events, calls, online appeals)
- How you’ll measure success

If you choose **Volunteer Base**, include:
- Where volunteers will come from
- How you’ll keep them engaged
- What role they’ll play in your campaign

If you choose **Media & Advertising**, include:
- Which platforms you’ll focus on (social media, local press, TV)
- How much you’ll spend on ads
- Why your plan is cost-effective
`,
    },
  ],
  outcomeExample: `
**Narrator [neutral, after user submits]:**
"Because you chose Media & Advertising and purchased a Website (7 CC) and Explorer Pack (5 CC), you spent 12 CC total."

- Starting CC: 51
- Purchases: –12
- New Balance: 39 CC
- Strategic Plan Quality: [AI evaluates clarity]
- Bonus: +50 signatures (for detailed, well-structured plan)

**Updated Totals:**
- CC: 39
- Signatures: 160
- Voter Approval: 1.6%

**Narrator [neutral]:**
"Your first moves have shaped your campaign identity. Next, you’ll move into Module 4 – Campaign Identity, where you’ll define your slogan, mission, and issues while expanding your campaign presence."
`,
};

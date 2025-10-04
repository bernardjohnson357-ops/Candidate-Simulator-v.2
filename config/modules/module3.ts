import { Module } from "@/app/ai/types";

export const module3: Module = {
  id: "module-3",
  title: "May: First Moves",
  description: `
**Narrator [calm, professional]:**
"Congratulations — you’ve completed your filing requirements. You are now officially a candidate in the eyes of both the State of Texas and the Federal Election Commission. Now the real campaign begins."
`,
  tasks: [
    {
      id: "3-strategy-choice",
      type: "write",
      prompt: `
### 🎯 Purpose
**Narrator [neutral]:** "Establish your campaign’s foundation by making your first major investments and showing your ability to think strategically."

### 📝 Reading Summary
**Narrator [neutral, instructive]:** "In the first month after filing, real candidates make their earliest investments. This is when voters, donors, and the media decide if you’re serious. You must choose one strategic path for your campaign:"
- Fundraising Strategy
- Volunteer Base
- Media & Advertising

### Candidate Coin Store
**Narrator [neutral]:** "Spend from your CC balance to establish your infrastructure:"
- Website / Domain / Email → 7 CC
- Explorer Pack (1 month tools) → 5 CC
- Navigator Pack (2 months tools) → 8 CC
- Settler Pack (3 months tools) → 12 CC
- Colonist Pack (4 months tools) → 18 CC
- Revolutionist Pack (5 months tools) → 24 CC
- Founder Pack (6 months tools) → 30 CC
- Digital Ads (per month) → 2–12 CC

**Task:** Choose a strategic path and write your implementation plan.
`
    },
    {
      id: "3-outcome",
      type: "read",
      prompt: `
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
`
    },
  ],
};

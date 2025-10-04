import { Module } from "@/app/ai/types";

export const module5: Module = {
  id: "module-5",
  title: "July & August: Campaign Imagery",
  description: `
**Narrator [calm, professional]:**
"Now that your campaign identity is clear, it’s time to show your face to the public. Voters respond not just to words, but to visual branding — logos, signs, T-shirts, and other materials. Your campaign imagery communicates professionalism, values, and energy."
`,
  tasks: [
    {
      id: "5-reading",
      type: "read",
      prompt: `
### 🎯 Purpose
**Narrator [neutral]:** "Develop the visual identity of your campaign: logo, color palette, slogans, and materials like yard signs, bumper stickers, T-shirts, and buttons. This stage helps voters recognize and remember your campaign."

### 📝 Reading Summary
**Narrator [neutral, instructive]:** "Campaign imagery works alongside your verbal identity. Three key principles:"
1. Consistency → Fonts, colors, slogans, and images reinforce your campaign identity.
2. Clarity → Signs and materials must be readable and memorable.
3. Authenticity → Images should feel genuine and aligned with your values.

Examples:
- Logo → Simple, professional, memorable
- Yard signs → High-contrast, easy to read
- T-shirts / Buttons → Eye-catching, wearable messages
- Digital graphics → Suitable for social media

"Materials should support your slogan and mission from Module 4. The AI will evaluate your designs for alignment, clarity, and visual impact."
`
    },
    {
      id: "5-design",
      type: "write",
      prompt: `
### 📝 Task – Create & Upload Visuals
Choose one or more of the following and describe or upload your design:
1. Logo Design
2. Yard Sign or Poster
3. T-Shirt or Button
4. Optional Bonus: Additional materials (stickers, social media graphics, etc.)

The AI will evaluate:
- Visual consistency with campaign identity → +10 CC
- Readability & impact → +20 CC
- Authenticity & alignment with mission/slogan → +30 CC
`
    },
    {
      id: "5-endorsement",
      type: "write",
      prompt: `
### Scenario – Endorsement Dilemma
A small advocacy group offers an endorsement and promotional materials. You must decide:
- Accept → Gain exposure, increase voter approval, but risk alienating some supporters
- Decline → Maintain consistency with values, no immediate voter boost

Write your decision and reasoning (1–2 paragraphs). The AI will update CC and voter approval based on strategic alignment.
`
    },
    {
      id: "5-petition",
      type: "write",
      prompt: `
### Scenario – Petition Decision
You are asked to sign a petition: 'End War in Gaza.'
Decide whether to sign or decline and explain your reasoning (1 paragraph).
The AI evaluates clarity, consistency with values, and public messaging impact.
`
    },
    {
      id: "5-legislation",
      type: "write",
      prompt: `
### Scenario – Legislative Response
An opponent passed controversial legislation (e.g., tax cuts favoring the wealthy, cuts to student food programs). A prominent national leader endorsed the policy.
Write a 3–5 paragraph statement addressing your stance, reflecting your campaign identity and messaging consistency.
The AI evaluates coherence, persuasive clarity, and alignment with your mission.
`
    },
    {
      id: "5-outcome",
      type: "read",
      prompt: `
### 📊 Module 5 Outcome
- Campaign visuals uploaded or explained and evaluated
- CC updated based on design quality and scenario responses
- Voter approval adjusted based on endorsement, petition, and legislative response
- Candidate demonstrates ability to expand campaign visibility while staying true to identity

**Narrator [neutral]:**
"Next Module: Module 6 – September Compliance, where candidates simulate FEC quarterly filing and continue strategic decision-making under compliance constraints."
Reference: [General Election July & August – Simulator Test Mode](https://www.bernardjohnson4congress.com/general_election_cycle_july_and_august_test_mode)
`
    },
  ],
};

import { Module } from "@/app/ai/types";

export const module4: Module = {
  id: "module-4",
  title: "June: Campaign Identity",
  description: `
**Narrator [calm, professional]:**
"Your campaign has begun to take shape. You’ve made your first investments, but now you must define who you are as a candidate. Voters, donors, and the media are asking: ‘Why are you running, and why should anyone support you?’"
`,
  tasks: [
    {
      id: "4-reading",
      type: "read",
      prompt: `
### 🎯 Purpose
**Narrator [neutral]:** "Create a clear campaign identity: your slogan, mission, and core message. These elements will guide everything else you do."

### 📝 Reading Summary
**Narrator [neutral, instructive]:** "Campaign identity is built on three pillars:"
1. Slogan → Short, memorable, and values-driven.
   - Example: ‘A Future We Can Believe In.’
   - Example: ‘Country First.’
2. Mission Statement → One paragraph explaining why you’re running.
   - Who you represent
   - What problem you’ll solve
   - Why now
3. Announcement Speech → A brief message to launch your candidacy publicly.
   - Should include your slogan
   - Should highlight your top issues
   - Must feel authentic and motivating
`
    },
    {
      id: "4-slogan",
      type: "write",
      prompt: `
### 📝 Task – Campaign Slogan
Write your campaign slogan (1 sentence). Focus on clarity, memorability, and values alignment.
`
    },
    {
      id: "4-mission",
      type: "write",
      prompt: `
### 📝 Task – Mission Statement
Write your mission statement (1 paragraph). Include who you represent, what problem you’ll solve, and why now.
`
    },
    {
      id: "4-speech",
      type: "write",
      prompt: `
### 📝 Task – Announcement Speech
Draft your announcement speech (3–5 paragraphs), including your slogan and top issues. Ensure it feels authentic and motivating.
`
    },
    {
      id: "4-outcome",
      type: "read",
      prompt: `
### 📊 Module 4 Outcome
**Narrator [neutral, after submission]:**
"Here’s what you created:"
- Slogan: ‘New Voices, Real Change.’
- Mission Statement: ‘I’m running for Congress to give working families a fair shot, protect voting rights, and ensure government serves the people — not the insiders.’
- Announcement Speech: (User’s draft)

**AI Evaluation:**
- Slogan → Clear and memorable → +10 signatures
- Mission Statement → Focused and values-driven → +20 signatures
- Announcement Speech → Well-structured and authentic → +50 signatures

**Totals Awarded:** +80 signatures
**Updated Campaign Status:**
- CC: 39
- Signatures: 240
- Voter Approval: 2.4%

**Narrator [neutral]:**
"Your campaign identity is now established. Next, move into Module 5 – Campaign Imagery, where you’ll design your campaign’s visual look through logos, signs, and shirts. This is the first time you’ll upload images into the simulator."
`
    },
  ],
};

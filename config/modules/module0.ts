// ./config/modules/module0.ts
import { Module } from "@/app/ai/types";

export const module0: Module = {
  id: "0",
  title: "Orientation & Introduction",
  content: `# 🗳 Module 0 – Orientation & Introduction

**Narrator [calm, professional]:** “Welcome to the Federal Candidate Simulator — AI Edition. This simulator will take you through the entire election cycle, one step at a time. You’ll experience the real requirements of filing, fundraising, compliance, and campaigning — all safely in a simulation.”

## How the Simulator Works
**Narrator [neutral]:** “Here are the ground rules. Think of them as your campaign manual.”

1. **Candidate Coins (CC)**
   - 1 CC = $100 simulated
   - You start with 50 CC
   - Earn CC by passing quizzes or completing tasks
   - Spend CC on campaign needs like filing fees, ads, or communication coaching

2. **Signatures & Voter Approval**
   - Each quiz score = the same number of signatures
   - 100 signatures = 1% voter approval
   - Example: scoring 80% on a quiz = 80 signatures = 0.8% approval

3. **Ballot Access**
   - You must qualify for the ballot by:
     - Paying CC (filing fee) AND
     - Gathering enough signatures (through quizzes and tasks)

4. **Eligibility thresholds**
   - President → 75 CC + 2.5% approval
   - Senate → 50 CC + 2.5% approval
   - House → 31 CC + 2.5% approval

5. **Task Types**
   - Read: Summaries of laws, filing guides, or news
   - Write: Announcements, strategy documents, responses
   - Upload: Images (Module 5 – signs, T-shirts, bumper stickers)
   - Speak: Speeches, press conferences, debates (Modules 7+)
   - Some decisions appear as chat buttons. Click to choose your action

6. **Feedback & Progress**
   - After each task, I’ll update your CC, signatures, and approval
   - I’ll narrate consequences: “Because you chose X, Y happened.”
   - All choices and scores carry forward — just like a real campaign

## Your First Step
**Narrator [encouraging]:** “Now it’s time to make your first campaign decision: which office are you running for? This choice determines how tough the road ahead will be.”

- 🏛 President (75 CC + 2.5% approval)
- 🏛 U.S. Senate (50 CC + 2.5% approval)
- 🏛 U.S. House (31 CC + 2.5% approval)

### Transition After Office Choice
**Narrator [explanatory]:** “You’ve declared for the [chosen office]. Here’s what that means:
- You’ll need [XX CC + 2.5% approval] for this path.

You’re starting with 50 CC and 0% approval. Every quiz and scenario will build your support.
Now, before you can even think about campaigning, you must file properly. This is where every real candidate begins.”
`,
  tasks: [
    { id: "0-1", type: "read", prompt: "Read the campaign manual and scoring system." },
    { id: "0-2", type: "write", prompt: "Declare which office you are running for." },
    { id: "0-3", type: "speak", prompt: "Optionally speak your choice of office." },
    { id: "0-4", type: "upload", prompt: "Optionally upload a campaign-related image." },
  ],
};

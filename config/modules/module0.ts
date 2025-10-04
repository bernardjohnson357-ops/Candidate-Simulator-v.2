// ./config/modules/module0.ts
import { Module, Task } from "@/app/ai/types";

export const module0: Module = {
  id: "0",
  title: "Orientation & Introduction",
  content: `
# 🗳 Module 0 – Orientation & Introduction
**Narrator [calm, professional]:** “Welcome to the Federal Candidate Simulator — AI Edition. This simulator will take you through the entire election cycle, one step at a time. You’ll experience the real requirements of filing, fundraising, compliance, and campaigning — all safely in a simulation.”

## How the Simulator Works
1. Candidate Coins (CC)
   - 1 CC = $100 simulated.
   - Start with 50 CC.
   - Earn CC by passing quizzes or completing tasks.
   - Spend CC on campaign needs like filing fees, ads, or communication coaching.

2. Signatures & Voter Approval
   - Each quiz score = same number of signatures.
   - 100 signatures = 1% approval.
   - Example: scoring 80% on a quiz = 80 signatures = 0.8% approval.

3. Ballot Access
   - Pay CC (filing fee) AND gather enough signatures.

4. Eligibility thresholds:
   - President → 75 CC + 2.5% approval
   - Senate → 50 CC + 2.5% approval
   - House → 31 CC + 2.5% approval

5. Task Types
   - Read, Write, Speak, Upload

6. Feedback & Progress
   - After each task, CC, signatures, and approval are updated.
`,
  tasks: [
    { id: "0-read", type: "read", prompt: "Read the campaign manual and scoring system." },
    { id: "0-write", type: "write", prompt: "Declare which office you are running for." },
    { id: "0-speak", type: "speak", prompt: "Optionally speak your choice of office." },
    { id: "0-upload", type: "upload", prompt: "Optionally upload a campaign-related image." },
  ],
};

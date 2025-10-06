import { Module } from "@/app/ai/types";

export const module0: Module = {
  id: "0",
  title: "Orientation & Introduction",
  description: `
# 🗳 Module 0 – Orientation & Introduction

**Narrator [calm, professional]:**  
"Welcome to the Federal Candidate Simulator — AI Edition. This simulator will take you through the entire election cycle, one step at a time. You’ll experience the real requirements of filing, fundraising, compliance, and campaigning — all safely in a simulation."

## How the Simulator Works

**Narrator [neutral]:**  
"Here are the ground rules. Think of them as your campaign manual."

1. Candidate Coins (CC)
   * 1 CC = $100 simulated
   * You start with 50 CC
   * Earn CC by passing quizzes or completing tasks
   * Spend CC on campaign needs like filing fees, ads, or communication coaching

2. Signatures & Voter Approval
   * Each quiz score = the same number of signatures
   * 100 signatures = 1% voter approval
   * Example: scoring 80% = 80 signatures = 0.8% approval

3. Ballot Access
   * Pay CC (filing fee) AND gather enough signatures

4. Eligibility thresholds
   * President → 75 CC + 2.5% approval
   * Senate → 50 CC + 2.5% approval
   * House → 31 CC + 2.5% approval

5. Task Types
   * Read, Write, Upload, Speak
   * Some decisions appear as chat buttons; click to choose your action

6. Feedback & Progress
   * After each task, CC, signatures, and approval are updated
   * Consequences narrated
   * All choices and scores carry forward

## Your First Step

**Narrator [encouraging]:**  
"Now it’s time to make your first campaign decision: which office are you running for?"

- 🏛 President (75 CC + 2.5% approval)  
- 🏛 U.S. Senate (50 CC + 2.5% approval)  
- 🏛 U.S. House (31 CC + 2.5% approval)
  `,
  tasks: [
    {
      id: "0-quiz-1",
      type: "quiz",
      prompt: "Quiz: What does 1 Candidate Coin (CC) represent?",
      questions: [
        {
          question: "What does 1 CC equal in simulated campaign funds?",
          options: [
            "A) $10",
            "B) $100 ✅",
            "C) $1,000",
            "D) $10,000"
          ],
          correct: 1
        }
      ]
    },
    {
      id: "0-write-office-choice",
      type: "write",
      prompt: "Type the office you are running for (President, Senate, or House)."
    }
  ]
};

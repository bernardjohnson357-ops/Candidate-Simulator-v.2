import { Module } from "@/app/ai/types";

export const module11: Module = {
  id: "module-11",
  title: "School Visit",
  description: `
**Narrator [calm, professional]:**
"Election Week begins. Candidates must now demonstrate effective communication across multiple audiences—parents, administrators, and children—while maintaining composure and clarity. This school visit tests empathy, authority, and real-time dialogue skills."
  `,
  tasks: [
    {
      id: "11-reading",
      type: "read",
      prompt: `
### 🎯 Purpose
Simulate a school visit to practice:
- Communicating clearly to different age groups and stakeholders
- Balancing policy explanations with empathy and authority
- Responding in real-time dialogue scenarios

This stage emphasizes multi-audience engagement and persuasive communication.

### 📝 Reading Summary
Effective school visits require:
1. Understanding your audience → Parents, staff, and students each have unique concerns.
2. Adapting your message → Tailor explanations to be age-appropriate, clear, and credible.
3. Maintaining composure → Respond to unexpected questions confidently and calmly.

Scenario Context:
- Local schools face safety and community issues
- Parents are concerned about student well-being
- Students are curious, playful, and often direct in their questions
      `
    },
    {
      id: "11-parent-dialogue",
      type: "write",
      prompt: `
### 📝 Task – Multi-Role Dialogue
**Parent Dialogue**
- Character: Linda, anxious single mom
- Concern: Local wild hog attacks, armed teachers
- Task: Respond empathetically, addressing policy while reassuring the parent

**Evaluation:** AI evaluates clarity, empathy, authority, and tone.
      `
    },
    {
      id: "11-principal-dialogue",
      type: "write",
      prompt: `
**Principal’s Office Ensemble**
- Characters: Dr. Howard (Superintendent), Mrs. Arnold (Principal), Karen (PTO gun range owner)
- Issue: Hog problem, school safety, legislative pressure
- Task: Mediate the conversation, balancing multiple perspectives with authority and clarity

**Evaluation:** AI evaluates composure, conflict resolution, clarity, and leadership.
      `
    },
    {
      id: "11-classroom-dialogue",
      type: "write",
      prompt: `
**Classroom Visit**
- Audience: 8–11-year-old students
- Topic: Safety and school environment
- Task: Answer questions in a playful, reassuring, and responsible manner

**Evaluation:** AI evaluates clarity, engagement, and age-appropriate communication.
      `
    },
    {
      id: "11-outcome",
      type: "read",
      prompt: `
### 📊 Module 11 Outcome
- Multi-role dialogue performance evaluated → Voter approval adjusted
- Candidate demonstrates ability to communicate across diverse audiences
- CC may be awarded for effective, empathetic, and persuasive engagement

**Next Module:** Module 12 – Television Interview (October 31), simulating live broadcast challenges and high-pressure questioning.
Reference: [Candidate Simulator Master Roadmap – Module 11](https://www.bernardjohnson4congress.com/general_election_cycle_october_30_test_mode)
      `
    },
  ],
};

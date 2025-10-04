import { Module, Task } from "@/app/ai/types";

export const module1: Module = {
  id: "1",
  title: "Party Filing",
  content: `
# 🗳 Module 1 – Party Filing
**Narrator [serious]:** “As a Party Candidate, you must be nominated through your party and file with the Secretary of State.”

### Key Steps
1. Party nomination (convention or primary)
2. File with Secretary of State
3. Pay filing fee OR submit petition signatures
4. Meet deadlines and signature rules
`,
  tasks: [
    { id: "1-read", type: "read", prompt: "Review Texas SOS Party Candidate Guide summary." },
    { id: "1-write", type: "write", prompt: "Complete the party filing quiz." },
    { id: "1-speak", type: "speak", prompt: "Optionally explain your filing choice." },
    { id: "1-upload", type: "upload", prompt: "Optionally upload your filing documents." },
  ],
};

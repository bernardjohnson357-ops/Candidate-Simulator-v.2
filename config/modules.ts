// modules.ts

export interface Task {
  type: "read" | "write" | "quiz" | "scenario";
  prompt: string;
  options?: string[];
  correctAnswer?: string;
}

export interface Module {
  id: string;
  title: string;
  brief: string;
  detailed: string;
  tasks: Task[];
  referenceLinks?: string[];
}

export const modules: Module[] = [
  {
    id: "0",
    title: "Orientation & Introduction",
    brief: "Welcome to the Candidate Simulator!",
    detailed: "In this test module, you’ll see how the chat responds to different task types.",
    tasks: [
      {
        type: "read",
        prompt: "👋 Hello candidate! This is the first simulator task. Type anything to continue."
      },
      {
        type: "quiz",
        prompt: "What is 2 + 2?",
        options: ["3", "4", "5"],
        correctAnswer: "4"
      },
      {
        type: "write",
        prompt: "Write a short sentence about why you’re running for office."
      },
      {
        type: "scenario",
        prompt: "🚨 A local newspaper just asked you for a quote. How do you respond?"
      }
    ],
    referenceLinks: []
  }
];

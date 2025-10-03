// app/ai/types.ts
export interface Task {
  id: string;
  type: "read" | "choice" | "input";
  prompt: string;
  options?: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

// ./app/ai/types.ts
export type TaskType = "read" | "write" | "speak" | "upload";

export interface Task {
  type: TaskType;
  prompt: string;
}

export interface Module {
  id: string; // e.g., "0", "1A", "1B", etc.
  title: string;
  description: string;
  tasks: Task[];
}

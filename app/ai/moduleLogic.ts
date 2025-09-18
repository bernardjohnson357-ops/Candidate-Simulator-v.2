// app/ai/moduleLogic.ts
import modulesData from "../../config/modules.json";

export interface Module {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface Task {
  type: "read" | "write" | "quiz" | "scenario";
  prompt: string;
  options?: string[];
  correctAnswer?: string;
}

// ✅ Load all module content from JSON
export const modules: Module[] = modulesData as Module[];

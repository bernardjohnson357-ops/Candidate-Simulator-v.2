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
export const modules: Module[] = (modulesData as any[]).map(m => ({
  id: m.id,
  title: m.title,
  description: `${m.brief}\n\n${m.detailed}`,
  tasks: m.tasks.map((t: string) => ({
    type: t as "read" | "write" | "quiz" | "scenario",
    prompt: "" // You can later fill in the task-specific prompt
  }))
}));

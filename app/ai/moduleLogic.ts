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

// ✅ Load all module content from JSON with pre-filled prompts and quiz placeholders
export const modules: Module[] = (modulesData as any[]).map(m => ({
  id: m.id,
  title: m.title,
  description: `${m.brief}\n\n${m.detailed}`,
  tasks: m.tasks.map((t: string) => {
    let prompt = "";
    let options: string[] | undefined = undefined;
    let correctAnswer: string | undefined = undefined;

    switch (t) {
      case "read":
        prompt = `Please read the following summary:\n\n${m.brief}`;
        break;
      case "write":
        prompt = `Please respond to the following task:\n\n${m.detailed}`;
        break;
      case "quiz":
        prompt = "Complete the quiz for this module.";
        options = ["Option A", "Option B", "Option C", "Option D"];
        correctAnswer = "Option A"; // Placeholder, replace with actual correct answer
        break;
      case "scenario":
        prompt = `Engage with the following scenario:\n\n${m.detailed}`;
        break;
      default:
        prompt = "";
    }

    return {
      type: t as "read" | "write" | "quiz" | "scenario",
      prompt,
      ...(options && { options }),
      ...(correctAnswer && { correctAnswer })
    };
  })
}));

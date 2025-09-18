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

// ✅ Load all module content from JSON with pre-filled prompts and real quizzes
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
        // Provide module-specific quizzes
        switch (m.id) {
          case "1A":
            prompt = "What is the filing deadline for an independent candidate in Texas?";
            options = ["March", "May", "August", "October"];
            correctAnswer = "May";
            break;
          case "1B":
            prompt = "How does a party candidate typically secure a nomination?";
            options = ["Through a convention or primary", "By collecting signatures only", "By submitting an independent application", "By paying a fee to the state"];
            correctAnswer = "Through a convention or primary";
            break;
          case "2A":
            prompt = "When must an independent candidate file FEC Form 1 (Statement of Candidacy)?";
            options = ["Within 5 days of raising funds", "Within 15 days of raising or spending $5,000", "Before filing with the Secretary of State", "After Election Day"];
            correctAnswer = "Within 15 days of raising or spending $5,000";
            break;
          case "2B":
            prompt = "At what threshold must party candidates file FEC Forms 1 and 2?";
            options = ["$1,000 raised", "$5,000 raised or spent", "$10,000 spent", "$50,000 raised"];
            correctAnswer = "$5,000 raised or spent";
            break;
          case "6":
            prompt = "What is the purpose of FEC Form 3?";
            options = ["Register voters", "File quarterly contributions and expenditures", "Announce campaign slogans", "Collect signatures"];
            correctAnswer = "File quarterly contributions and expenditures";
            break;
          default:
            prompt = "Complete the quiz for this module.";
            options = ["Option A", "Option B", "Option C", "Option D"];
            correctAnswer = "Option A";
        }
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

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

// ✅ Load all module content from JSON with expanded quizzes
export const modules: Module[] = (modulesData as any[]).map(m => {
  let taskObjects: Task[] = [];

  m.tasks.forEach((t: string) => {
    switch (t) {
      case "read":
        taskObjects.push({
          type: "read",
          prompt: `Please read the following summary:\n\n${m.brief}`
        });
        break;

      case "write":
        taskObjects.push({
          type: "write",
          prompt: `Please respond to the following task:\n\n${m.detailed}`
        });
        break;

      case "quiz":
        // Add multiple quiz questions per module
        switch (m.id) {
          case "1A":
            taskObjects.push(
              {
                type: "quiz",
                prompt: "What is the filing deadline for an independent candidate in Texas?",
                options: ["March", "May", "August", "October"],
                correctAnswer: "May"
              },
              {
                type: "quiz",
                prompt: "Which of the following can disqualify an independent candidate?",
                options: ["Submitting invalid petitions", "Paying the filing fee on time", "Choosing a political party", "Submitting signatures from eligible voters"],
                correctAnswer: "Submitting invalid petitions"
              },
              {
                type: "quiz",
                prompt: "What is one way an independent candidate can qualify for the ballot?",
                options: ["Collect signatures", "Win a party primary", "Pay CC only", "Get endorsed by a political party"],
                correctAnswer: "Collect signatures"
              }
            );
            break;

          case "1B":
            taskObjects.push(
              {
                type: "quiz",
                prompt: "How does a party candidate typically secure a nomination?",
                options: ["Through a convention or primary", "By collecting signatures only", "By submitting an independent application", "By paying a fee to the state"],
                correctAnswer: "Through a convention or primary"
              },
              {
                type: "quiz",
                prompt: "After nomination, what must party candidates still do to qualify for the ballot?",
                options: ["File with the Secretary of State", "Run as an independent", "Skip filing if endorsed", "Only raise funds"],
                correctAnswer: "File with the Secretary of State"
              },
              {
                type: "quiz",
                prompt: "Who can vote for party candidate signatures?",
                options: ["Anyone", "Voters who did not vote in another party primary", "Only registered independents", "Only members of other parties"],
                correctAnswer: "Voters who did not vote in another party primary"
              }
            );
            break;

          case "2A":
            taskObjects.push(
              {
                type: "quiz",
                prompt: "When must an independent candidate file FEC Form 1 (Statement of Candidacy)?",
                options: ["Within 5 days of raising funds", "Within 15 days of raising or spending $5,000", "Before filing with the Secretary of State", "After Election Day"],
                correctAnswer: "Within 15 days of raising or spending $5,000"
              },
              {
                type: "quiz",
                prompt: "What information is required on FEC Form 2 (Statement of Organization)?",
                options: ["Candidate's favorite color", "Treasurer's name and banking info", "Election results", "Party endorsement letters"],
                correctAnswer: "Treasurer's name and banking info"
              },
              {
                type: "quiz",
                prompt: "What is a penalty for filing errors in real life?",
                options: ["No penalty", "Loss of signatures or CC in the simulator", "Criminal charges", "Immediate election win"],
                correctAnswer: "Loss of signatures or CC in the simulator"
              }
            );
            break;

          case "2B":
            taskObjects.push(
              {
                type: "quiz",
                prompt: "At what threshold must party candidates file FEC Forms 1 and 2?",
                options: ["$1,000 raised", "$5,000 raised or spent", "$10,000 spent", "$50,000 raised"],
                correctAnswer: "$5,000 raised or spent"
              },
              {
                type: "quiz",
                prompt: "Which form begins the quarterly reporting process?",
                options: ["Form 1", "Form 2", "Form 3", "Form 4"],
                correctAnswer: "Form 3"
              },
              {
                type: "quiz",
                prompt: "Does party backing exempt candidates from federal compliance?",
                options: ["Yes", "No", "Only for independents", "Only for presidential candidates"],
                correctAnswer: "No"
              }
            );
            break;

          case "6":
            taskObjects.push(
              {
                type: "quiz",
                prompt: "What is the purpose of FEC Form 3?",
                options: ["Register voters", "File quarterly contributions and expenditures", "Announce campaign slogans", "Collect signatures"],
                correctAnswer: "File quarterly contributions and expenditures"
              },
              {
                type: "quiz",
                prompt: "Which scenario may impact voter approval if skipped?",
                options: ["Constitution Day outreach", "Filing Form 1", "Paying CC", "Updating social media profile"],
                correctAnswer: "Constitution Day outreach"
              },
              {
                type: "quiz",
                prompt: "What is a consequence of mishandling compliance or scenarios?",
                options: ["Gain more signatures", "Lose CC or voter approval", "Automatically win election", "No effect"],
                correctAnswer: "Lose CC or voter approval"
              }
            );
            break;

          default:
            taskObjects.push({
              type: "quiz",
              prompt: "Complete the quiz for this module.",
              options: ["Option A", "Option B", "Option C", "Option D"],
              correctAnswer: "Option A"
            });
        }
        break;

      case "scenario":
        taskObjects.push({
          type: "scenario",
          prompt: `Engage with the following scenario:\n\n${m.detailed}`
        });
        break;

      default:
        break;
    }
  });

  return {
    id: m.id,
    title: m.title,
    description: `${m.brief}\n\n${m.detailed}`,
    tasks: taskObjects
  };
});

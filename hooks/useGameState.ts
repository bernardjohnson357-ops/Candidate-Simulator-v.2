import { useState } from "react";
import { GameState, Task } from "@/types";

// Full linear tasks for Modules 0–15
const initialTasks: Task[] = [
  // Module 0 – Orientation & Office Choice
  { module: 0, type: "read", content: "Welcome to the Federal Candidate Simulator — AI Edition. You will experience filing, fundraising, compliance, and campaigning safely." },
  { module: 0, type: "write", content: "Choose your office: President, U.S. Senate, or U.S. House." },

  // Module 1A – Independent / Write-In Filing
  { module: 1, type: "read", content: "To appear on the ballot as an Independent or Write-In candidate in Texas, file with the SOS either paying a filing fee or submitting petition signatures. Deadlines: early May for Independent, mid-August for Write-In." },
  { module: 1, type: "quiz", content: "SOS Independent/Write-In Filing Quiz", quizId: "1A_q1" },

  // Module 1B – Party Filing
  { module: 1, type: "read", content: "Party candidates must be nominated by their party and file with the Texas SOS. Choose filing fee or petition signatures. Deadline: December of the year before the election." },
  { module: 1, type: "quiz", content: "SOS Party Candidate Filing Quiz", quizId: "1B_q1" },

  // Module 2A – FEC Forms 1 & 2 (Independent)
  { module: 2, type: "read", content: "Independent candidates must file FEC Forms 1 & 2 after raising/spending over $5,000. Forms must be submitted within 15 days." },
  { module: 2, type: "quiz", content: "FEC Form 1 & 2 Quiz (Independent)", quizId: "2A_q1" },

  // Module 2B – FEC Forms 1 & 2 (Party)
  { module: 2, type: "read", content: "Party candidates must file FEC Forms 1 & 2 after crossing $5,000 in campaign activity. Timely submission is required." },
  { module: 2, type: "quiz", content: "FEC Form 1 & 2 Quiz (Party)", quizId: "2B_q1" },

  // Module 3 – First Moves
  { module: 3, type: "read", content: "Choose a strategic path: Fundraising, Volunteer Base, or Media & Advertising. Use Candidate Coins to purchase initial campaign resources." },
  { module: 3, type: "write", content: "Write your detailed implementation plan for the selected strategy." },

  // Module 4 – Campaign Identity
  { module: 4, type: "read", content: "Develop your campaign identity: slogan, mission statement, and announcement speech." },
  { module: 4, type: "write", content: "Write your campaign slogan (1 sentence)." },
  { module: 4, type: "write", content: "Write your mission statement (1 paragraph)." },
  { module: 4, type: "write", content: "Draft your announcement speech (3–5 paragraphs, include slogan and key issues)." },

  // Module 5 – Campaign Imagery
  { module: 5, type: "read", content: "Design your visual campaign materials: logo, yard sign/poster, T-shirt/button." },
  { module: 5, type: "upload", content: "Upload your campaign logo." },
  { module: 5, type: "upload", content: "Upload your yard sign or poster." },
  { module: 5, type: "upload", content: "Upload your T-shirt or button." },
  { module: 5, type: "write", content: "Write your decision on endorsement offers." },
  { module: 5, type: "write", content: "Write your decision on signing the petition: 'End War in Gaza'." },
  { module: 5, type: "write", content: "Write your public response to opponent legislation." },

  // Module 6 – September Compliance & Scenarios
  { module: 6, type: "read", content: "FEC quarterly filing requires reporting contributions, expenditures, and committee info." },
  { module: 6, type: "quiz", content: "FEC Form 3 Quarterly Filing Quiz", quizId: "6_q1" },
  { module: 6, type: "write", content: "Respond to constituent concern scenario." },
  { module: 6, type: "write", content: "Respond to Constitution Day challenge scenario." },
  { module: 6, type: "write", content: "Choose a postcard offer option and justify your decision." },
  { module: 6, type: "write", content: "Decide whether to accept or decline the debate and optional coach." },

  // Modules 7–10 – October Operations
  { module: 7, type: "read", content: "Early October operations: speech prep, team management, weekly campaign briefing." },
  { module: 7, type: "write", content: "Prepare a campaign speech based on briefing." },
  { module: 8, type: "read", content: "Mid-October: press conference prep, constituent messaging." },
  { module: 8, type: "write", content: "Deliver opening statement for press conference." },
  { module: 9, type: "read", content: "Final Push: live media appearances, podcasts, rapid messaging." },
  { module: 9, type: "write", content: "Type your media response/podcast script." },
  { module: 10, type: "read", content: "Election Countdown: last week operations and messaging." },
  { module: 10, type: "write", content: "Type final week communications response." },

  // Modules 11–14 – Election Week
  { module: 11, type: "write", content: "School visit scenario response." },
  { module: 12, type: "write", content: "TV interview scenario response." },
  { module: 13, type: "write", content: "Endorsement meeting scenario response." },
  { module: 14, type: "write", content: "Debate scenario response." },

  // Module 15 – Final Summary
  { module: 15, type: "read", content: "Final summary of CC, signatures, voter approval, and campaign outcomes." }
];

export function useGameState() {
  const [state, setState] = useState<GameState>({
    cc: 50,
    signatures: 0,
    voterApproval: 0,
    currentModule: 0,
    currentTaskIndex: 0,
    quizzesCompleted: [],
    branch: "Independent",
  });

  const [tasks] = useState<Task[]>(initialTasks);
  const [loading, setLoading] = useState(false);

  const handleTaskCompletion = async (task: Task, userInput: string | File) => {
    let narration = "";

    setState(prev => {
      let newCC = prev.cc;
      let newSignatures = prev.signatures;
      let newVoterApproval = prev.voterApproval;
      let newQuizzesCompleted = [...prev.quizzesCompleted];

      if (task.type === "quiz" && task.quizId) {
        if (!newQuizzesCompleted.includes(task.quizId)) {
          const score = typeof userInput === "string" ? parseInt(userInput) || 0 : 0;
          const bonusCC = score === 100 ? 2 : score >= 80 ? 1 : 0;
          const penaltyCC = score < 80 ? -1 : 0;

          newCC += bonusCC + penaltyCC;
          newSignatures += score;
          newVoterApproval = newSignatures / 100;

          newQuizzesCompleted.push(task.quizId);
          narration = `You scored ${score}. CC: ${newCC}, Signatures: ${newSignatures}, Approval: ${newVoterApproval.toFixed(1)}%`;
        } else {
          narration = "Quiz already completed.";
        }
      } else if (task.type === "write") {
        newCC += 1;
        newSignatures += 10;
        newVoterApproval = newSignatures / 100;
        narration = "Your written task was received. CC and signatures updated.";
      } else if (task.type === "read") {
        narration = task.content;
      } else if (task.type === "upload") {
        newCC += 1;
        narration = "File uploaded successfully. CC increased by 1.";
      }

      const nextTaskIndex = prev.currentTaskIndex + 1;
      const nextModule = nextTaskIndex < tasks.length ? tasks[nextTaskIndex].module : prev.currentModule;

      return {
        ...prev,
        cc: newCC,
        signatures: newSignatures,
        voterApproval: newVoterApproval,
        currentTaskIndex: nextTaskIndex,
        currentModule: nextModule,
        quizzesCompleted: newQuizzesCompleted,
      };
    });

    return { narration };
  };

  return { state, tasks, handleTaskCompletion, loading };
}

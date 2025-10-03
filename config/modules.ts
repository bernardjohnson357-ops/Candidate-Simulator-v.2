// ./config/modules.ts
export interface Task {
  type: "quiz" | "choice" | "write" | "upload" | "speak";
  prompt: string;
  options?: string[];
  correctAnswer?: string;
}

export interface Module {
  id: string;
  title: string;
  content: string;
  tasks: Task[]; // required
}

export const modules: Module[] = [
  {
    id: "0",
    title: "Orientation & Introduction",
    content: `Welcome to the Federal Candidate Simulator!
This simulator will take you through filing, fundraising, compliance, and campaigning.
You start with 50 Candidate Coins (CC), 0 signatures, and 0% voter approval.`,
    tasks: [
      {
        type: "choice",
        prompt: "Which office will you run for?",
        options: ["🏛 President", "🏛 U.S. Senate", "🏛 U.S. House"],
      },
    ],
  },
  {
    id: "1",
    title: "Filing Phase",
    content: `As a Party Candidate, you must file with the Secretary of State and your party.
Pay the filing fee or gather signatures. Mistakes here can cost you CC.`,
    tasks: [
      {
        type: "quiz",
        prompt: "When must Party Candidates file their application with the Texas SOS?",
        options: [
          "A) December of the year before the election ✅",
          "B) January of election year",
          "C) May of election year",
          "D) August of election year",
        ],
        correctAnswer: "A) December of the year before the election ✅",
      },
    ],
  },
  {
    id: "2",
    title: "Federal Compliance",
    content: `Now that you’ve filed with the state, you must file with the FEC.
Form 1 = Statement of Candidacy.
Form 2 = Statement of Organization.
You must file within 15 days after raising/spending $5,000.`,
    tasks: [
      {
        type: "quiz",
        prompt: "Which form registers your campaign committee?",
        options: ["Form 1", "Form 2", "Form 3"],
        correctAnswer: "Form 2",
      },
    ],
  },
  {
    id: "3",
    title: "First Moves",
    content: `Establish your campaign’s foundation.
You can focus on fundraising, volunteers, or media/ads.
Also buy your campaign essentials with CC.`,
    tasks: [
      {
        type: "choice",
        prompt: "Pick your first strategy:",
        options: ["📈 Fundraising", "🧑‍🤝‍🧑 Volunteers", "📺 Media & Advertising"],
      },
    ],
  },
];

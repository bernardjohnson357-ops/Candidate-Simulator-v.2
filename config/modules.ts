// config/modules.ts
export interface Module {
  id: string;
  title: string;
  content: string;
  tasks?: {
    type: "quiz" | "choice" | "write" | "upload" | "speak";
    prompt: string;
    options?: string[]; // for quizzes/choices
    correctAnswer?: string; // optional for quiz logic
  }[];
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
  {
    id: "4",
    title: "Campaign Identity",
    content: `Now define your campaign identity: slogan, mission, and announcement speech.
These shape how voters see you.`,
    tasks: [
      {
        type: "write",
        prompt: "Write your campaign slogan (1 sentence).",
      },
      {
        type: "write",
        prompt: "Write your mission statement (1 paragraph).",
      },
      {
        type: "write",
        prompt: "Draft your announcement speech (3–5 paragraphs).",
      },
    ],
  },
  {
    id: "5",
    title: "Campaign Imagery",
    content: `Time to design your campaign visuals: logo, yard signs, and T-shirts.
Upload or describe your designs.`,
    tasks: [
      {
        type: "upload",
        prompt: "Upload or describe your campaign logo.",
      },
      {
        type: "upload",
        prompt: "Upload or describe a yard sign/poster.",
      },
      {
        type: "upload",
        prompt: "Upload or describe a T-shirt or button.",
      },
    ],
  },
];

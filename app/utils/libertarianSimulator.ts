// ./app/utils/libertarianSimulator.ts
import { Module } from "../ai/types";

export const libertarianSimulator: Module[] = [
  {
    id: "0",
    title: "Orientation & Introduction",
    description:
      "Welcome to the Federal Candidate Simulator. You’ll learn how Candidate Coins (CC), signatures, and voter approval work. Choose whether to run for President, Senate, or House.",
    tasks: [
      { type: "read", prompt: "Read the campaign manual and scoring system." },
      { type: "write", prompt: "Declare which office you are running for." },
      { type: "speak", prompt: "Optionally speak your choice of office." },
      { type: "upload", prompt: "Optionally upload a campaign-related image." },
    ],
  },
  {
    id: "1A",
    title: "Independent / Write-In Filing",
    description:
      "Candidates file as independents or write-ins, earning signatures and CC from quizzes.",
    tasks: [
      { type: "read", prompt: "Review independent/write-in filing rules and deadlines." },
      { type: "write", prompt: "Complete the quiz on filing fees and petitions." },
      { type: "speak", prompt: "Optionally explain your filing choice." },
      { type: "upload", prompt: "Optionally upload filing documents." },
    ],
  },
  {
    id: "1B",
    title: "Party Filing",
    description:
      "Candidates file under a political party. This requires different thresholds and CC usage.",
    tasks: [
      { type: "read", prompt: "Study the rules for filing as a party candidate." },
      { type: "write", prompt: "Answer questions about your party filing process." },
      { type: "speak", prompt: "Optionally explain why you chose this route." },
      { type: "upload", prompt: "Optionally upload your party documents." },
    ],
  },
  {
    id: "2",
    title: "Ballot Access Challenges",
    description:
      "Candidates face challenges from opponents or election officials. Learn how to defend your ballot access.",
    tasks: [
      { type: "read", prompt: "Review common legal challenges to ballot access." },
      { type: "write", prompt: "Draft a short defense of your ballot access." },
      { type: "speak", prompt: "Optionally explain your strategy aloud." },
      { type: "upload", prompt: "Optionally upload related documents." },
    ],
  },
  {
    id: "3",
    title: "Compliance & FEC Reports",
    description:
      "Candidates must comply with campaign finance law, including filing FEC forms and disclosure reports.",
    tasks: [
      { type: "read", prompt: "Study the basics of FEC Form 1 (Statement of Organization)." },
      { type: "write", prompt: "Simulate filling out a simplified campaign finance form." },
      { type: "speak", prompt: "Optionally describe the importance of compliance." },
      { type: "upload", prompt: "Optionally upload a sample report." },
    ],
  },
  {
    id: "4",
    title: "Fundraising & Donor Outreach",
    description:
      "Fundraising is essential. Candidates must engage donors, manage limits, and maintain compliance.",
    tasks: [
      { type: "read", prompt: "Review rules about individual donation limits." },
      { type: "write", prompt: "Draft a short donor outreach email." },
      { type: "speak", prompt: "Optionally record a fundraising pitch." },
      { type: "upload", prompt: "Optionally upload a sample fundraising flyer." },
    ],
  },
  {
    id: "5",
    title: "Media & Press Engagement",
    description:
      "Learn how to engage with press, issue statements, and manage media crises.",
    tasks: [
      { type: "read", prompt: "Review media engagement best practices." },
      { type: "write", prompt: "Draft a short press release." },
      { type: "speak", prompt: "Optionally deliver a 30-second stump speech." },
      { type: "upload", prompt: "Optionally upload a campaign poster image." },
    ],
  },
  {
    id: "6",
    title: "Debates & Public Forums",
    description:
      "Prepare for debates and public speaking events. Learn how to deliver key messages under pressure.",
    tasks: [
      { type: "read", prompt: "Read debate preparation materials." },
      { type: "write", prompt: "Write a short debate opening statement." },
      { type: "speak", prompt: "Optionally deliver your debate response aloud." },
      { type: "upload", prompt: "Optionally upload debate prep notes." },
    ],
  },
  {
    id: "7",
    title: "Grassroots Organizing",
    description:
      "Build volunteer networks and community engagement strategies to grow your campaign.",
    tasks: [
      { type: "read", prompt: "Learn how grassroots campaigns recruit volunteers." },
      { type: "write", prompt: "Draft a volunteer recruitment message." },
      { type: "speak", prompt: "Optionally role-play a pitch to a volunteer." },
      { type: "upload", prompt: "Optionally upload volunteer flyers." },
    ],
  },
  {
    id: "8",
    title: "Digital Campaigning",
    description:
      "Use digital tools, social media, and online ads to boost your campaign.",
    tasks: [
      { type: "read", prompt: "Study the rules around digital political ads." },
      { type: "write", prompt: "Create a short campaign social media post." },
      { type: "speak", prompt: "Optionally record a social media video script." },
      { type: "upload", prompt: "Optionally upload a sample ad image." },
    ],
  },
  {
    id: "9",
    title: "Voter Outreach & Canvassing",
    description:
      "Learn the basics of voter outreach through phone banking, canvassing, and events.",
    tasks: [
      { type: "read", prompt: "Review effective voter outreach strategies." },
      { type: "write", prompt: "Draft a script for a voter phone call." },
      { type: "speak", prompt: "Optionally practice your voter pitch." },
      { type: "upload", prompt: "Optionally upload outreach materials." },
    ],
  },
  {
    id: "10",
    title: "Coalition Building",
    description:
      "Form alliances with interest groups, advocacy organizations, and local leaders.",
    tasks: [
      { type: "read", prompt: "Study examples of political coalition-building." },
      { type: "write", prompt: "Draft a proposal to a coalition partner." },
      { type: "speak", prompt: "Optionally present your coalition pitch aloud." },
      { type: "upload", prompt: "Optionally upload supporting documents." },
    ],
  },
  {
    id: "11",
    title: "Policy Development",
    description:
      "Develop policy positions and campaign platforms that resonate with voters.",
    tasks: [
      { type: "read", prompt: "Review how candidates develop policy platforms." },
      { type: "write", prompt: "Draft your campaign’s policy statement." },
      { type: "speak", prompt: "Optionally deliver a policy announcement speech." },
      { type: "upload", prompt: "Optionally upload policy briefing notes." },
    ],
  },
  {
    id: "12",
    title: "Get Out The Vote (GOTV)",
    description:
      "Learn how to maximize voter turnout during early voting and election day.",
    tasks: [
      { type: "read", prompt: "Study GOTV campaign techniques." },
      { type: "write", prompt: "Draft a GOTV volunteer instruction sheet." },
      { type: "speak", prompt: "Optionally record a GOTV motivational speech." },
      { type: "upload", prompt: "Optionally upload GOTV flyers." },
    ],
  },
  {
    id: "13",
    title: "Election Day Operations",
    description:
      "Coordinate poll watchers, volunteers, and legal observers for election day.",
    tasks: [
      { type: "read", prompt: "Learn about election day logistics." },
      { type: "write", prompt: "Create an election day action plan." },
      { type: "speak", prompt: "Optionally deliver final rally remarks." },
      { type: "upload", prompt: "Optionally upload poll watcher instructions." },
    ],
  },
  {
    id: "14",
    title: "Post-Election: Concede or Transition",
    description:
      "Candidates must know how to transition gracefully whether they win or lose.",
    tasks: [
      { type: "read", prompt: "Review examples of concession and victory speeches." },
      { type: "write", prompt: "Draft either a concession or victory speech." },
      { type: "speak", prompt: "Optionally deliver your draft speech aloud." },
      { type: "upload", prompt: "Optionally upload transition documents." },
    ],
  },
  {
    id: "15",
    title: "Reflection & Feedback",
    description:
      "Reflect on your campaign experience and provide feedback for improvement.",
    tasks: [
      { type: "read", prompt: "Read a closing note from the simulator." },
      { type: "write", prompt: "Write your reflections on the campaign." },
      { type: "speak", prompt: "Optionally record your reflections aloud." },
      { type: "upload", prompt: "Optionally upload campaign materials for review." },
    ],
  },
];

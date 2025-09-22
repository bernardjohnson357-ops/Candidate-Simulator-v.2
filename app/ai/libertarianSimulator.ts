// app/ai/libertarianSimulator.ts
import { ModuleState } from "./moduleLogic";

export const libertarianSimulator = [
  // ------------------------------
  // Module 0 – Orientation & Introduction
  // ------------------------------
  {
    id: "0",
    title: "Orientation & Introduction",
    narrator: `Welcome to the Libertarian Federal Candidate Simulator.
You’ll experience filing, compliance, messaging, and campaigning in a safe environment.
You begin with 50 Candidate Coins (cc), 0 signatures, and 0% voter approval.`,
    prompt: `Which office will you run for: President, Senate, or House?`,
    logic: (input: string, state: ModuleState) => {
      const office = input.toLowerCase();
      if (office.includes("president")) {
        state.office = "President";
        state.threshold = { cc: 75, approval: 2.5, sigs: 25 };
        return `Running for President requires 75 CC + 2.5% approval OR 25% nationwide signatures.`;
      }
      if (office.includes("senate")) {
        state.office = "Senate";
        state.threshold = { cc: 50, approval: 2.5, sigs: 14 };
        return `Running for Senate requires 50 CC + 2.5% approval OR 14% statewide signatures.`;
      }
      if (office.includes("house")) {
        state.office = "House";
        state.threshold = { cc: 31, approval: 2.5, sigs: 7 };
        return `Running for House requires 31 CC + 2.5% approval OR 7% district signatures.`;
      }
      return "Please choose President, Senate, or House.";
    },
  },

  // ------------------------------
  // Module 1B – Libertarian Party Filing
  // ------------------------------
  {
    id: "1",
    title: "Libertarian Party Filing",
    narrator: `As a Libertarian candidate, you must secure the party’s nomination and file with the Secretary of State.`,
    prompt: `Will you pay the filing fee, collect signatures, or attempt both?`,
    logic: (input: string, state: ModuleState) => {
      const normalized = input.toLowerCase();
      const hasFee = normalized.includes("fee");
      const hasSign = normalized.includes("sign");

      if (hasFee && hasSign) {
        state.cc -= 10;
        state.signatures += 200;
        state.approval += 0.8;
      } else if (hasFee) {
        state.cc -= 10;
        state.approval += 0.5;
      } else if (hasSign) {
        state.signatures += 200;
        state.approval += 0.3;
      } else {
        return "Your filing approach is unclear. Try mentioning 'fee', 'signatures', or both.";
      }

      let thresholdMet = false;
      switch (state.office) {
        case "President":
          thresholdMet =
            (state.cc >= 75 && state.approval >= 2.5) || state.signatures >= 25000;
          break;
        case "Senate":
          thresholdMet =
            (state.cc >= 50 && state.approval >= 2.5) || state.signatures >= 14000;
          break;
        case "House":
          thresholdMet =
            (state.cc >= 31 && state.approval >= 2.5) || state.signatures >= 7000;
          break;
      }

      if (thresholdMet) {
        return "Filing complete! You meet eligibility requirements and may advance to the next module.";
      } else {
        return "Filing recorded, but you have not yet met eligibility requirements. Consider collecting more signatures or ensuring sufficient CC + approval.";
      }
    },
  },

  // ------------------------------
  // Module 2B – Federal Filing Compliance
  // ------------------------------
  {
    id: "2",
    title: "Federal Filing Compliance",
    narrator: `Crossing $5,000 in campaign funds triggers federal reporting: Form 1 (Statement of Candidacy) and Form 2 (Statement of Organization).`,
    prompt: `How will you file correctly? Mention a treasurer, banking info, and the 15-day deadline.`,
    logic: (input: string, state: ModuleState) => {
      const normalized = input.toLowerCase();
      const mentionsTreasurer = normalized.includes("treasurer");
      const mentionsBank = normalized.includes("bank");
      const mentionsDeadline = normalized.includes("15") || normalized.includes("fifteen");

      if (mentionsTreasurer && mentionsBank && mentionsDeadline) {
        state.cc += 2;
        state.signatures += 100;
        return "FEC forms filed correctly! +2 CC, +100 signatures.";
      } else {
        state.cc -= 1;
        state.signatures -= 50;
        return "Filing errors cost you –1 CC and –50 signatures. Make sure to include treasurer, bank info, and the 15-day deadline.";
      }
    },
  },

  // ------------------------------
  // Module 3 – First Moves (Strategy & Spending)
  // ------------------------------
  {
    id: "3",
    title: "First Moves – Strategy & Spending",
    narrator: `It's time to make your early campaign decisions. You have limited Candidate Coins (CC) and must choose how to spend them to maximize signatures and voter approval.`,
    prompt: `Choose one: "advertising", "travel", or "press outreach".`,
    logic: (input: string, state: ModuleState) => {
      const choice = input.toLowerCase().trim();

      switch (choice) {
        case "advertising":
          if (state.cc >= 10) {
            state.cc -= 10;
            state.approval += 1.0;
            return "You ran an advertising campaign. –10 CC, +1.0% approval.";
          } else {
            return "Not enough CC for advertising. Choose another action.";
          }

        case "travel":
          if (state.cc >= 8) {
            state.cc -= 8;
            state.signatures += 150;
            return "You traveled to key districts. –8 CC, +150 signatures.";
          } else {
            return "Not enough CC for travel. Choose another action.";
          }

        case "press outreach":
          if (state.cc >= 5) {
            state.cc -= 5;
            state.signatures += 50;
            state.approval += 0.5;
            return "You engaged in press outreach. –5 CC, +50 signatures, +0.5% approval.";
          } else {
            return "Not enough CC for press outreach. Choose another action.";
          }

        default:
          return 'Action unclear. Please type "advertising", "travel", or "press outreach".';
      }
    },
  },

  // ------------------------------
  // Module 4 – Campaign Identity
  // ------------------------------
  {
    id: "4",
    title: "Campaign Identity",
    narrator: `Define your campaign’s message. Libertarian values include liberty, fiscal responsibility, and limited government.`,
    prompt: `Write your slogan, mission statement, and announcement speech.`,
    logic: (input: string, state: ModuleState) => {
      const normalized = input.toLowerCase().trim();

      if (normalized.length < 10) {
        return "Your statement is too short. Try to write a clear slogan or mission statement (at least 10 characters).";
      }

      const approvalBoost = Math.min(1.5, normalized.length / 50);
      const signaturesBoost = Math.min(100, normalized.length * 2);

      state.approval += approvalBoost;
      state.signatures += signaturesBoost;

      return `Campaign identity set! +${approvalBoost.toFixed(1)}% approval, +${signaturesBoost} signatures.`;
    },
  },

  // ------------------------------
  // Module 5 – Fundraising & Donor Outreach
  // ------------------------------
  {
    id: "5",
    title: "Fundraising & Donor Outreach",
    narrator: `It's time to raise funds for your campaign. Effective fundraising increases your CC and helps with campaign activities.`,
    prompt: `Choose one: "host event", "online campaign", or "personal donors".`,
    logic: (input: string, state: ModuleState) => {
      const choice = input.toLowerCase().trim();

      switch (choice) {
        case "host event":
          state.cc += 15;
          state.approval += 0.5;
          return "You hosted a fundraising event. +15 CC, +0.5% approval.";
        case "online campaign":
          state.cc += 10;
          state.signatures += 100;
          return "You ran an online fundraising campaign. +10 CC, +100 signatures.";
        case "personal donors":
          state.cc += 8;
          state.approval += 0.2;
          return "You contacted personal donors. +8 CC, +0.2% approval.";
        default:
          return 'Action unclear. Please type "host event", "online campaign", or "personal donors".';
      }
    },
  },

  // ------------------------------
  // Module 6 – Campaign Messaging
  // ------------------------------
  {
    id: "6",
    title: "Campaign Messaging",
    narrator: `Now you need to craft your campaign messaging. Clear and consistent messaging can boost voter approval.`,
    prompt: `Choose one focus: "liberty", "fiscal responsibility", or "limited government".`,
    logic: (input: string, state: ModuleState) => {
      const choice = input.toLowerCase().trim();

      switch (choice) {
        case "liberty":
          state.approval += 1.0;
          return "You focused your message on liberty. +1.0% approval.";
        case "fiscal responsibility":
          state.approval += 0.8;
          state.cc += 2;
          return "You emphasized fiscal responsibility. +0.8% approval, +2 CC.";
        case "limited government":
          state.approval += 0.5;
          state.signatures += 50;
          return "You highlighted limited government. +0.5% approval, +50 signatures.";
        default:
          return 'Action unclear. Please type "liberty", "fiscal responsibility", or "limited government".';
      }
    },
  },
  
  {
    id: "8",
    title: "Mid-October Operations",
    narrator: `Press conferences and voter Q&A test your consistency.`,
    prompt: `Respond to questions on healthcare, spending, and Second Amendment rights.`,
    logic: (input: string, state: ModuleState) => {
      state.approval += 1;
      return "Your answers were clear and consistent. +1% approval.";
    },
  },

  {
    id: "9",
    title: "Final Push",
    narrator: `The last two weeks: podcasts, ads, and final messaging.`,
    prompt: `Describe your podcast themes and ad strategy.`,
    logic: (input: string, state: ModuleState) => {
      state.cc -= 10;
      state.approval += 1;
      return "Your final push gained momentum. –10 cc, +1% approval.";
    },
  },

  {
    id: "10",
    title: "Election Countdown",
    narrator: `Final week: town halls, rapid Q&A, and spending decisions.`,
    prompt: `Give your town hall speech and decide final CC use (ads, ground game, or prep).`,
    logic: (input: string, state: ModuleState) => {
      state.cc -= 5;
      state.approval += 1;
      return "You energized supporters in the final week. –5 cc, +1% approval.";
    },
  },

  {
    id: "11",
    title: "School Visit",
    narrator: `Connect with students, teachers, and parents.`,
    prompt: `Write a short speech focused on education and civic engagement.`,
    logic: (input: string, state: ModuleState) => {
      state.approval += 0.5;
      return "School visit built goodwill. +0.5% approval.";
    },
  },

  {
    id: "12",
    title: "TV Interview",
    narrator: `Answer live media questions about your campaign.`,
    prompt: `Respond concisely about your priorities and decisions.`,
    logic: (input: string, state: ModuleState) => {
      state.approval += 1;
      return "Strong interview boosted credibility. +1% approval.";
    },
  },

  {
    id: "13",
    title: "Endorsements",
    narrator: `Decide which endorsements to accept or decline.`,
    prompt: `Do you accept endorsements from local groups, or stay independent?`,
    logic: (input: string, state: ModuleState) => {
      if (input.includes("accept")) {
        state.cc += 5;
        state.approval += 0.5;
        return "Endorsement improved resources. +5 cc, +0.5% approval.";
      }
      if (input.includes("decline")) {
        state.approval += 0.2;
        return "Staying independent impressed voters. +0.2% approval.";
      }
      return "Unclear stance on endorsements.";
    },
  },

  {
    id: "14",
    title: "Debate",
    narrator: `Final debate: opening statement and 2 questions.`,
    prompt: `Write your opening statement and responses.`,
    logic: (input: string, state: ModuleState) => {
      state.approval += 1.5;
      return "Debate performance swayed undecided voters. +1.5% approval.";
    },
  },

  {
    id: "15",
    title: "Final Summary",
    narrator: `Election results are in.`,
    prompt: `Reflect on your campaign. What did you learn?`,
    logic: (_: string, state: ModuleState) => {
      return `Simulation complete! Final results:\nCC: ${state.cc}\nSignatures: ${state.signatures}\nApproval: ${state.approval}%\nThank you for running as a Libertarian candidate.`;
    },
  },
];

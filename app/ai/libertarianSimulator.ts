// app/ai/libertarianSimulator.ts

// ------------------------------
// Libertarian-Only Candidate Simulator
// Modules 0 → 1B → 2B → 3
// ------------------------------

// Module state interface
export interface ModuleState {
  office: "President" | "Senate" | "House";
  cc: number;
  signatures: number;
  approval: number;
  threshold?: { cc: number; approval: number; sigs: number };
}

// Full simulator modules
export const libertarianSimulator = [
  // ------------------------------
  // Module 0 – Orientation & Introduction
  // ------------------------------
  {
    id: "0",
    title: "Orientation & Introduction",
    narrator: `Welcome to the Libertarian Federal Candidate Simulator.
You’ll experience filing, compliance, messaging, and campaigning in a safe environment.
You begin with 50 Candidate Coins (cc), 0 signatures, and 0% voter approval.
Every typed decision will affect these metrics.`,
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
      const normalized = input.toLowerCase().replace(/[^a-z\s]/g, "").trim();
      const hasFee = normalized.includes("fee");
      const hasSign = normalized.includes("sign");

      // Apply actions
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

      // Check eligibility thresholds
      let thresholdMet = false;
      switch (state.office) {
        case "President":
          thresholdMet =
            (state.cc >= 75 && state.approval >= 2.5) ||
            state.signatures >= 25_000;
          break;
        case "Senate":
          thresholdMet =
            (state.cc >= 50 && state.approval >= 2.5) ||
            state.signatures >= 14_000;
          break;
        case "House":
          thresholdMet =
            (state.cc >= 31 && state.approval >= 2.5) ||
            state.signatures >= 7_000;
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
      const normalized = input.toLowerCase().replace(/[^a-z\s]/g, "").trim();

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

  {
    id: "4",
    title: "Campaign Identity",
    narrator: `Define your campaign’s message. Libertarian values include liberty, fiscal responsibility, and limited government.`,
    prompt: `Write your slogan, mission statement, and announcement speech.`,
    logic: (input: string, state: ModuleState) => {
      if (input.length > 50) {
        state.cc += 2;
        state.approval += 1;
        return "Strong identity! +2 cc, +1% approval.";
      }
      state.approval -= 0.5;
      return "Your message felt weak. –0.5% approval.";
    },
  },

  {
    id: "5",
    title: "Expansion & Community Engagement",
    narrator: `Grow visibility with visuals and outreach.`,
    prompt: `Describe your campaign logos, signs, shirts, and community events.`,
    logic: (input: string, state: ModuleState) => {
      if (input.includes("logo") || input.includes("sign")) {
        state.cc -= 5;
        state.signatures += 100;
        return "Visuals boosted recognition. –5 cc, +100 signatures.";
      }
      if (input.includes("town") || input.includes("community")) {
        state.approval += 1;
        state.signatures += 50;
        return "Community outreach paid off. +1% approval, +50 signatures.";
      }
      return "Outreach unclear, limited effect.";
    },
  },

  {
    id: "6",
    title: "September Compliance & Scenarios",
    narrator: `September means FEC Form 3 and campaign events.`,
    prompt: `Do you prioritize debate, postcards, or Constitution Day?`,
    logic: (input: string, state: ModuleState) => {
      if (input.includes("debate")) {
        state.approval += 1.5;
        return "Debate impressed voters. +1.5% approval.";
      }
      if (input.includes("postcard")) {
        state.cc -= 3;
        state.signatures += 75;
        return "Postcards earned goodwill. –3 cc, +75 signatures.";
      }
      if (input.includes("constitution")) {
        state.approval += 1;
        return "Constitution Day raised approval. +1% approval.";
      }
      return "Skipping key events cost you –1% approval.";
    },
  },

  {
    id: "7",
    title: "Early October Operations",
    narrator: `High visibility time: manage staff, give a safety speech, and respond to news.`,
    prompt: `How do you allocate staff and craft your community safety speech?`,
    logic: (input: string, state: ModuleState) => {
      state.approval += 1;
      state.signatures += 50;
      return "Strong early October strategy. +1% approval, +50 signatures.";
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

// ===============================
// LIBERTARIAN SIMULATOR SCRIPT
// ===============================

export const libertarianSimulator = [
  {
    id: "0",
    title: "Orientation & Introduction",
    narrator: `Welcome to the Libertarian Federal Candidate Simulator. 
You’ll experience filing, compliance, messaging, and campaigning in a safe environment. 
You begin with 50 Candidate Coins (CC), 0 signatures, and 0% voter approval. 
Every typed decision will affect these metrics.`,
    prompt: `Which office will you run for: President, Senate, or House? 
Type your choice and I’ll explain the threshold you must meet.`,
    logic: (input, state) => {
      let office = input.toLowerCase();
      if (office.includes("president")) {
        state.threshold = { cc: 75, approval: 2.5, sigs: 25 };
        return `Running for President requires 75 CC + 2.5% approval OR 25% nationwide signatures.`;
      }
      if (office.includes("senate")) {
        state.threshold = { cc: 50, approval: 2.5, sigs: 14 };
        return `Running for Senate requires 50 CC + 2.5% approval OR 14% statewide signatures.`;
      }
      if (office.includes("house")) {
        state.threshold = { cc: 31, approval: 2.5, sigs: 7 };
        return `Running for House requires 31 CC + 2.5% approval OR 7% district signatures.`;
      }
      return "Please choose President, Senate, or House.";
    },
  },

  {
    id: "1",
    title: "Libertarian Party Filing",
    narrator: `As a Libertarian candidate, you must secure your party’s nomination and file with the Secretary of State. 
You can either pay the filing fee with CC or collect signatures from eligible voters.`,
    prompt: `Describe your filing strategy. Will you pay fees, gather signatures, or both?`,
    logic: (input, state) => {
      if (input.includes("fee")) {
        state.cc -= 10;
        state.approval += 0.5;
        return "You paid the filing fee. –10 CC, +0.5% approval.";
      }
      if (input.includes("sign")) {
        state.signatures += 200;
        state.approval += 0.3;
        return "You focused on signatures. +200 signatures, +0.3% approval.";
      }
      return "You’ll need a clearer strategy to move forward.";
    },
  },

  {
    id: "2",
    title: "Federal Filing Compliance",
    narrator: `You’ve passed the $5,000 threshold. Federal law requires Form 1 (Candidacy) and Form 2 (Organization). 
Mistakes cost CC and signatures.`,
    prompt: `Explain how you will ensure compliance — naming a treasurer, setting up a campaign bank account, and filing within 15 days.`,
    logic: (input, state) => {
      if (input.includes("treasurer") && input.includes("bank")) {
        state.cc += 2;
        state.signatures += 100;
        return "You filed correctly. +2 CC, +100 signatures.";
      }
      state.cc -= 1;
      state.signatures -= 50;
      return "Errors in your filing cost you –1 CC and –50 signatures.";
    },
  },

  {
    id: "3",
    title: "First Moves: Strategy & Spending",
    narrator: `It’s early summer. Decide how to spend your limited CC: advertising, travel, or press outreach.`,
    prompt: `Type your strategy for the first month.`,
    logic: (input, state) => {
      if (input.includes("advert")) {
        state.cc -= 15;
        state.approval += 1;
        return "Your ads boosted approval but burned CC. –15 CC, +1% approval.";
      }
      if (input.includes("travel")) {
        state.cc -= 10;
        state.signatures += 150;
        return "Your travel earned signatures. –10 CC, +150 signatures.";
      }
      if (input.includes("press")) {
        state.cc -= 5;
        state.approval += 0.5;
        return "Press outreach gained coverage. –5 CC, +0.5% approval.";
      }
      return "Try mentioning advertising, travel, or press outreach.";
    },
  },

  {
    id: "4",
    title: "Campaign Identity",
    narrator: `Now define your campaign identity with a slogan, mission statement, and announcement speech.`,
    prompt: `Type your slogan, mission, and speech.`,
    logic: (input, state) => {
      if (input.length > 50) {
        state.cc += 2;
        state.approval += 1;
        return "Strong identity! +2 CC, +1% approval.";
      }
      state.approval -= 0.5;
      return "Your identity felt weak. –0.5% approval.";
    },
  },

  {
    id: "5",
    title: "Expansion & Community Engagement",
    narrator: `Design logos, yard signs, shirts, and engage with constituents.`,
    prompt: `Describe your visuals and outreach strategy.`,
    logic: (input, state) => {
      if (input.includes("logo") || input.includes("sign")) {
        state.cc -= 5;
        state.signatures += 100;
        return "Your visuals improved recognition. –5 CC, +100 signatures.";
      }
      if (input.includes("town") || input.includes("community")) {
        state.approval += 1;
        state.signatures += 50;
        return "Community outreach boosted approval. +1% approval, +50 signatures.";
      }
      return "Voters didn’t notice much. No major change.";
    },
  },

  {
    id: "6",
    title: "September Compliance & Scenarios",
    narrator: `Time to file your FEC Form 3 and respond to September events: Constitution Day, postcards, and debate invites.`,
    prompt: `Describe your priorities. Which events do you focus on?`,
    logic: (input, state) => {
      if (input.includes("debate")) {
        state.approval += 1.5;
        return "Debate participation impressed voters. +1.5% approval.";
      }
      if (input.includes("postcard")) {
        state.cc -= 3;
        state.signatures += 75;
        return "Constituents appreciated your postcards. –3 CC, +75 signatures.";
      }
      if (input.includes("constitution")) {
        state.approval += 1;
        return "Constitution Day event raised approval. +1% approval.";
      }
      return "Skipping events cost momentum. –1% approval.";
    },
  },

  // ... Repeat pattern for Modules 7–15 with narration, prompt, and outcome logic
];

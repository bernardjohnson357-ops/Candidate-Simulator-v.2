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
You begin with 50 Candidate Coins (CC), 0 signatures, and 0% voter approval.
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
  // Module 1 – Libertarian Party Filing
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

      if (hasFee && hasSign) {
        state.cc -= 10;
        state.signatures += 200;
        state.approval += 0.7;
        return "You paid the filing fee and collected signatures. –10 CC, +200 signatures, +0.7% approval.";
      }
      if (hasFee) {
        state.cc -= 10;
        state.approval += 0.5;
        return "You paid the filing fee. –10 CC, +0.5% approval.";
      }
      if (hasSign) {
        state.signatures += 200;
        state.approval += 0.3;
        return "You collected signatures. +200 signatures, +0.3% approval.";
      }
      return "Your filing approach is unclear. Try mentioning 'fee' or 'signatures'.";
    },
  },

  // ------------------------------
  // Module 2 – Federal Filing Compliance
  // ------------------------------
  {
    id: "2",
    title: "Federal Filing Compliance",
    narrator: `Crossing $5,000 triggers federal reporting: Form 1 (Candidacy) and Form 2 (Organization).`,
    prompt: `How will you file correctly (treasurer, bank, 15-day deadline)?`,
    logic: (input: string, state: ModuleState) => {
      if (input.includes("treasurer") && input.includes("bank")) {
        state.cc += 2;
        state.signatures += 100;
        return "Filed correctly! +2 CC, +100 signatures.";
      }
      state.cc -= 1;
      state.signatures -= 50;
      return "Filing errors cost you –1 CC, –50 signatures.";
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
      const choice = input.toLowerCase();
      if (choice.includes("advertising")) {
        state.cc -= 5;
        state.approval += 1.0;
        return "You invested in advertising. –5 CC, +1.0% approval.";
      }
      if (choice.includes("travel")) {
        state.cc -= 3;
        state.signatures += 100;
        return "You traveled your district. –3 CC, +100 signatures.";
      }
      if (choice.includes("press")) {
        state.approval += 0.5;
        return "You reached out to the press. +0.5% approval.";
      }
      return "Action unclear. Please type 'advertising', 'travel', or 'press outreach'.";
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
      if (input.length > 20) {
        state.approval += 1.0;
        return "Strong messaging resonates! +1.0% approval.";
      }
      return "Your campaign identity feels weak. Try again.";
    },
  },

  // ------------------------------
// Module 5 – Fundraising & Donor Outreach (with upload option)
// ------------------------------
{
  id: "5",
  title: "Fundraising & Donor Outreach",
  narrator: `It's time to raise funds for your campaign. Effective fundraising increases your CC and helps with campaign activities. 
You may also upload campaign materials for review, such as a flyer or donor letter.`,
  prompt: `Choose one: "host event", "online campaign", "personal donors", or upload a campaign file.`,
  logic: (input: string, state: ModuleState) => {
    const choice = input.toLowerCase().trim();

    // Handle uploads (user attaches file)
    if (choice.includes("upload")) {
      state.approval += 0.3;
      return "Your campaign material was uploaded and reviewed. +0.3% approval.";
    }

    // Standard fundraising options
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
        return 'Action unclear. Please type "host event", "online campaign", "personal donors", or upload a file.';
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

  // ------------------------------
  // Module 7 – Local Media Outreach with Audio
  // ------------------------------
  {
    id: "7",
    title: "Local Media Outreach",
    narrator: `Engage with local media to raise awareness about your campaign.`,
    prompt: `Choose one: "interview", "press release", or "community event".`,
    logic: (input: string, state: ModuleState) => {
      const choice = input.toLowerCase().trim();

      // Audio (browser safe)
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        let audioMessage = "";
        switch (choice) {
          case "interview":
            audioMessage = "You are giving an interview on local radio.";
            break;
          case "press release":
            audioMessage = "You have released a press statement to local news.";
            break;
          case "community event":
            audioMessage = "You are hosting a community event for voters.";
            break;
          default:
            audioMessage = "No action detected for audio output.";
        }
        const utterance = new SpeechSynthesisUtterance(audioMessage);
        window.speechSynthesis.speak(utterance);
      }

      // Update state
      switch (choice) {
        case "interview":
          state.approval += 0.7;
          return "You did a local interview. +0.7% approval.";
        case "press release":
          state.signatures += 50;
          return "You issued a press release. +50 signatures.";
        case "community event":
          state.cc -= 5;
          state.approval += 0.5;
          state.signatures += 30;
          return "You held a community event. –5 CC, +0.5% approval, +30 signatures.";
        default:
          return 'Action unclear. Please type "interview", "press release", or "community event".';
      }
    },
  },

  // ------------------------------
  // Module 8 – Social Media Engagement
  // ------------------------------
  {
    id: "8",
    title: "Social Media Engagement",
    narrator: `Use social media to spread your campaign message and interact with voters.`,
    prompt: `Choose one: "tweet", "facebook post", or "video message".`,
    logic: (input: string, state: ModuleState) => {
      const choice = input.toLowerCase().trim();
      switch (choice) {
        case "tweet":
          state.approval += 0.3;
          state.signatures += 20;
          return "You tweeted about your campaign. +0.3% approval, +20 signatures.";
        case "facebook post":
          state.approval += 0.5;
          state.signatures += 40;
          return "You posted on Facebook. +0.5% approval, +40 signatures.";
        case "video message":
          state.approval += 0.7;
          state.cc -= 3;
          return "You recorded a video message. +0.7% approval, –3 CC.";
        default:
          return 'Action unclear. Please type "tweet", "facebook post", or "video message".';
      }
    },
  },

  // ------------------------------
  // Module 9 – Community Outreach
  // ------------------------------
  {
    id: "9",
    title: "Community Outreach",
    narrator: `Meet voters directly to increase support and gather signatures.`,
    prompt: `Choose one: "door-to-door", "town hall", or "volunteer event".`,
    logic: (input: string, state: ModuleState) => {
      const choice = input.toLowerCase().trim();
      switch (choice) {
        case "door-to-door":
          state.signatures += 100;
          state.approval += 0.4;
          return "You canvassed door-to-door. +100 signatures, +0.4% approval.";
        case "town hall":
          state.approval += 0.7;
          return "You hosted a town hall meeting. +0.7% approval.";
        case "volunteer event":
          state.cc -= 2;
          state.signatures += 50;
          return "You organized a volunteer event. –2 CC, +50 signatures.";
        default:
          return 'Action unclear. Please type "door-to-door", "town hall", or "volunteer event".';
      }
    },
  },

  // ------------------------------
  // Module 10 – Fundraising Strategy
  // ------------------------------
  {
    id: "10",
    title: "Fundraising Strategy",
    narrator: `Plan your next fundraising campaign to maximize resources.`,
    prompt: `Choose one: "major donors", "small donors", or "online fundraiser".`,
    logic: (input: string, state: ModuleState) => {
      const choice = input.toLowerCase().trim();
      switch (choice) {
        case "major donors":
          state.cc += 20;
          state.approval += 0.3;
          return "You focused on major donors. +20 CC, +0.3% approval.";
        case "small donors":
          state.cc += 10;
          state.signatures += 100;
          return "You reached out to small donors. +10 CC, +100 signatures.";
        case "online fundraiser":
          state.cc += 15;
          return "You ran an online fundraiser. +15 CC.";
        default:
          return 'Action unclear. Please type "major donors", "small donors", or "online fundraiser".';
      }
    },
  },
  
  // ------------------------------
// Module 11 – Debate Prep
// ------------------------------
{
  id: "11",
  title: "Debate Prep",
  narrator: `Debates are high-stakes events. How you prepare will influence your performance and voter approval.`,
  prompt: `Choose one: "policy focus", "rehearsal", or "ignore prep".`,
  logic: (input: string, state: ModuleState) => {
    const choice = input.toLowerCase().trim();
    switch (choice) {
      case "policy focus":
        state.approval += 1.0;
        return "You studied policies in detail. +1.0% approval.";
      case "rehearsal":
        state.approval += 0.7;
        state.signatures += 50;
        return "You rehearsed with your team. +0.7% approval, +50 signatures.";
      case "ignore prep":
        state.approval -= 0.5;
        return "You skipped debate prep. –0.5% approval.";
      default:
        return 'Action unclear. Please type "policy focus", "rehearsal", or "ignore prep".';
    }
  },
},

  // ------------------------------
// Module 12 – Debate Performance
// ------------------------------
{
  id: "12",
  title: "Debate Performance",
  narrator: `The debate has arrived. Your choices affect how voters and the media perceive you.`,
  prompt: `Choose one: "attack opponents", "stay positive", or "focus on issues".`,
  logic: (input: string, state: ModuleState) => {
    const choice = input.toLowerCase().trim();
    switch (choice) {
      case "attack opponents":
        state.approval -= 0.2;
        state.signatures += 100;
        return "You attacked your opponents. –0.2% approval, +100 signatures.";
      case "stay positive":
        state.approval += 0.8;
        return "You stayed positive throughout. +0.8% approval.";
      case "focus on issues":
        state.approval += 1.2;
        return "You focused on policy issues. +1.2% approval.";
      default:
        return 'Action unclear. Please type "attack opponents", "stay positive", or "focus on issues".';
    }
  },
},

// ------------------------------
// Module 13 – Crisis Response
// ------------------------------
{
  id: "13",
  title: "Crisis Response",
  narrator: `A local controversy impacts your campaign. How you respond matters.`,
  prompt: `Choose one: "issue statement", "stay silent", or "apologize".`,
  logic: (input: string, state: ModuleState) => {
    const choice = input.toLowerCase().trim();
    switch (choice) {
      case "issue statement":
        state.approval += 0.5;
        return "You addressed the crisis with a statement. +0.5% approval.";
      case "stay silent":
        state.approval -= 1.0;
        return "You stayed silent. –1.0% approval.";
      case "apologize":
        state.approval += 0.3;
        state.signatures += 50;
        return "You apologized and moved forward. +0.3% approval, +50 signatures.";
      default:
        return 'Action unclear. Please type "issue statement", "stay silent", or "apologize".';
    }
  },
},

  // ------------------------------
// Module 14 – Endorsements
// ------------------------------
{
  id: "14",
  title: "Endorsements",
  narrator: `Endorsements can bring credibility and resources to your campaign.`,
  prompt: `Choose one: "seek party leaders", "grassroots orgs", or "celebrities".`,
  logic: (input: string, state: ModuleState) => {
    const choice = input.toLowerCase().trim();
    switch (choice) {
      case "seek party leaders":
        state.approval += 0.8;
        return "You gained endorsements from party leaders. +0.8% approval.";
      case "grassroots orgs":
        state.signatures += 150;
        return "You were endorsed by grassroots organizations. +150 signatures.";
      case "celebrities":
        state.approval += 0.5;
        state.cc += 5;
        return "You secured celebrity endorsements. +0.5% approval, +5 CC.";
      default:
        return 'Action unclear. Please type "seek party leaders", "grassroots orgs", or "celebrities".';
    }
  },
},

  // ------------------------------
// Module 15 – Final Push
// ------------------------------
{
  id: "15",
  title: "Final Push",
  narrator: `The election is near. It’s your final opportunity to mobilize voters.`,
  prompt: `Choose one: "door knock", "phone bank", or "advertising blitz".`,
  logic: (input: string, state: ModuleState) => {
    const choice = input.toLowerCase().trim();
    switch (choice) {
      case "door knock":
        state.signatures += 200;
        return "You organized door knocking teams. +200 signatures.";
      case "phone bank":
        state.signatures += 150;
        state.approval += 0.5;
        return "You ran a phone banking campaign. +150 signatures, +0.5% approval.";
      case "advertising blitz":
        state.cc -= 10;
        state.approval += 1.0;
        return "You launched an advertising blitz. –10 CC, +1.0% approval.";
      default:
        return 'Action unclear. Please type "door knock", "phone bank", or "advertising blitz".';
    }
  },
}, // 👈 closes Module 15 object
]; // 👈 closes the libertarianSimulator array

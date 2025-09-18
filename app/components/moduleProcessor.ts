// app/components/moduleProcessor.ts

export type Office = "President" | "Senate" | "House";
export type Affiliation = "Independent" | "Party";

export interface CandidateState {
  office?: Office;
  affiliation?: Affiliation;
  party?: string;
  filingMethod?: "Fee" | "Petitions";
  CC: number;
  signatures: number;
  approval: number;
  currentModule: number; // 0–15
  slogan?: string;
  mission?: string;
  announcement?: string;
  speech?: string;
}

export interface ProcessResult {
  updatedState: CandidateState;
  text: string;
}

// ---------------- Helper Parsers ----------------
const parseOffice = (input: string): Office | null => {
  input = input.toLowerCase();
  if (input.includes("president")) return "President";
  if (input.includes("senate")) return "Senate";
  if (input.includes("house")) return "House";
  return null;
};

const parseAffiliation = (input: string): Affiliation | null => {
  input = input.toLowerCase();
  if (input.includes("party")) return "Party";
  if (input.includes("independent")) return "Independent";
  return null;
};

const parseYesNo = (input: string): boolean | null => {
  input = input.toLowerCase();
  if (input.includes("yes") || input.includes("accept")) return true;
  if (input.includes("no") || input.includes("decline")) return false;
  return null;
};

// ---------------- Main Function ----------------
export const processInput = (
  input: string,
  state: CandidateState
): ProcessResult => {
  const newState = { ...state };
  let text = "";

  // ---------------- Module 0 – Office Selection ----------------
  if (newState.currentModule === 0) {
    const office = parseOffice(input);
    if (office) {
      newState.office = office;
      text = `Great! You are running for ${office}. Now type "Party" or "Independent" to choose your affiliation.`;
      newState.currentModule = 0.5;
    } else {
      text = 'Please type "President", "Senate", or "House".';
    }
    return { updatedState: newState, text };
  }

  if (newState.currentModule === 0.5) {
    const affiliation = parseAffiliation(input);
    if (affiliation) {
      newState.affiliation = affiliation;
      text = `Understood! You will run as ${affiliation}. Next: Module 1 – Filing.`;
      newState.currentModule = 1;
    } else {
      text = 'Please type "Party" or "Independent" to continue.';
    }
    return { updatedState: newState, text };
  }

  // ---------------- Module 1 – Filing ----------------
  if (newState.currentModule === 1) {
    if (newState.affiliation === "Independent") {
      if (input.toLowerCase().includes("fee")) {
        newState.filingMethod = "Fee";
        newState.CC += 1;
        text = "You paid the filing fee. Next: Module 2A – Independent FEC Filing Quizzes.";
        newState.currentModule = 2;
      } else if (input.toLowerCase().includes("petition")) {
        newState.filingMethod = "Petitions";
        newState.signatures += 50;
        text = "You collected petitions successfully. Next: Module 2A – Independent FEC Filing Quizzes.";
        newState.currentModule = 2;
      } else {
        text = "Please type 'Fee' or 'Petitions' to continue.";
      }
    } else {
      // Party candidate
      newState.party = input;
      text = `You are running as ${input}. Type 'Fee' or 'Petitions' to complete filing.`;
      newState.currentModule = 1.5;
    }
    return { updatedState: newState, text };
  }

  if (newState.currentModule === 1.5) {
    if (input.toLowerCase().includes("fee")) {
      newState.filingMethod = "Fee";
      newState.CC += 1;
    } else {
      newState.filingMethod = "Petitions";
      newState.signatures += 30;
    }
    text = "Filing completed. Next: Module 2B – Party FEC Filing Quizzes.";
    newState.currentModule = 2;
    return { updatedState: newState, text };
  }

  // ---------------- Module 2 – FEC Quizzes ----------------
  if (newState.currentModule === 2) {
    if (input.toLowerCase().includes("form 1")) {
      newState.CC += 1;
      newState.signatures += 40;
      text = "Correct! You earned 1 CC and 40 signatures. Next module: 3 – First Moves.";
    } else {
      newState.CC -= 1;
      newState.signatures -= 20;
      text = "Incorrect. You lost 1 CC and 20 signatures. Next module: 3 – First Moves.";
    }
    newState.currentModule = 3;
    return { updatedState: newState, text };
  }

  // ---------------- Module 3 – First Moves ----------------
  if (newState.currentModule === 3) {
    if (input.toLowerCase().includes("advertising")) {
      newState.CC -= 5;
      newState.approval += 2;
      newState.signatures += 20;
      text = "Advertising chosen. CC -5, approval +2%, signatures +20. Next module: 4 – Campaign Identity.";
    } else if (input.toLowerCase().includes("travel")) {
      newState.CC -= 3;
      newState.signatures += 40;
      newState.approval += 1;
      text = "Travel chosen. CC -3, signatures +40, approval +1%. Next module: 4 – Campaign Identity.";
    } else if (input.toLowerCase().includes("press")) {
      newState.CC -= 4;
      newState.approval += 3;
      newState.signatures += 10;
      text = "Press outreach chosen. CC -4, approval +3%, signatures +10. Next module: 4 – Campaign Identity.";
    } else {
      text = "Invalid choice. Type 'Advertising', 'Travel', or 'Press Outreach'.";
      return { updatedState: newState, text };
    }
    newState.currentModule = 4;
    return { updatedState: newState, text };
  }

  // ---------------- Module 4 – Campaign Identity ----------------
  if (newState.currentModule === 4) {
    if (!newState.slogan) {
      newState.slogan = input;
      newState.approval += 1;
      text = `Slogan recorded: "${input}". Now type your mission statement.`;
      return { updatedState: newState, text };
    } else if (!newState.mission) {
      newState.mission = input;
      newState.approval += 2;
      newState.signatures += 10;
      text = "Mission recorded. Now write your announcement speech.";
      return { updatedState: newState, text };
    } else if (!newState.announcement) {
      newState.announcement = input;
      newState.approval += 2;
      newState.signatures += 15;
      text = "Announcement recorded. Next module: 5 – Campaign Expansion.";
      newState.currentModule = 5;
      return { updatedState: newState, text };
    }
  }

  // ---------------- Module 5 – Campaign Expansion ----------------
  if (newState.currentModule === 5) {
    if (input.toLowerCase().includes("design")) {
      newState.CC -= 5;
      newState.approval += 2;
      text = "Campaign materials designed. CC -5, approval +2%. Next: Endorsements.";
    } else if (input.toLowerCase().includes("volunteer")) {
      newState.approval += 1;
      text = "Relying on volunteers. Approval +1%. Next: Endorsements.";
    } else if (input.toLowerCase().includes("accept")) {
      newState.CC += 2;
      newState.approval += 3;
      text = "Endorsement accepted. CC +2, approval +3%. Next module: 6 – September Compliance.";
      newState.currentModule = 6;
      return { updatedState: newState, text };
    } else {
      text = "Invalid choice. Type 'Design', 'Volunteer', or 'Accept'.";
      return { updatedState: newState, text };
    }
    return { updatedState: newState, text };
  }

  // ---------------- Module 6 – September Compliance ----------------
  if (newState.currentModule === 6) {
    const answer = parseYesNo(input);
    if (answer === true) {
      newState.CC += 1;
      newState.signatures += 20;
      text = "Correct! Signatures +20, CC +1. Next module: 7 – Early October.";
    } else if (answer === false) {
      newState.CC -= 1;
      newState.signatures -= 10;
      text = "Incorrect. Signatures -10, CC -1. Next module: 7 – Early October.";
    } else {
      text = "Please answer 'Yes' or 'No'.";
      return { updatedState: newState, text };
    }
    newState.currentModule = 7;
    return { updatedState: newState, text };
  }

  // ---------------- Modules 7–15 ----------------
  if (newState.currentModule >= 7 && newState.currentModule <= 15) {
    // For simplicity, advance module per input and add small CC/signature/approval
    newState.CC += 1;
    newState.signatures += 5;
    newState.approval += 2;
    text = `Module ${newState.currentModule} completed. CC +1, signatures +5, approval +2.`;
    newState.currentModule += 1;
    if (newState.currentModule > 15) {
      text += " Congratulations! You have completed the simulation.";
    }
    return { updatedState: newState, text };
  }

  // ---------------- Fallback ----------------
  text = "Input received. Processing next module...";
  return { updatedState: newState, text };
};

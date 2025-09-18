// File: CandidateSimulator.tsx
import React, { useState } from "react";

type Office = "President" | "Senate" | "House";
type Affiliation = "Independent" | "Party";

interface CandidateState {
  office?: Office;
  affiliation?: Affiliation;
  party?: string;
  filingMethod?: "Fee" | "Petitions";
  CC: number;
  signatures: number;
  approval: number;
  currentModule: number; // 0–15
  speech?: string;
  slogan?: string;
  mission?: string;
  announcement?: string;
}

interface Message {
  sender: "AI" | "User";
  text: string;
}

const initialCandidateState: CandidateState = {
  CC: 50,
  signatures: 0,
  approval: 0,
  currentModule: 0,
};

export const CandidateSimulator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "AI",
      text: "Welcome to the Federal Candidate Simulator! Let's get started.",
    },
  ]);
  const [candidateState, setCandidateState] =
    useState<CandidateState>(initialCandidateState);
  const [input, setInput] = useState("");

  const handleUserInput = () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "User", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const response = processInput(input.trim(), candidateState);
    setCandidateState(response.updatedState);
    setMessages((prev) => [...prev, { sender: "AI", text: response.text }]);

    setInput("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto border rounded shadow">
      <div className="mb-4 h-96 overflow-y-auto border p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${msg.sender === "AI" ? "text-blue-600" : "text-green-600"}`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        className="w-full border p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
        placeholder="Type your response here..."
      />
    </div>
  );
};

// ---------------- Core Logic ----------------

interface ProcessResult {
  updatedState: CandidateState;
  text: string;
}

const processInput = (input: string, state: CandidateState): ProcessResult => {
  const newState = { ...state };
  let text = "";

  // Module 0 – Office selection
  if (newState.currentModule === 0) {
    const office = parseOffice(input);
    if (office) {
      newState.office = office;
      text = `Great! You are running for ${office}. Now, type "Party" or "Independent" to choose affiliation.`;
      newState.currentModule = 0.5; // temp step before branching
    } else if (newState.currentModule === 0.5) {
      const affiliation = parseAffiliation(input);
      if (affiliation) {
        newState.affiliation = affiliation;
        text = `Understood! You will run as ${affiliation}.`;
        newState.currentModule = 1;
      } else {
        text = 'Please type "Party" or "Independent" to continue.';
      }
    } else {
      text = 'Please type "President", "Senate", or "House" to continue.';
    }
    return { updatedState: newState, text };
  }

  // ---------------- Module 1A / 1B: Filing ----------------
  if (newState.currentModule === 1) {
    if (newState.affiliation === "Independent") {
      text = "Module 1A: Independent Filing. Type 'Fee' to pay or 'Petitions' to collect signatures.";
      newState.currentModule = 1.1;
      return { updatedState: newState, text };
    } else {
      text = "Module 1B: Party Filing. Type your party (Democrat, Republican, Libertarian, Green).";
      newState.currentModule = 1.5;
      return { updatedState: newState, text };
    }
  }

  if (newState.currentModule === 1.1) {
    // Independent filing method
    const method = input.toLowerCase().includes("fee") ? "Fee" : "Petitions";
    newState.filingMethod = method;
    newState.CC += method === "Fee" ? 1 : 0;
    newState.signatures += method === "Petitions" ? 50 : 0;
    text = `You chose ${method}. Module 2A – FEC Filing Quizzes will start next.`;
    newState.currentModule = 2;
    return { updatedState: newState, text };
  }

  if (newState.currentModule === 1.5) {
    // Party nomination
    newState.party = input;
    text = `You are running as ${input}. Type 'Fee' or 'Petitions' to complete filing.`;
    newState.currentModule = 1.6;
    return { updatedState: newState, text };
  }

  if (newState.currentModule === 1.6) {
    const method = input.toLowerCase().includes("fee") ? "Fee" : "Petitions";
    newState.filingMethod = method;
    newState.CC += 1;
    newState.signatures += 30;
    text = `Filing completed. Next is Module 2B – Party FEC Filing Quizzes.`;
    newState.currentModule = 2;
    return { updatedState: newState, text };
  }

  // ---------------- Module 2A / 2B: FEC Quizzes ----------------
  if (newState.currentModule === 2) {
    // Simplified: one quiz question for both types
    if (input.toLowerCase().includes("form 1")) {
      newState.CC += 1;
      newState.signatures += 40;
      text = "Correct! You earned 1 CC and 40 signatures. Next module is 3 – First Moves.";
    } else {
      newState.CC -= 1;
      newState.signatures -= 20;
      text = "Incorrect. You lost 1 CC and 20 signatures. Next module is 3 – First Moves.";
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
      text = "Invalid choice. Please type 'Advertising', 'Travel', or 'Press Outreach'.";
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
      text = "Campaign materials designed. CC -5, approval +2%. Next: endorsements.";
    } else if (input.toLowerCase().includes("volunteer")) {
      newState.approval += 1;
      text = "Relying on volunteers. Approval +1%. Next: endorsements.";
    } else if (input.toLowerCase().includes("accept")) {
      newState.CC += 2;
      newState.approval += 3;
      text = "Endorsement accepted. CC +2, approval +3%. Next module: 6 – September Compliance.";
      newState.currentModule = 6;
      return { updatedState: newState, text };
    } else {
      text = "Invalid choice. Please type 'Design', 'Volunteer', or 'Accept'.";
      return { updatedState: newState, text };
    }
    return { updatedState: newState, text };
  }

  // ---------------- Module 6 – September Compliance ----------------
  if (newState.currentModule === 6) {
    if (input.toLowerCase().includes("true")) {
      newState.signatures += 20;
      newState.CC += 1;
      text = "Correct! Signatures +20, CC +1. Next module: 7 – Early October.";
    } else {
      newState.signatures -= 10;
      newState.CC -= 1;
      text = "Incorrect. Signatures -10, CC -1. Next module: 7 – Early October.";
    }
    newState.currentModule = 7;
    return { updatedState: newState, text };
  }

  // ---------------- Fallback ----------------
  text = "Input received. Processing next module...";
  return { updatedState: newState, text };
};

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

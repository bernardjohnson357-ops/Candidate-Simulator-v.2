// app/ai/libertarianSimulator.ts

import { ModuleState } from "./moduleLogic";

export const libertarianSimulator = [
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
  // TODO: Add Modules 1–15
];

// ./app/ai/aiLoop.ts

import { CandidateState } from "./types";

export const initCandidateState = (office: "President" | "Senate" | "House"): CandidateState => {
  let threshold = { cc: 0, approval: 0, sigs: 0 };

  switch (office) {
    case "President":
      threshold = { cc: 75, approval: 2.5, sigs: 0 };
      break;
    case "Senate":
      threshold = { cc: 50, approval: 2.5, sigs: 0 };
      break;
    case "House":
      threshold = { cc: 31, approval: 2.5, sigs: 0 };
      break;
  }

  return {
    office,
    cc: 50,           // Starting Candidate Coins
    signatures: 0,    // Starting signatures
    approval: 0,      // Starting voter approval %
    threshold,
  };
};

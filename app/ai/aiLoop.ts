// ./app/ai/aiLoop.ts
import { CandidateState } from "./types";

export const initCandidateState = (office: "President" | "Senate" | "House"): CandidateState => {
  let cc = 50; // default starting Candidate Coins
  let threshold = { cc: 0, approval: 0, sigs: undefined };

  switch (office) {
    case "President":
      threshold = { cc: 75, approval: 2.5 };
      break;
    case "Senate":
      threshold = { cc: 50, approval: 2.5 };
      break;
    case "House":
      threshold = { cc: 31, approval: 2.5 };
      break;
  }

  return {
    office,
    cc,
    signatures: 0,
    approval: 0,
    threshold,
  };
};

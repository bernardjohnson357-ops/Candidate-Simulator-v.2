export const modules = {
  // ===== Independent Path =====
  "1A": {
    briefSummary: "Independent and write-in candidates must file with the Texas Secretary of State before seeking federal ballot access.",
    detailedSummary: `
Independent and write-in candidates face specific filing requirements at the state level. 
They must submit the proper forms to the Secretary of State, either paying the required filing fee or collecting enough signatures to qualify for the ballot. 
After state filing, candidates prepare for federal compliance, tracking contributions and expenditures for eventual FEC reporting.
    `,
    quiz: [
      {
        type: "mcq",
        question: "Which office handles independent/write-in candidate filings in Texas?",
        options: ["A) County Clerk", "B) Secretary of State", "C) Governor’s Office", "D) State Supreme Court"],
        correct: "B",
        rewards: { cc80: 1, cc100: 2, sig80: 80, sig100: 100 }
      },
      {
        type: "mcq",
        question: "What is one way to qualify for the ballot as an independent candidate?",
        options: ["A) Fundraise $500", "B) File with SOS + pay fee", "C) Skip state filing", "D) Petition local mayor"],
        correct: "B",
        rewards: { cc80: 1, cc100: 2, sig80: 80, sig100: 100 }
      },
      {
        type: "open",
        question: "Briefly explain why the state filing step is important before federal filing.",
        expectedKeywords: ["ballot", "requirement", "state", "qualify"],
        rewards: { cc: 2, sig: 150 }
      },
      {
        type: "open",
        question: "What challenges might an independent candidate face when gathering signatures?",
        expectedKeywords: ["time", "resources", "voter", "threshold"],
        rewards: { cc: 2, sig: 200 }
      },
      {
        type: "mcq",
        question: "Which form is filed after completing state-level requirements to declare federal candidacy?",
        options: ["A) FEC Form 1", "B) FEC Form 2", "C) FEC Form 3", "D) SOS Nomination"],
        correct: "A",
        rewards: { cc80: 1, cc100: 2, sig80: 80, sig100: 100 }
      }
    ]
  },

  "2A": {
    briefSummary: "Independent candidates must file FEC Forms 1 and 2 to establish federal candidacy and register their campaign committee.",
    detailedSummary: `
Federal law requires independent candidates to file key forms once campaign activity passes certain thresholds. 
Form 1 (Statement of Candidacy) declares candidacy. 
Form 2 (Statement of Organization) registers the campaign committee and initial financial information. 
Accurate and timely filings are essential to compliance, credibility, and ballot eligibility.
    `,
    quiz: [
      {
        type: "mcq",
        question: "What does FEC Form 1 (Statement of Candidacy) do?",
        options: ["A) Declares candidacy", "B) Registers campaign committee", "C) Reports quarterly finances", "D) Requests ballot signatures"],
        correct: "A",
        rewards: { cc80: 1, cc100: 2, sig80: 100, sig100: 150 }
      },
      {
        type: "mcq",
        question: "What does FEC Form 2 (Statement of Organization) establish?",
        options: ["A) Campaign finances", "B) Campaign committee", "C) Ballot petition", "D) Candidate speech record"],
        correct: "B",
        rewards: { cc80: 1, cc100: 2, sig80: 100, sig100: 150 }
      },
      {
        type: "open",
        question: "Why is timely filing of FEC Forms 1 and 2 critical for a candidate?",
        expectedKeywords: ["compliance", "credibility", "ballot", "federal"],
        rewards: { cc: 2, sig: 200 }
      },
      {
        type: "mcq",
        question: "Which financial threshold triggers the requirement to file with the FEC?",
        options: ["A) $100", "B) $500", "C) $5,000", "D) $50,000"],
        correct: "C",
        rewards: { cc80: 1, cc100: 2, sig80: 100, sig100: 200 }
      },
      {
        type: "open",
        question: "What risks do candidates face if they fail to file Forms 1 or 2 on time?",
        expectedKeywords: ["penalty", "fine", "ineligible", "violation"],
        rewards: { cc: 2, sig: 150 }
      }
    ]
  },

  // ===== Party Path =====
  "1B": {
    briefSummary: "Party candidates must complete state-level filing and prepare for FEC reporting to secure ballot access.",
    detailedSummary: `
Party candidates begin with filing requirements at the state level, submitting nomination forms and meeting either fee or signature thresholds. 
They must then comply with federal law by submitting FEC Form 1 (Statement of Candidacy) and FEC Form 2 (Statement of Organization). 
This dual compliance ensures ballot access and campaign legitimacy.
    `,
    quiz: [
      {
        type: "mcq",
        question: "Which initial filing is required for a party candidate in Texas?",
        options: ["A) SOS Nomination", "B) FEC Form 1", "C) FEC Form 2", "D) State Supreme Court Order"],
        correct: "A",
        rewards: { cc80: 1, cc100: 2, sig80: 70, sig100: 120 }
      },
      {
        type: "mcq",
        question: "What does FEC Form 1 establish?",
        options: ["A) Ballot qualification", "B) Statement of Candidacy", "C) Statement of Organization", "D) Quarterly fundraising report"],
        correct: "B",
        rewards: { cc80: 1, cc100: 2, sig80: 70, sig100: 120 }
      },
      {
        type: "open",
        question: "Why is state-level filing essential before federal reporting for party candidates?",
        expectedKeywords: ["ballot", "eligibility", "state", "requirement"],
        rewards: { cc: 2, sig: 150 }
      },
      {
        type: "open",
        question: "What’s one advantage party candidates have over independents in filing?",
        expectedKeywords: ["infrastructure", "resources", "support", "organization"],
        rewards: { cc: 2, sig: 150 }
      },
      {
        type: "mcq",
        question: "After filing Form 1, what is the next step federally?",
        options: ["A) File quarterly report", "B) File Form 2", "C) Gather voter petitions", "D) Notify Secretary of State"],
        correct: "B",
        rewards: { cc80: 1, cc100: 2, sig80: 70, sig100: 120 }
      }
    ]
  },

  "2B": {
    briefSummary: "Party candidates must file FEC Forms 1 and 2 to declare candidacy and register their campaign committee.",
    detailedSummary: `
Federal law requires party candidates to comply with both state and federal filing rules. 
After declaring candidacy (Form 1), they must establish their campaign committee and finances (Form 2). 
This ensures transparency, credibility, and legal compliance before campaigning.
    `,
    quiz: [
      {
        type: "mcq",
        question: "At what point must candidates file with the FEC?",
        options: ["A) After raising/spending $5,000", "B) Immediately after announcing", "C) Only after state approval", "D) After general election"],
        correct: "A",
        rewards: { cc80: 1, cc100: 2, sig80: 90, sig100: 150 }
      },
      {
        type: "mcq",
        question: "Which form officially registers the campaign committee?",
        options: ["A) Form 1", "B) Form 2", "C) Form 3", "D) SOS Nomination"],
        correct: "B",
        rewards: { cc80: 1, cc100: 2, sig80: 90, sig100: 150 }
      },
      {
        type: "open",
        question: "Why do accurate FEC filings matter for a candidate’s credibility?",
        expectedKeywords: ["trust", "voters", "transparency", "legal"],
        rewards: { cc: 2, sig: 150 }
      },
      {
        type: "open",
        question: "What penalties could arise from failing to file Forms 1 or 2?",
        expectedKeywords: ["fine", "penalty", "disqualification", "legal"],
        rewards: { cc: 2, sig: 200 }
      },
      {
        type: "mcq",
        question: "Which form comes after establishing a committee and declaring candidacy?",
        options: ["A) Form 3 (Quarterly Report)", "B) Form 5", "C) SOS Petition", "D) State Nomination"],
        correct: "A",
        rewards: { cc80: 1, cc100: 2, sig80: 90, sig100: 150 }
      }
    ]
  }
};

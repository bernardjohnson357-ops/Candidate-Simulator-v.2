// app/page.tsx
// Candidate Simulator Module Scaffold // This is a ready-to-load structure for Modules 0-15

const candidateState = { CC: 50, signatures: 0, voterApproval: 0.0, currentModule: 0, branch: null };

const modules = [ { id: 0, name: 'Orientation', type: 'read', content: 'Introduction to Candidate Simulator, CC system, scaffolded learning.', checkpoints: [ { prompt: 'Explain why reading before writing and speaking is important.' } ], next: 1 }, { id: 1, name: 'Branch Selection', type: 'choice', options: ['Independent', 'Party', 'Write-In'], content: 'Choose your candidate path; this determines your module branch.', next: { Independent: 2, Party: 2, 'Write-In': 2 } }, { id: 2, name: 'Module 1A/1B - State Filing', type: 'quiz', content: 'Complete SOS filing quiz for your branch.', scoring: { correct: { signatures: 50, CC: 5 }, incorrect: { signatures: -50, CC: -1 }, retakePenaltyMultiplier: 2 }, next: 3 }, { id: 3, name: 'Module 2A/2B - FEC Forms 1 & 2', type: 'quiz', content: 'Submit Form 1 & 2 quiz.', scoring: { correct: { signatures: 80, CC: 10 }, incorrect: { signatures: -50, CC: -1 }, retakePenaltyMultiplier: 2 }, next: 4 }, // General Election Modules 3-10 ...Array.from({ length: 8 }, (, i) => ({ id: 4 + i, name: Module ${3 + i} - General Election, type: 'scenario', content: Interactive campaign scenario for module ${3 + i}., checkpoints: [ { prompt: 'Make strategic decision or answer scenario questions.' } ], next: 5 + i })), // Election Week Modules 11-15 ...Array.from({ length: 5 }, (, i) => ({ id: 12 + i, name: Module ${11 + i} - Election Week, type: 'scenario', content: Election week interactive scenario ${11 + i}., checkpoints: [ { prompt: 'Respond to scenario or debate challenge.' } ], next: 13 + i })) ];

function getCurrentModule() { return modules.find(m => m.id === candidateState.currentModule); }

function advanceModule() { const module = getCurrentModule(); if (typeof module.next === 'number') { candidateState.currentModule = module.next; } else if (typeof module.next === 'object' && candidateState.branch) { candidateState.currentModule = module.next[candidateState.branch]; } }

function updateCandidateState({ CC = 0, signatures = 0, voterApproval = 0 }) { candidateState.CC += CC; candidateState.signatures += signatures; candidateState.voterApproval += voterApproval; }

export { candidateState, modules, getCurrentModule, advanceModule, updateCandidateState };


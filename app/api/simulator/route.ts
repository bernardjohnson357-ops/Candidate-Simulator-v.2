// app/api/simulator/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ---------------------------
// Mock database (replace with real DB in production)
interface UserState {
  userId: string;
  path: 'Independent' | 'Party' | 'thirdParty';
  currentModule: string;
  cc: number;
  signatures: number;
  completedQuizzes: string[];
  fecFilings: string[];
}

const userDB = new Map<string, UserState>();

// ---------------------------
// Utility functions
function getUserState(userId: string): UserState {
  if (!userDB.has(userId)) {
    const defaultState: UserState = {
      userId,
      path: 'thirdParty', // default path for new users
      currentModule: '0',
      cc: 50,
      signatures: 0,
      completedQuizzes: [],
      fecFilings: [],
    };
    userDB.set(userId, defaultState);
    return defaultState;
  }
  return userDB.get(userId)!;
}

function saveUserState(userId: string, state: UserState) {
  userDB.set(userId, state);
}

function evaluateQuiz(quizId: string, answers: any) {
  const score = Math.floor(Math.random() * 41) + 60; // Random 60-100
  const earnedCC = score === 100 ? 2 : 1;
  const earnedSignatures = Math.floor(score); 
  return { score, earnedCC, earnedSignatures };
}

function checkFECTrigger(user: UserState): boolean {
  return user.cc >= 50 && !user.fecFilings.includes(user.currentModule);
}

function getNextStep(user: UserState) {
  // If user hasn't started Module 1, show filing guide & quiz
  if (user.currentModule === '0') {
    return {
      message: `Welcome! You chose path: ${user.path}, filing option: signatures.\n\nStep 1: Read the FEC filing guide:\n- TX Independent Filing Guide: https://www.sos.state.tx.us/elections/candidates/guide/2024/ind2024.shtml\n- Candidate Simulator Homepage: https://www.bernardjohnson4congress.com/candidate_simulator_homepage_-test_mode\n- FEC Candidate Guide: https://www.fec.gov/resources/cms-content/documents/policy-guidance/candgui.pdf\n\nStep 2: Take the FEC Filing Fee Quiz to simulate paying your filing fee and earning signatures.`,
      nextTask: 'FEC Filing Fee Quiz',
      currentModule: '1A', // start Module 1
    };
  }

  // Default next step
  return {
    message: 'Continue your current module or proceed to the next quiz/task.',
    nextTask: null,
    currentModule: user.currentModule,
  };
}

// ---------------------------
// API Route
export async function POST(req: NextRequest) {
  try {
    const { userId, action, payload } = await req.json();
    const user = getUserState(userId);

    switch (action) {
      case 'init':
        // Return next step for new or returning user
        return NextResponse.json(getNextStep(user));

      case 'completeQuiz': {
        const { quizId, answers } = payload;
        const result = evaluateQuiz(quizId, answers);

        user.cc += result.earnedCC;
        user.signatures += result.earnedSignatures;
        user.completedQuizzes.push(quizId);

        let fecTriggered = false;
        let nextTask = null;

        if (checkFECTrigger(user)) {
          fecTriggered = true;
          nextTask = 'FEC Filing Quiz';
          user.fecFilings.push(user.currentModule);
          user.currentModule += '_FECQuiz';
        }

        saveUserState(userId, user);

        return NextResponse.json({
          message: 'Quiz completed',
          score: result.score,
          earnedCC: result.earnedCC,
          earnedSignatures: result.earnedSignatures,
          fecTriggered,
          nextTask,
          currentModule: user.currentModule,
          cc: user.cc,
          signatures: user.signatures,
        });
      }

      case 'spendCC': {
        const { amount } = payload;
        if (amount > user.cc) {
          return NextResponse.json({ error: 'Not enough CC' }, { status: 400 });
        }
        user.cc -= amount;

        let fecTriggered = false;
        let nextTask = null;

        if (checkFECTrigger(user)) {
          fecTriggered = true;
          nextTask = 'FEC Filing Quiz';
          user.fecFilings.push(user.currentModule);
          user.currentModule += '_FECQuiz';
        }

        saveUserState(userId, user);

        return NextResponse.json({
          message: `Spent ${amount} CC`,
          cc: user.cc,
          fecTriggered,
          nextTask,
          currentModule: user.currentModule,
        });
      }

      case 'nextModule': {
        const { nextModule } = payload;
        user.currentModule = nextModule;

        saveUserState(userId, user);

        return NextResponse.json({
          message: `Moved to module ${nextModule}`,
          currentModule: user.currentModule,
        });
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process request', details: err }, { status: 500 });
  }
}

// app/api/simulator/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ---------------------------
// Mock database (replace with real DB in production)
interface UserState {
  userId: string;
  path: 'Independent' | 'Party';
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
    // Initialize default state
    userDB.set(userId, {
      userId,
      path: 'Independent',
      currentModule: '0',
      cc: 50,
      signatures: 0,
      completedQuizzes: [],
      fecFilings: [],
    });
  }
  return userDB.get(userId)!;
}

function saveUserState(userId: string, state: UserState) {
  userDB.set(userId, state);
}

function evaluateQuiz(quizId: string, answers: any): { score: number; earnedCC: number; earnedSignatures: number } {
  // Replace with real quiz logic
  const score = Math.floor(Math.random() * 41) + 60; // Random 60-100
  const earnedCC = score === 100 ? 2 : 1;
  const earnedSignatures = Math.floor(score); // 1 point = 1 signature in this mock
  return { score, earnedCC, earnedSignatures };
}

function checkFECTrigger(user: UserState): boolean {
  // Spending 50+ CC triggers FEC filing
  return user.cc >= 50 && !user.fecFilings.includes(user.currentModule);
}

// ---------------------------
// API Route
export async function POST(req: NextRequest) {
  try {
    const { userId, action, payload } = await req.json();
    const user = getUserState(userId);

    switch (action) {
      case 'completeQuiz': {
        const { quizId, answers } = payload;
        const result = evaluateQuiz(quizId, answers);

        user.cc += result.earnedCC;
        user.signatures += result.earnedSignatures;
        user.completedQuizzes.push(quizId);

        // Check if FEC filing is triggered
        let fecTriggered = false;
        if (checkFECTrigger(user)) {
          fecTriggered = true;
          user.fecFilings.push(user.currentModule);
        }

        saveUserState(userId, user);

        return NextResponse.json({
          message: 'Quiz completed',
          score: result.score,
          earnedCC: result.earnedCC,
          earnedSignatures: result.earnedSignatures,
          fecTriggered,
          nextModule: user.currentModule,
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

        saveUserState(userId, user);

        return NextResponse.json({
          message: `Spent ${amount} CC`,
          cc: user.cc,
          fecTriggered: checkFECTrigger(user),
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

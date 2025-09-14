// hooks/useGameState.ts
// Inside your useGameState hook
function completeQuiz(quizId: string, score: number) {
  setState(prev => {
    const quizAlreadyCompleted = prev.quizzesCompleted.includes(quizId);
    if (quizAlreadyCompleted) {
      // Optionally ignore or double penalty for retakes
      return prev;
    }

    // Determine signatures earned
    const baseSignatures = score;
    const bonusCC = score === 100 ? 2 : score >= 80 ? 1 : 0;
    const penaltyCC = score < 80 ? -1 : 0;

    // Update totals
    const newCC = prev.CC + bonusCC + penaltyCC;
    const newSignatures = prev.signatures + baseSignatures;
    const newVoterApproval = newSignatures / 100; // 100 sig = 1% approval

    return {
      ...prev,
      CC: newCC,
      signatures: newSignatures,
      voterApproval: newVoterApproval,
      quizzesCompleted: [...prev.quizzesCompleted, quizId],
    };
  });
}

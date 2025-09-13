// app/components/ModulePage.tsx
import { useGameState } from "@/hooks/useGameState";
import QuizCard from "@/components/ui/QuizCard";

export default function ModulePage() {
  const { state, loading, currentQuizzes, completeQuiz } = useGameState();

  if (loading) return <div>Loading module...</div>;
  if (!state) return <div>Error loading state.</div>;

  return (
    <div className="space-y-6 p-4">
      {/* User Dashboard */}
      <div className="p-4 bg-gray-100 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Campaign Dashboard</h2>
        <div>Current Module: {state.currentModule}</div>
        <div>Candidate Coins (CC): {state.cc}</div>
        <div>Signatures Collected: {state.signatures}</div>
        <div>Voter Approval: {state.voterApproval.toFixed(1)}%</div>
      </div>

      {/* Quizzes */}
      <div className="space-y-4">
        {currentQuizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} onSubmit={completeQuiz} />
        ))}
      </div>
    </div>
  );
}

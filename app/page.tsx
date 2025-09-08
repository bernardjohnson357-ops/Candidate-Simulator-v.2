import CandidateInteraction from "./components/CandidateInteraction";

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Candidate Simulator</h1>
      <CandidateInteraction />
    </div>
  );
}

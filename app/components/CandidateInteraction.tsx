type CandidateInteractionProps = {
  userPath: "independent" | "thirdParty";
  filingOption: "payFee" | "signatures";
};

export default function CandidateInteraction({ userPath, filingOption }: CandidateInteractionProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Candidate Interaction</h2>
      <p><strong>Path:</strong> {userPath}</p>
      <p><strong>Filing Option:</strong> {filingOption}</p>
      <p className="mt-4">
        This is where the AI-driven simulation and quizzes will appear.
      </p>
    </div>
  );
}

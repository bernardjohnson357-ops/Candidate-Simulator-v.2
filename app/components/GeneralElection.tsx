"use client";

import { useGameState } from "@/context/GameContext";

export default function GeneralElection() {
  const { cc, signatures, voterApproval } = useGameState();
  const qualified = cc >= 20 && signatures >= 10000;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">🎉 General Election Stage</h2>

      <div className="space-y-2">
        <p><strong>Candidate Coins (CC):</strong> {cc}</p>
        <p><strong>Signatures:</strong> {signatures}</p>
        <p><strong>Voter Approval:</strong> {(voterApproval * 100).toFixed(1)}%</p>
      </div>

      {qualified ? (
        <div className="bg-green-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-green-700">You’re on the ballot!</h3>
          <p>
            Congratulations — you met the deadlines and qualified for the General Election in May.
            From here, you can campaign, debate, and fight for votes!
          </p>
        </div>
      ) : (
        <div className="bg-red-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-red-700">Ballot Access Failed</h3>
          <p>
            Unfortunately, you didn’t gather enough resources or signatures to qualify for the
            General Election. Try again with a different strategy!
          </p>
        </div>
      )}
    </div>
  );
}

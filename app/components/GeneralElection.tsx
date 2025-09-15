"use client";

import { useGameState } from "@/context/GameStateContext";

export default function GeneralElection() {
  const { cc, signatures, voterApproval } = useGameState();
  const qualified = cc >= 20 && signatures >= 10000;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">🎉 General Election Stage</h2>
      <p><strong>Candidate Coins (CC):</strong> {cc}</p>
      <p><strong>Signatures:</strong> {signatures}</p>
      <p><strong>Voter Approval:</strong> {(voterApproval*100).toFixed(1)}%</p>
      {qualified ? (
        <div className="bg-green-100 p-4 rounded

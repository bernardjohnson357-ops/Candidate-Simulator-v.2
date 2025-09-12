// pages/api/gameState.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getGameState, initGameState, updateGameState } from "../../lib/gameState";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const state = await getGameState() || await initGameState();
    return res.status(200).json(state);
  }

  if (req.method === "POST") {
    const newState = req.body;
    await updateGameState(newState);
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: "Method not allowed" });
}

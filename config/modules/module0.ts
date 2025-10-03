import { Module } from "../../app/ai/types";

export const module0: Module = {
  id: "0",
  title: "Orientation & Introduction",
  description:
    "Welcome to the Federal Candidate Simulator. You’ll learn how Candidate Coins (CC), signatures, and voter approval work. Choose whether to run for President, Senate, or House.",
  tasks: [
    { id: "0-1", type: "read", prompt: "Read the campaign manual and scoring system." },
    { id: "0-2", type: "write", prompt: "Declare which office you are running for." },
    { id: "0-3", type: "speak", prompt: "Optionally speak your choice of office." },
    { id: "0-4", type: "upload", prompt: "Optionally upload a campaign-related image." },
  ],
};

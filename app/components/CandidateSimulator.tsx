// File: app/components/CandidateSimulator.tsx
"use client";
import React, { useState, useEffect } from "react";
import { libertarianSimulator } from "../utils/libertarianSimulator";
import { ModuleState, CandidateState, Task } from "../ai/types";

const CandidateSimulator: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Candidate-wide state
  const [candidate, setCandidate] = useState<CandidateState>({
    office: "House", // default until user picks
    cc: 50,
    signatures: 0,
    approval: 0,
    threshold: {
      cc: 31,
      approval: 2.5,
      sigs: 7,
    },
  });

  // Module-specific state
  const [moduleState, setModuleState] = useState<ModuleState>({
    moduleId: libertarianSimulator[0].id,
    completedTasks: 0,
    totalTasks: libertarianSimulator[0].tasks.length,
    ccChange: 0,
    signaturesChange: 0,
    approvalChange: 0,
    finished: false,
  });

  const currentModule = libertarianSimulator[currentIndex];

  // ------------------------------
  // Auto-run tasks whenever the module changes
  useEffect(() => {
    const runModuleTasks = async () => {
      for (const task of currentModule.tasks) {
        await handleTask(task);
      }

      // Mark module finished
      setModuleState((prev) => ({ ...prev, finished: true }));

      // Update candidate state with module changes
      setCandidate((prev) => ({
        ...prev,
        cc: prev.cc + (moduleState.ccChange || 0),
        signatures: prev.signatures + (moduleState.signaturesChange || 0),
        approval: prev.approval + (moduleState.approvalChange || 0),
      }));

      console.log(
        `Module ${currentModule.id} completed. CC: ${candidate.cc}, Signatures: ${candidate.signatures}, Approval: ${candidate.approval.toFixed(
          2
        )}%`
      );

      // Advance to next module if available
      if (currentIndex + 1 < libertarianSimulator.length) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setModuleState({
          moduleId: libertarianSimulator[nextIndex].id,
          completedTasks: 0,
          totalTasks: libertarianSimulator[nextIndex].tasks.length,
          ccChange: 0,
          signaturesChange: 0,
          approvalChange: 0,
          finished: false,
        });
      }
    };

    runModuleTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // ------------------------------
  // Simulated task handler
  const handleTask = async (task: Task) => {
    console.log(`Task: [${task.type}] ${task.prompt}`);

    // Simulate delay for reading / writing / speaking
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Apply example rewards (replace with AI/narration logic)
    setModuleState((prev) => {
      let newCC = prev.ccChange || 0;
      let newSigs = prev.signaturesChange || 0;
      let newApp = prev.approvalChange || 0;

      switch (task.type) {
        case "read":
          newApp += 0.1;
          break;
        case "write":
          newSigs += 5;
          newCC += 1;
          break;
        case "speak":
          newApp += 0.5;
          break;
        case "upload":
          newCC += 2;
          break;
      }

      return {
        ...prev,
        ccChange: newCC,
        signaturesChange: newSigs,
        approvalChange: newApp,
        completedTasks: prev.completedTasks + 1,
      };
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>
        Module {currentModule.id}: {currentModule.title}
      </h2>
      <p>{currentModule.description}</p>
      <p>
        Candidate CC: {candidate.cc}, Signatures: {candidate.signatures},{" "}
        Approval: {candidate.approval.toFixed(2)}%
      </p>
    </div>
  );
};

export default CandidateSimulator;

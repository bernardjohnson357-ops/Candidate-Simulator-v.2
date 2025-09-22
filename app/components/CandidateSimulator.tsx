// File: app/components/CandidateSimulator.tsx
"use client";
import React, { useState, useEffect } from "react";
import { libertarianSimulator } from "../utils/libertarianSimulator";
import { ModuleState, CandidateState, Task } from "../ai/types";

const CandidateSimulator: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [candidate, setCandidate] = useState<CandidateState>({
    office: "House",
    cc: 50,
    signatures: 0,
    approval: 0,
    threshold: { cc: 31, approval: 2.5, sigs: 7 },
  });

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

  useEffect(() => {
    const runModuleTasks = async () => {
      for (const task of currentModule.tasks) {
        await handleTask(task);
        setModuleState((prev) => ({ ...prev, completedTasks: prev.completedTasks + 1 }));
      }

      setModuleState((prev) => ({ ...prev, finished: true }));

      setCandidate((prev) => ({
        ...prev,
        cc: prev.cc + (moduleState.ccChange || 0),
        signatures: prev.signatures + (moduleState.signaturesChange || 0),
        approval: prev.approval + (moduleState.approvalChange || 0),
      }));

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

  const handleTask = async (task: Task) => {
    console.log(`Task: [${task.type}] ${task.prompt}`);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setModuleState((prev) => {
      let cc = prev.ccChange || 0;
      let sigs = prev.signaturesChange || 0;
      let app = prev.approvalChange || 0;

      switch (task.type) {
        case "read":
          app += 0.1;
          break;
        case "write":
          sigs += 5;
          cc += 1;
          break;
        case "speak":
          app += 0.5;
          break;
        case "upload":
          cc += 2;
          break;
      }

      return { ...prev, ccChange: cc, signaturesChange: sigs, approvalChange: app };
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>
        Module {currentModule.id}: {currentModule.title}
      </h2>
      <p>{currentModule.description}</p>
      {currentIndex < 7 && (
        <p style={{ fontStyle: "italic" }}>
          Typing is preferred until Module 7; you may also speak or upload images.
        </p>
      )}
      <p>
        Candidate CC: {candidate.cc}, Signatures: {candidate.signatures}, Approval:{" "}
        {candidate.approval.toFixed(2)}%
      </p>
    </div>
  );
};

export default CandidateSimulator;

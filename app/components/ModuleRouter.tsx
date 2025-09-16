// app/components/ModuleRouter.tsx
"use client";

import React, { useEffect, useMemo } from "react";
import type { FC } from "react";
import { useGameContext } from "@/context/GameContext";

type ModuleDef = {
  id: string;
  title: string;
  branch?: "independent" | "party" | "writein" | "general" | "any";
  contentPath?: string;
  meta?: Record<string, unknown>;
};

type Props = {
  renderModule: (module: ModuleDef, onComplete: () => void) => React.ReactNode;
  forceBranch?: "independent" | "party" | "writein" | null;
};

const fallbackRoadmap: ModuleDef[] = [
  { id: "0", title: "Module 0 – Orientation", branch: "any" },
  { id: "1A", title: "Module 1A – Independent / Write-In Filing", branch: "independent" },
  { id: "1B", title: "Module 1B – Party Filing", branch: "party" },
  { id: "2A", title: "Module 2A – FEC Filing Fee Quizzes (Independent)", branch: "independent" },
  { id: "2B", title: "Module 2B – FEC Filing Fee Quizzes (Party)", branch: "party" },
  { id: "3", title: "Module 3 – First Moves (May)", branch: "general" },
  { id: "4", title: "Module 4 – Campaign Identity (June)", branch: "general" },
  { id: "5", title: "Module 5 – Campaign Imagery (July/August)", branch: "general" },
  { id: "6", title: "Module 6 – September (Compliance & Scenarios)", branch: "general" },
  { id: "7", title: "Module 7 – Oct 1–7", branch: "general" },
  { id: "8", title: "Module 8 – Oct 8–14", branch: "general" },
  { id: "9", title: "Module 9 – Oct 15–22 (Final Push)", branch: "general" },
  { id: "10", title: "Module 10 – Oct 23–29 (Election Countdown)", branch: "general" },
  { id: "11", title: "Module 11 – Election Week A", branch: "general" },
  { id: "12", title: "Module 12 – Election Week B", branch: "general" },
  { id: "13", title: "Module 13 – Election Week C", branch: "general" },
  { id: "14", title: "Module 14 – Post-Election Tasks", branch: "general" },
  { id: "15", title: "Module 15 – Final Summary", branch: "general" },
];

export const ModuleRouter: FC<Props> = ({ renderModule, forceBranch = null }) => {
  const { state, updateState } = useGameContext();

  const roadmap = useMemo<ModuleDef[]>(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const cfg = require("@/config/reference_roadmap.json");
      if (Array.isArray(cfg) && cfg.length > 0) return cfg;
    } catch {
      // fallback to internal roadmap
    }
    return fallbackRoadmap;
  }, []);

  const moduleIndex = Math.max(0, Math.min(state.module ?? 0, roadmap.length - 1));
  const module = roadmap[moduleIndex];

  const completeModule = () => {
    const nextIndex = Math.min(moduleIndex + 1, roadmap.length - 1);
    updateState({ module: nextIndex });
  };

  useEffect(() => {
    if (!forceBranch) return;
    const active = roadmap[moduleIndex];
    if (!active) return;
    if (active.branch && active.branch !== "any" && active.branch !== forceBranch) {
      const next = roadmap.findIndex(
        (m, i) => i > moduleIndex && (m.branch === "any" || m.branch === forceBranch || m.branch === "general")
      );
      if (next >= 0) {
        updateState({ module: next });
      }
    }
  }, [forceBranch, moduleIndex, roadmap, updateState]);

  return (
    <div className="module-router">
      <div style={{ marginBottom: 12 }}>
        <strong>Progress:</strong>{" "}
        Module {module?.id} — {module?.title} (step {moduleIndex + 1} of {roadmap.length})
      </div>
      <div className="module-content">
        {renderModule(module, () => completeModule())}
      </div>
    </div>
  );
};

export default ModuleRouter;

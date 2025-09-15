// app/components/ModuleRouter.tsx
import React, { useEffect, useMemo } from "react";
import type { FC } from "react";
import { useGameState } from "@/hooks/useGameState";

/**
 * ModuleRouter
 *
 * - Strict linear module progression (0 -> 1A/1B -> 2A/2B -> 3 -> ... -> 15)
 * - Tries to import a JSON roadmap at /config/reference_roadmap.json
 * - Falls back to a hard-coded list that follows your Master Roadmap
 *
 * Expectations:
 * - ChatSimulator (or parent) will import this component and pass `renderModule`
 *   which receives the active module object and renders it (quiz, narration, etc.)
 *
 * Example parent usage:
 * <ModuleRouter renderModule={(m, onComplete) => <ChatSimulator module={m} onComplete={onComplete} />} />
 */

type ModuleDef = {
  id: string;              // e.g., "0", "1A", "1B", "2A", ...
  title: string;
  branch?: "independent" | "party" | "writein" | "general" | "any";
  contentPath?: string;    // optional path to markdown/file in repo (for future)
  meta?: Record<string, unknown>;
};

type Props = {
  // Parent provides how to render a module and optionally a completion callback
  renderModule: (module: ModuleDef, onComplete: () => void) => React.ReactNode;
  // If you prefer the router to call advance directly, leave out and parent can use game state hook
  forceBranch?: "independent" | "party" | "writein" | null;
};

const fallbackRoadmap: ModuleDef[] = [
  { id: "0", title: "Module 0 – Orientation", branch: "any", contentPath: "/SCRIPT.md#module-0" },
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
  const { state, setState } = useGameState();

  // Try to load an external roadmap JSON (if present in project). If import fails at build,
  // webpack/next will throw — so we guard using dynamic import inside useEffect if possible.
  const roadmap = useMemo<ModuleDef[]>(() => {
    // prefer a JSON config if your repo has one at config/reference_roadmap.json
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // Note: This will work in Node/Next when JSON is allowed. If you prefer dynamic import, change accordingly.
      // If the import is not available the require will throw and we'll use fallbackRoadmap.
      // Keep this synchronous so SSR doesn't introduce race conditions.
      // If you prefer async reading, we can change to useEffect + state.
      // @ts-ignore
      const cfg = require("@/config/reference_roadmap.json");
      if (Array.isArray(cfg) && cfg.length > 0) return cfg;
    } catch (e) {
      // fallback to internal roadmap
    }
    return fallbackRoadmap;
  }, []);

  // Determine the active module index from state; default to 0
  const moduleIndex = Math.max(0, Math.min(state.currentModule ?? 0, roadmap.length - 1));
  const module = roadmap[moduleIndex];

  // Advance to next module (linear only)
  const completeModule = () => {
    // update state consistently using your state's interface
    const nextIndex = Math.min(moduleIndex + 1, roadmap.length - 1);
    setState({
      ...state,
      currentModule: nextIndex,
      // optionally update other fields (persist progress) here if you want
    });
  };

  // Optionally enforce branch selection: e.g., if moduleIndex is 1 and forceBranch set,
  // skip the module that doesn't match branch. (Example: if user chose 'party', skip 1A)
  useEffect(() => {
    if (!forceBranch) return;
    const active = roadmap[moduleIndex];
    if (!active) return;
    if (active.branch && active.branch !== "any" && active.branch !== forceBranch) {
      // find next module that matches branch (or general)
      const next = roadmap.findIndex((m, i) => i > moduleIndex && (m.branch === "any" || m.branch === forceBranch || m.branch === "general"));
      if (next >= 0) {
        setState({ ...state, currentModule: next });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceBranch, moduleIndex, roadmap]);

  return (
    <div className="module-router">
      <div style={{ marginBottom: 12 }}>
        <strong>Progress:</strong>{" "}
        Module {module?.id} — {module?.title} (step {moduleIndex + 1} of {roadmap.length})
      </div>

      <div className="module-content">
        {renderModule(
          module,
          // onComplete handler passed to renderer (chat/quiz components should call it once task done)
          () => {
            completeModule();
          }
        )}
      </div>
    </div>
  );
};

export default ModuleRouter;

// app/page.tsx
import { useState } from "react";
import { processInputLoop } from "./ai/aiLoop";
import { ModuleState } from "./ai/moduleLogic";

const initialState: ModuleState = {
  office: "House",       // placeholder; will be set by Module 0
  cc: 50,
  signatures: 0,
  approval: 0,
  threshold: undefined,
};

export default function SimulatorPage() {
  const [state, setState] = useState<ModuleState>({ ...initialState });
  const [currentIndex, setCurrentIndex] = useState(0);

  // ------------------------------
  // Handle user input
  // ------------------------------
  const handleInput = (input: string) => {
    const result = processInputLoop(input, state, currentIndex);
    // update state inside processInputLoop or here if it returns new state
    setState({ ...state });
    setCurrentIndex(currentIndex + 1);
  };

  // ------------------------------
  // Manual reset button
  // ------------------------------
  const resetSimulation = () => {
    setState({ ...initialState }); // reset candidate state
    setCurrentIndex(0);            // reset module index
  };

  return (
    <div>
      <h1>Libertarian Candidate Simulator</h1>

      <button onClick={resetSimulation}>Reset Simulator</button>

      <div>
        <p>CC: {state.cc}</p>
        <p>Signatures: {state.signatures}</p>
        <p>Approval: {state.approval.toFixed(1)}%</p>
      </div>

      <input
        type="text"
        placeholder="Type your input here"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleInput((e.target as HTMLInputElement).value);
        }}
      />
    </div>
  );
}

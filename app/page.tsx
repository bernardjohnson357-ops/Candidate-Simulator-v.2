// app/page.tsx
import fs from "fs";
import path from "path";
import ChatSimulator from "./components/ChatSimulator";

export default function Page() {
  // Read Markdown files server-side
  const orientationPath = path.join(process.cwd(), "ORIENTATION.md");
  const scriptPath = path.join(process.cwd(), "SCRIPT.md");

  const orientationText = fs.readFileSync(orientationPath, "utf-8");
  const scriptText = fs.readFileSync(scriptPath, "utf-8");

  return (
    <main>
      <h1>Candidate Simulator</h1>
      <ChatSimulator
        initialModuleText={orientationText}
        fallbackScriptText={scriptText}
      />
    </main>
  );
}

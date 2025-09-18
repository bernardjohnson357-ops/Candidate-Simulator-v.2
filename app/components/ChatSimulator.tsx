import { useState, useEffect } from "react"; import { modules } from "../../config/modules";

interface Task { type: "read" | "write" | "quiz" | "scenario"; prompt: string; options?: string[]; correctAnswer?: string; }

export default function ChatSimulator() { const [currentModuleIndex, setCurrentModuleIndex] = useState(0); const [currentTaskIndex, setCurrentTaskIndex] = useState(0); const [messages, setMessages] = useState<string[]>([]); const [input, setInput] = useState("");

const module = modules[currentModuleIndex]; const task = module?.tasks[currentTaskIndex];

// Show welcome message + first task on mount useEffect(() => { if (messages.length === 0 && module && task) { setMessages([ "Simulator: 👋 Welcome to the Candidate Simulator! Type your responses below to begin.", Simulator: ${task.prompt} ]); } }, [module, task]);

const handleUserInput = () => { if (!input.trim() || !task) return;

const userMsg = `User: ${input}`;
let newMsgs: string[] = [userMsg];

if (task.type === "quiz") {
  if (input.trim().toLowerCase() === task.correctAnswer?.toLowerCase()) {
    newMsgs.push("Simulator: ✅ Correct!");
  } else {
    newMsgs.push("Simulator: ❌ Incorrect.");
  }
} else if (task.type === "write") {
  newMsgs.push("Simulator: Thanks for your reflection!");
} else if (task.type === "scenario") {
  newMsgs.push(`Simulator: ${task.prompt}`);
} else if (task.type === "read") {
  newMsgs.push(`Simulator: ${task.prompt}`);
}

// Advance to next task or module
if (currentTaskIndex + 1 < module.tasks.length) {
  const nextTask = module.tasks[currentTaskIndex + 1];
  newMsgs.push(`Simulator: ${nextTask.prompt}`);
  setCurrentTaskIndex(prev => prev + 1);
} else if (currentModuleIndex + 1 < modules.length) {
  const nextModule = modules[currentModuleIndex + 1];
  newMsgs.push(`--- Moving to Module: ${nextModule.title} ---`);
  newMsgs.push(`Simulator: ${nextModule.tasks[0].prompt}`);
  setCurrentModuleIndex(prev => prev + 1);
  setCurrentTaskIndex(0);
} else {
  newMsgs.push("Simulator: 🎉 You completed all modules!");
}

setMessages(prev => [...prev, ...newMsgs]);
setInput("");

};

return ( <div className="flex flex-col h-screen p-4"> <h1 className="text-xl font-bold mb-4">Candidate Simulator</h1>

<div className="flex-1 overflow-y-auto border rounded p-2 bg-gray-50">
    {messages.map((msg, i) => (
      <p key={i} className="mb-2 whitespace-pre-line">{msg}</p>
    ))}
  </div>

  <div className="flex mt-2">
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleUserInput()}
      className="flex-1 border rounded px-2 py-1"
      placeholder="Type your response..."
    />
    <button
      onClick={handleUserInput}
      className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
    >
      Send
    </button>
  </div>
</div>

); }




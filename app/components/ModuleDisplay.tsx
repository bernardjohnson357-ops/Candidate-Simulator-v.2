import React, { useState, useEffect } from "react"; import { Module, Task } from "../ai/types";

interface ModuleDisplayProps { module: Module; onTaskComplete?: (taskId: string) => void; }

export const ModuleDisplay: React.FC<ModuleDisplayProps> = ({ module, onTaskComplete }) => { const [speaking, setSpeaking] = useState(false); const [completedTasks, setCompletedTasks] = useState<string[]>([]); const [responses, setResponses] = useState<{ [key: string]: string }>({});

// Narrator audio const speak = (text: string) => { if (!window.speechSynthesis) return; const utterance = new SpeechSynthesisUtterance(text); utterance.rate = 1; utterance.pitch = 1; utterance.onstart = () => setSpeaking(true); utterance.onend = () => setSpeaking(false); speechSynthesis.speak(utterance); };

const stop = () => { speechSynthesis.cancel(); setSpeaking(false); };

// Auto-play narrator on module load useEffect(() => { speak(module.description); }, [module]);

const handleResponseChange = (taskId: string, value: string) => { setResponses({ ...responses, [taskId]: value }); };

const handleTaskComplete = (taskId: string) => { setCompletedTasks([...completedTasks, taskId]); if (onTaskComplete) onTaskComplete(taskId); };

return ( <div className="module-container p-4"> <h2 className="text-2xl font-bold mb-2">{module.title}</h2> <div className="mb-4"> <button onClick={() => speak(module.description)} className="mr-2 px-3 py-1 bg-blue-500 text-white rounded" > 🔊 Play Narrator </button> {speaking && ( <button
onClick={stop}
className="px-3 py-1 bg-red-500 text-white rounded"
> ⏹ Stop </button> )} </div>

<div className="tasks space-y-4">
    {module.tasks.map((task: Task) => (
      <div
        key={task.id}
        className={`task border p-3 rounded ${completedTasks.includes(task.id) ? 'bg-green-100' : 'bg-white'}`}
      >
        <h3 className="font-semibold">Task {task.id}</h3>
        <p className="mb-2">{task.prompt}</p>

        {task.type === "write" && (
          <textarea
            value={responses[task.id] || ''}
            onChange={(e) => handleResponseChange(task.id, e.target.value)}
            placeholder="Type your response here..."
            className="w-full p-2 border rounded mb-2"
            rows={4}
          />
        )}

        <button
          onClick={() => handleTaskComplete(task.id)}
          disabled={completedTasks.includes(task.id)}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          ✅ Mark Complete
        </button>
      </div>
    ))}
  </div>
</div>

); };


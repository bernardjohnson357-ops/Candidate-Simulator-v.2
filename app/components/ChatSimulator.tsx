"use client";

export default function ChatSimulator() {
  return (
    <div style={{ padding: "2rem", border: "1px solid #ccc" }}>
      <h2>✅ ChatSimulator Loaded</h2>
      <p>If you see this, the default export works.</p>
    </div>
  );
}

  if (!currentTask) return <div>All tasks completed!</div>;

  return (
    <div>
      <h2>Module {currentTask.module} – {currentTask.type}</h2>
      <p>{currentTask.content}</p>

      {(currentTask.type === "write" || currentTask.type === "quiz") && (
        <div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {currentTask.type === "read" && (
        <button onClick={handleSubmit}>Next</button>
      )}
    </div>
  );
}

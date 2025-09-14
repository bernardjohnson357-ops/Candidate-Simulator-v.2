"use client";

export default function ChatSimulator() {
  const currentTask = null; // placeholder for now

  if (!currentTask) {
    return <div>All tasks completed!</div>;
  }

  return (
    <div style={{ padding: "2rem", border: "1px solid #ccc" }}>
      <h2>✅ ChatSimulator Loaded</h2>
      <p>If you see this, the default export works.</p>
    </div>
  );
}

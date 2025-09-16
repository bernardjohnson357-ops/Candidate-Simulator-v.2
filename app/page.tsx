// app/page.tsx
import ChatSimulator from './components/ChatSimulator';

export default function Page() {
  return (
    <main>
      <h1>Candidate Simulator</h1>
      <ChatSimulator /> {/* ✅ render as a component */}
    </main>
  );
}

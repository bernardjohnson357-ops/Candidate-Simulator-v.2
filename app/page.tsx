// app/page.tsx
import ModuleSelector from "@/components/ModuleSelector";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Federal Candidate Simulator</h1>
      <ModuleSelector />
    </main>
  );
}

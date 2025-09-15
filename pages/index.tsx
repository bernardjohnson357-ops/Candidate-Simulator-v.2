// pages/index.tsx
import ModuleRouter from "@/components/ModuleRouter";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Federal Candidate Simulator</h1>
      <ModuleRouter />
    </div>
  );
}

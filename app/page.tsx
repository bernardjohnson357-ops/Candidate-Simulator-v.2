// app/page.tsx (Next.js App Router)
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function Page() {
  const markdown = `
  # Hello World
  This is **markdown** rendered inside Next.js
  `;

  return (
    <main>
      <MarkdownRenderer content={markdown} />
    </main>
  );
}

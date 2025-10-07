// tools/fixModules.ts
// Run this anytime you add or edit JSON modules.
// Command: npx tsx tools/fixModules.ts

import fs from "fs";
import path from "path";

const modulesDir = path.join(process.cwd(), "app/data/modules");

if (!fs.existsSync(modulesDir)) {
  console.error("❌ Module directory not found:", modulesDir);
  process.exit(1);
}

let errorCount = 0;

fs.readdirSync(modulesDir).forEach((file) => {
  if (!file.endsWith(".json")) return;

  const filePath = path.join(modulesDir, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  let data: any;

  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Invalid JSON in ${file}:`, err);
    errorCount++;
    return;
  }

  // ✅ Check top-level fields
  const requiredTopFields = ["id", "title", "tasks"];
  for (const field of requiredTopFields) {
    if (!(field in data)) {
      console.warn(`⚠️ ${file}: Missing top-level field "${field}"`);
    }
  }

  // ✅ Fix and validate tasks
  if (Array.isArray(data.tasks)) {
    data.tasks.forEach((task: any, i: number) => {
      const prefix = `${file} → Task ${i + 1} (${task.id || "no id"})`;

      // Check required task fields
      const requiredTaskFields = ["id", "type", "prompt"];
      for (const f of requiredTaskFields) {
        if (!(f in task)) {
          console.warn(`⚠️ ${prefix}: Missing field "${f}"`);
        }
      }

      // Validate task type
      const validTypes = ["read", "quiz", "write", "decision", "upload", "speak"];
      if (!validTypes.includes(task.type)) {
        console.warn(`⚠️ ${prefix}: Unknown task type "${task.type}"`);
      }

      // Fix quiz questions
      if (task.type === "quiz" && Array.isArray(task.questions)) {
        task.questions.forEach((q: any, qi: number) => {
          const qPrefix = `${prefix} → Question ${qi + 1}`;
          const requiredQFields = ["id", "question", "options", "correct"];

          for (const f of requiredQFields) {
            if (!(f in q)) {
              console.warn(`⚠️ ${qPrefix}: Missing field "${f}"`);
            }
          }

          if (!Array.isArray(q.options)) {
            console.warn(`⚠️ ${qPrefix}: "options" should be an array`);
          }

          if (!Array.isArray(q.correct)) {
            q.correct = [q.correct];
            console.log(`🔧 Fixed "correct" in ${qPrefix} — wrapped in array`);
          }
        });
      }
    });
  } else {
    console.warn(`⚠️ ${file}: No valid "tasks" array found`);
  }

  // ✅ Save normalized data
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ Checked and fixed: ${file}`);
});

console.log(
  errorCount === 0
    ? "✨ All modules validated successfully!"
    : `⚠️ Completed with ${errorCount} error(s)`
);

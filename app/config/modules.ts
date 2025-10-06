import fs from "fs";
import path from "path";
import { Module } from "@/app/ai/types";

export const loadModules = (): Module[] => {
  try {
    const dataDir = path.join(process.cwd(), "app/data/modules");
    const files = fs.readdirSync(dataDir);

    const modules = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => {
        const filePath = path.join(dataDir, file);
        const raw = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(raw) as Module;
      });

    // sort numerically by id just in case
    return modules.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  } catch (err) {
    console.error("Error loading modules:", err);
    return [];
  }
};

export const modules = loadModules();

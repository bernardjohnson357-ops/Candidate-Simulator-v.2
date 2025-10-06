import { Module } from "@/app/ai/types";

// Import JSON modules
import module0Json from "@/app/data/modules/module0.json";
import module1Json from "@/app/data/modules/module1.json";

// Add more imports for module2.json … module15.json as needed

// Typecast JSON as Module
export const allModules: Module[] = [
  module0Json as unknown as Module,
  module1Json as unknown as Module,
  // add module2Json ... module15Json here
];

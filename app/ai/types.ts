// app/ai/types.ts

/** ───────────────────────────────────────────────
 * 🧩 Quiz Question
 * Represents a single quiz question in a module
 * ─────────────────────────────────────────────── */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: string[]; // Support multiple correct answers
}

/** ───────────────────────────────────────────────
 * 🧠 Task Types
 * ─────────────────────────────────────────────── */
export type TaskType =
  | "read"
  | "quiz"
  | "choice"
  | "decision"
  | "write"
  | "upload"
  | "speak";

/** ───────────────────────────────────────────────
 * 🧾 Base Task Interface
 * Shared fields across all task types
 * ─────────────────────────────────────────────── */
export interface BaseTask {
  id: string;
  type: TaskType;
  prompt: string;
  nextTaskId?: string; // optional: go directly to next task
}

/** ───────────────────────────────────────────────
 * 📘 Specialized Task Variants
 * ─────────────────────────────────────────────── */
export interface ReadTask extends BaseTask {
  type: "read";
}

export interface QuizTask extends BaseTask {
  type: "quiz";
  questions: QuizQuestion[];
}

export interface ChoiceTask extends BaseTask {
  type: "choice";
  options?: string[]; // list of office options or multiple-choice prompts
}

export interface WriteTask extends BaseTask {
  type: "write";
  responsePlaceholder?: string;
}

export interface UploadTask extends BaseTask {
  type: "upload";
}

export interface SpeakTask extends BaseTask {
  type: "speak";
}

/** ───────────────────────────────────────────────
 * 🧱 Task Union Type
 * Allows flexible handling of all task kinds
 * ─────────────────────────────────────────────── */
export type Task =
  | ReadTask
  | QuizTask
  | ChoiceTask
  | WriteTask
  | UploadTask
  | SpeakTask;

/** ───────────────────────────────────────────────
 * 📦 Module Definition
 * ─────────────────────────────────────────────── */
export interface Module {
  id: string;
  title: string;
  active: boolean;
  description: string;
  narrator?: string;
  readingSummary: string[];
  tasks: Task[];
  purpose: string;
  scenarios: any[];
  outcome: any;
  nextModule?: {
    id: string;
    title: string;
    description: string;
  };
}

/** ───────────────────────────────────────────────
 * 🗳 Candidate State
 * Tracks player stats across the simulator
 * ─────────────────────────────────────────────── */
export interface CandidateState {
  office?: string;
  cc: number;             // Candidate Coins
  signatures: number;     // Signatures collected
  voterApproval: number;  // % approval
  currentModuleId?: string;
  [key: string]: any;     // For flexible expansion
}

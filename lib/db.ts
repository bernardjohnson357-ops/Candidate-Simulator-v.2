// lib/db.ts
import { NeonClient } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("❌ Missing DATABASE_URL in environment variables");
}

export const client = new NeonClient({
  connectionString: process.env.DATABASE_URL,
});

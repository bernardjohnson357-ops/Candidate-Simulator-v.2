// lib/db.ts
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("❌ Missing DATABASE_URL in environment variables");
}

// Create a query client
export const client = neon(process.env.DATABASE_URL);

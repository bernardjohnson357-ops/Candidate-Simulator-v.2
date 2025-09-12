// lib/db.ts
import { NeonClient } from "@neondatabase/serverless";

// Make sure you set NEON_KEY in your .env.local (for dev)
// and in Vercel's Environment Variables (for prod)
if (!process.env.NEON_KEY) {
  throw new Error("❌ Missing NEON_KEY in environment variables");
}

export const client = new NeonClient({
  connectionString: process.env.NEON_KEY,
});

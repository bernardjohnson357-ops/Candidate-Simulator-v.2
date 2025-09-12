// lib/db.ts
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("❌ Missing DATABASE_URL in environment variables");
}

// Initialize Neon client
export const client = neon(process.env.DATABASE_URL);

// Optional helper query function
export async function queryDB<T = any>(sql: string, params?: any[]): Promise<T[]> {
  const result = await client.query(sql, params);
  return result.rows as T[];
}

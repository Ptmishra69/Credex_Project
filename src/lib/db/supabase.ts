import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Creates a typed Supabase client.
 *
 * WHY a getter function instead of a top-level constant?
 * - Ensures env vars are resolved at runtime, not build time
 * - Allows tree-shaking — unused imports won't trigger client creation
 * - Makes testing easier (can mock the function)
 */
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}

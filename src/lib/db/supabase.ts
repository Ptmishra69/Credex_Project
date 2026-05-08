import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Typed Supabase client.
 * Uses a getter to ensure env vars are resolved at runtime.
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

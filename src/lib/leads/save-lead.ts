import { getSupabaseClient } from "@/lib/db/supabase";

export interface LeadData {
  email: string;
  name?: string;
  company?: string;
  auditId?: string;
}

/**
 * Persists a lead to the Supabase 'leads' table.
 */
export async function saveLead(data: LeadData) {
  const supabase = getSupabaseClient();

  const payload = {
    email: data.email.toLowerCase().trim(),
    name: data.name || null,
    company: data.company || null,
    audit_id: data.auditId || null,
  };

  const { data: inserted, error } = await (supabase
    .from("leads")
    .insert(payload as any)
    .select()
    .single() as any);

  if (error) {
    console.error("[saveLead] Supabase error:", error);
    // Handle duplicate emails if we decide to enforce uniqueness at the DB level later
    if (error.code === "23505") {
      return { success: true, message: "Lead already exists" };
    }
    throw new Error(`Failed to save lead: ${error.message}`);
  }

  return { success: true, data: inserted };
}

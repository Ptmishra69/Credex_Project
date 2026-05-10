"use server";

import { getSupabaseClient } from "@/lib/db/supabase";
import { AuditInput } from "@/lib/audit/types";
import { generateAudit } from "@/lib/audit/engine";

/**
 * Server action to process and save audit results.
 */
export async function submitAudit(input: AuditInput) {
  try {
    const supabase = getSupabaseClient();
    
    // 1. Run the audit engine on the server
    const result = generateAudit(input);

    // 2. Prepare database payload
    const payload = {
      company_name: input.companyName,
      team_size: input.teamSize,
      industry: input.useCase, // Using useCase as industry for now
      input_data: input.tools,
      result_data: result,
      total_monthly_spend: result.currentMonthlySpend,
      estimated_savings: result.monthlySavings,
      status: "completed" as const,
    };

    // 3. Insert into Supabase
    const { data, error } = await (supabase
      .from("audits")
      .insert(payload as any)
      .select("id")
      .single() as any);

    if (error) {
      console.error("[submitAudit] Supabase error:", error);
      throw new Error(`Failed to save audit: ${error.message}`);
    }

    return { success: true, id: data.id };
  } catch (error) {
    console.error("[submitAudit] Error:", error);
    return { success: false, error: "Internal server error" };
  }
}

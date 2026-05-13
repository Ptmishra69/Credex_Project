import { z } from "zod";

/**
 * Zod schema for a single tool entry.
 */
export const toolEntrySchema = z.object({
  toolId: z.string().min(1, "Please select a tool"),
  planId: z.string().min(1, "Please select a plan"),
  monthlySpend: z.number().min(0, "Spend cannot be negative").max(100000, "Please verify this amount"),
  seats: z.number().int("Seats must be a whole number").min(1, "Minimum 1 seat").max(10000, "Please verify seat count"),
});

/**
 * Main Audit Form Schema.
 */
export const auditFormSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  teamSize: z.number().int().min(1, "Team size must be at least 1").max(10000, "Please verify team size"),
  useCase: z.enum(["coding", "writing", "research", "data_analysis", "mixed"]),
  tools: z
    .array(toolEntrySchema)
    .min(1, "Please add at least one AI tool to audit"),
});

/**
 * Inferred Types from Schemas
 */
export type AuditFormValues = z.infer<typeof auditFormSchema>;
export type ToolEntryValues = z.infer<typeof toolEntrySchema>;

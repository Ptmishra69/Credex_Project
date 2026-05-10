import { NextRequest, NextResponse } from "next/server";
import { saveLead, LeadData } from "@/lib/leads/save-lead";
import * as z from "zod";

const leadRequestSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  company: z.string().optional(),
  auditId: z.string().uuid().optional(),
});

/**
 * POST /api/leads
 * Handles incoming lead submissions from the result dashboard.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 1. Validate request
    const validatedData = leadRequestSchema.parse(body);

    // 2. Persist to Supabase
    const result = await saveLead(validatedData as LeadData);

    return NextResponse.json(
      { success: true, message: "Lead captured successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error("[API/Leads] Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

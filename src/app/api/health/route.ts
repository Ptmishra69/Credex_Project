import { NextResponse } from "next/server";

/**
 * GET /api/health
 *
 * Simple health check endpoint. Returns a static success response.
 * Useful for:
 * - Verifying the API layer is functional
 * - Uptime monitoring (e.g., UptimeRobot, Vercel checks)
 * - CI/CD smoke tests
 * - Load balancer health probes
 */
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "API working",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

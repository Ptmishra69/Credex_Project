import { NextResponse } from "next/server";

/** GET /api/health — Returns service status for monitoring and health probes. */
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

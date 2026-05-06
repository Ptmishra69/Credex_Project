/**
 * Core domain types for the AI Spend Audit platform.
 *
 * These types define the data contract between:
 * - Frontend form → API submission
 * - API → Database storage
 * - Database → Results display
 */

// ---------------------------------------------------------------------------
// Input Types (what the user submits)
// ---------------------------------------------------------------------------

/** Category of AI tool for grouping and analysis */
export type ToolCategory =
  | "coding"        // Cursor, GitHub Copilot, Tabnine
  | "chat"          // ChatGPT, Claude, Gemini
  | "image"         // Midjourney, DALL-E, Stable Diffusion
  | "automation"    // Zapier AI, Make AI
  | "analytics"     // Mixpanel AI, Amplitude AI
  | "other";

/** A single AI tool entry from the user's form */
export interface ToolInput {
  /** Display name of the tool (e.g., "Cursor Pro") */
  name: string;
  /** Category for grouping recommendations */
  category: ToolCategory;
  /** Monthly cost in USD per seat */
  monthlyCostPerSeat: number;
  /** Number of seats/licenses */
  seats: number;
  /** How often is this tool actually used? */
  usageFrequency: "daily" | "weekly" | "monthly" | "rarely";
}

/** The full audit submission from the user */
export interface AuditInput {
  /** Company or team name */
  companyName: string;
  /** Total team size */
  teamSize: number;
  /** Industry vertical (helps tailor recommendations) */
  industry?: string;
  /** All AI tools the company uses */
  tools: ToolInput[];
}

// ---------------------------------------------------------------------------
// Output Types (what the audit produces)
// ---------------------------------------------------------------------------

/** The type of optimization action recommended */
export type RecommendationAction =
  | "downgrade"     // Switch to a lower-tier plan
  | "consolidate"   // Merge overlapping tools
  | "eliminate"      // Remove unused/underused tool
  | "negotiate"     // Request volume discount
  | "switch"        // Move to a cheaper alternative
  | "optimize";     // Reduce seats or adjust usage

/** The urgency/confidence level of a recommendation */
export type RecommendationPriority = "high" | "medium" | "low";

/** A single optimization recommendation */
export interface Recommendation {
  /** Which tool this recommendation targets */
  toolName: string;
  /** What action to take */
  action: RecommendationAction;
  /** Human-readable explanation */
  description: string;
  /** Estimated monthly savings in USD */
  estimatedMonthlySavings: number;
  /** Confidence / urgency level */
  priority: RecommendationPriority;
  /** Alternative tool suggestion (if action is "switch") */
  alternativeTool?: string;
}

/** The complete audit result */
export interface AuditResult {
  /** Unique identifier (matches DB row) */
  id: string;
  /** The original input data */
  input: AuditInput;
  /** Generated recommendations */
  recommendations: Recommendation[];
  /** Total current monthly spend (calculated) */
  totalMonthlySpend: number;
  /** Total estimated monthly savings */
  estimatedMonthlySavings: number;
  /** Savings as a percentage of total spend */
  savingsPercentage: number;
  /** Processing status */
  status: "pending" | "processing" | "completed" | "failed";
  /** When the audit was created */
  createdAt: string;
}

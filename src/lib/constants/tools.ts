/**
 * Supported AI Tools, Plans, and Pricing Data.
 *
 * This configuration is the single source of truth for:
 * 1. UI Dropdowns (Select components)
 * 2. Form Validation (Zod schemas)
 * 3. Audit Engine logic (recommendations & savings calculations)
 *
 * Pricing last verified: 2026-05-07
 * See /PRICING_DATA.md for official source URLs.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PricingModel = "flat" | "per_user" | "usage_based";

export interface ToolPlan {
  id: string;
  label: string;
  /** Monthly price in USD. null = custom/contact sales. */
  priceMonthly: number | null;
  /** Annual price per month (if discount available). null = no annual option. */
  priceAnnual?: number | null;
  /** How the price is charged */
  pricingModel: PricingModel;
  description?: string;
}

export interface ToolConfig {
  id: string;
  name: string;
  /** Primary category for grouping in the audit */
  category: "coding" | "chat" | "api" | "productivity" | "other";
  /** URL to official pricing page */
  pricingUrl: string;
  plans: ToolPlan[];
}

// ---------------------------------------------------------------------------
// Tool Configurations
// ---------------------------------------------------------------------------

export const SUPPORTED_TOOLS: ToolConfig[] = [
  {
    id: "cursor",
    name: "Cursor",
    category: "coding",
    pricingUrl: "https://cursor.com/pricing",
    plans: [
      { id: "hobby", label: "Hobby", priceMonthly: 0, pricingModel: "flat", description: "Limited completions" },
      { id: "pro", label: "Pro", priceMonthly: 20, pricingModel: "flat", description: "500 fast premium requests/mo" },
      { id: "pro_plus", label: "Pro+", priceMonthly: 60, pricingModel: "flat", description: "1500 fast premium requests/mo" },
      { id: "ultra", label: "Ultra", priceMonthly: 200, pricingModel: "flat", description: "Unlimited fast premium requests" },
      { id: "teams", label: "Teams", priceMonthly: 40, pricingModel: "per_user", description: "Centralized billing, usage dashboard" },
    ],
  },
  {
    id: "github_copilot",
    name: "GitHub Copilot",
    category: "coding",
    pricingUrl: "https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot",
    plans: [
      { id: "pro", label: "Pro", priceMonthly: 10, pricingModel: "flat", description: "Individual developers" },
      { id: "pro_plus", label: "Pro+", priceMonthly: 39, pricingModel: "flat", description: "Expanded model access" },
      { id: "business", label: "Business", priceMonthly: 19, pricingModel: "per_user", description: "Organization policy controls" },
      { id: "enterprise", label: "Enterprise", priceMonthly: 39, pricingModel: "per_user", description: "SSO, audit logs, IP indemnity" },
    ],
  },
  {
    id: "claude",
    name: "Claude (Anthropic)",
    category: "chat",
    pricingUrl: "https://support.anthropic.com/en/articles/9840818-choosing-a-claude-plan",
    plans: [
      { id: "free", label: "Free", priceMonthly: 0, pricingModel: "flat", description: "Limited usage" },
      { id: "pro", label: "Pro", priceMonthly: 20, priceAnnual: 16.67, pricingModel: "flat", description: "Higher limits, priority" },
      { id: "max_5x", label: "Max 5×", priceMonthly: 100, pricingModel: "flat", description: "5× Pro usage limits" },
      { id: "max_20x", label: "Max 20×", priceMonthly: 200, pricingModel: "flat", description: "20× Pro usage limits" },
      { id: "team_standard", label: "Team Standard", priceMonthly: 25, priceAnnual: 20, pricingModel: "per_user", description: "Admin controls, collaboration" },
      { id: "team_premium", label: "Team Premium", priceMonthly: 125, priceAnnual: 100, pricingModel: "per_user", description: "Higher per-member limits" },
      { id: "enterprise", label: "Enterprise", priceMonthly: null, pricingModel: "per_user", description: "SSO, SCIM, dedicated support" },
    ],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "chat",
    pricingUrl: "https://openai.com/chatgpt/pricing/",
    plans: [
      { id: "free", label: "Free", priceMonthly: 0, pricingModel: "flat", description: "GPT-4o mini" },
      { id: "plus", label: "Plus", priceMonthly: 20, pricingModel: "flat", description: "GPT-4o, DALL·E, Advanced Voice" },
      { id: "pro", label: "Pro", priceMonthly: 200, pricingModel: "flat", description: "Unlimited, o1 pro mode" },
      { id: "business", label: "Business", priceMonthly: 25, priceAnnual: 20, pricingModel: "per_user", description: "Admin console, data excluded from training" },
      { id: "enterprise", label: "Enterprise", priceMonthly: null, pricingModel: "per_user", description: "SSO, unlimited, advanced analytics" },
    ],
  },
  {
    id: "anthropic_api",
    name: "Anthropic API",
    category: "api",
    pricingUrl: "https://www.anthropic.com/pricing",
    plans: [
      { id: "usage", label: "Usage-based", priceMonthly: null, pricingModel: "usage_based", description: "Pay per token (input/output)" },
    ],
  },
  {
    id: "openai_api",
    name: "OpenAI API",
    category: "api",
    pricingUrl: "https://openai.com/api/pricing/",
    plans: [
      { id: "usage", label: "Usage-based", priceMonthly: null, pricingModel: "usage_based", description: "Pay per token (model-dependent)" },
    ],
  },
  {
    id: "gemini",
    name: "Google Gemini",
    category: "chat",
    pricingUrl: "https://one.google.com/about/plans",
    plans: [
      { id: "free", label: "Free", priceMonthly: 0, pricingModel: "flat", description: "Limited Gemini access" },
      { id: "pro", label: "Pro (AI Premium)", priceMonthly: 19.99, pricingModel: "flat", description: "Gemini Advanced, 2TB storage" },
      { id: "ultra", label: "Ultra", priceMonthly: 249.99, pricingModel: "flat", description: "Highest tier, 30TB storage" },
      { id: "workspace", label: "Workspace AI Add-on", priceMonthly: 24, pricingModel: "per_user", description: "Gemini for Google Workspace" },
    ],
  },
  {
    id: "windsurf",
    name: "Windsurf / v0",
    category: "coding",
    pricingUrl: "https://codeium.com/windsurf",
    plans: [
      { id: "free", label: "Free", priceMonthly: 0, pricingModel: "flat", description: "Limited completions" },
      { id: "pro", label: "Pro", priceMonthly: 15, pricingModel: "flat", description: "Extended usage" },
      { id: "team", label: "Team", priceMonthly: 25, pricingModel: "per_user", description: "Collaboration features" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get the plan configs for a specific tool ID */
export function getPlansForTool(toolId: string): ToolPlan[] {
  const tool = SUPPORTED_TOOLS.find((t) => t.id === toolId);
  return tool ? tool.plans : [];
}

/** Get a specific plan's pricing info */
export function getPlanPricing(toolId: string, planId: string): ToolPlan | undefined {
  const plans = getPlansForTool(toolId);
  return plans.find((p) => p.id === planId);
}

/** Get the monthly cost for a tool+plan+seats combination */
export function calculateMonthlyCost(
  toolId: string,
  planId: string,
  seats: number
): number | null {
  const plan = getPlanPricing(toolId, planId);
  if (!plan || plan.priceMonthly === null) return null;

  if (plan.pricingModel === "per_user") {
    return plan.priceMonthly * seats;
  }
  return plan.priceMonthly;
}

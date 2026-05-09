import { ToolId, ToolPricing, PricingPlan } from "./types";

/**
 * The single source of truth for AI tool pricing.
 * Structured for O(1) lookups and future extensibility.
 */
export const PRICING_CATALOG: Record<ToolId, ToolPricing> = {
  cursor: {
    id: "cursor",
    name: "Cursor",
    plans: {
      hobby: { id: "hobby", label: "Hobby", priceMonthly: 0, pricingModel: "flat", description: "Free for individuals" },
      pro: { id: "pro", label: "Pro", priceMonthly: 20, pricingModel: "flat", description: "Unlimited completions and premium models" },
      business: { id: "business", label: "Business", priceMonthly: 40, pricingModel: "per_user", description: "Team management and centralized billing" },
      enterprise: { id: "enterprise", label: "Enterprise", priceMonthly: null, pricingModel: "per_user", description: "Custom pricing for large teams" },
    },
  },
  github_copilot: {
    id: "github_copilot",
    name: "GitHub Copilot",
    plans: {
      individual: { id: "individual", label: "Individual", priceMonthly: 10, pricingModel: "flat", description: "For individual developers" },
      business: { id: "business", label: "Business", priceMonthly: 19, pricingModel: "per_user", description: "For teams and organizations" },
      enterprise: { id: "enterprise", label: "Enterprise", priceMonthly: 39, pricingModel: "per_user", description: "Advanced security and customization" },
    },
  },
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    plans: {
      free: { id: "free", label: "Free", priceMonthly: 0, pricingModel: "flat", description: "Basic access" },
      plus: { id: "plus", label: "Plus", priceMonthly: 20, pricingModel: "flat", description: "Individual power user" },
      team: { id: "team", label: "Team", priceMonthly: 25, pricingModel: "per_user", description: "For small teams (billed annually at $25, or $30 monthly)" },
      enterprise: { id: "enterprise", label: "Enterprise", priceMonthly: null, pricingModel: "per_user", description: "Custom large scale access" },
    },
  },
  claude: {
    id: "claude",
    name: "Claude",
    plans: {
      free: { id: "free", label: "Free", priceMonthly: 0, pricingModel: "flat", description: "Basic usage" },
      pro: { id: "pro", label: "Pro", priceMonthly: 20, pricingModel: "flat", description: "Unlimited usage for individuals" },
      team: { id: "team", label: "Team", priceMonthly: 25, pricingModel: "per_user", description: "For teams (billed annually, approx $30 monthly)" },
    },
  },
  openai_api: {
    id: "openai_api",
    name: "OpenAI API",
    plans: {
      usage: { id: "usage", label: "Usage Based", priceMonthly: 0, pricingModel: "usage_based", description: "Pay per token" },
    },
  },
  anthropic_api: {
    id: "anthropic_api",
    name: "Anthropic API",
    plans: {
      usage: { id: "usage", label: "Usage Based", priceMonthly: 0, pricingModel: "usage_based", description: "Pay per token" },
    },
  },
  gemini: {
    id: "gemini",
    name: "Gemini",
    plans: {
      free: { id: "free", label: "Free", priceMonthly: 0, pricingModel: "flat", description: "Basic access" },
      advanced: { id: "advanced", label: "Advanced", priceMonthly: 20, pricingModel: "flat", description: "Ultra 1.0 access" },
      business: { id: "business", label: "Business", priceMonthly: 20, pricingModel: "per_user", description: "Workspace integration" },
      enterprise: { id: "enterprise", label: "Enterprise", priceMonthly: 30, pricingModel: "per_user", description: "Advanced security" },
    },
  },
  windsurf_v0: {
    id: "windsurf_v0",
    name: "Windsurf/v0",
    plans: {
      pro: { id: "pro", label: "Pro", priceMonthly: 20, pricingModel: "flat", description: "Individual power user" },
    },
  },
};

/**
 * Helper to get a specific plan's price
 */
export function getPlanPrice(toolId: ToolId, planId: string): number {
  const tool = PRICING_CATALOG[toolId];
  if (!tool) return 0;
  
  const plan = tool.plans[planId];
  return plan?.priceMonthly || 0;
}

/**
 * Helper to get all plans for a tool
 */
export function getToolPlans(toolId: ToolId): PricingPlan[] {
  const tool = PRICING_CATALOG[toolId];
  return tool ? Object.values(tool.plans) : [];
}

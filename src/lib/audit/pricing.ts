import { ToolId, ToolPricing } from "./types";

export const PRICING_CATALOG: Record<ToolId, ToolPricing> = {
  cursor: {
    id: "cursor",
    name: "Cursor",
    plans: {
      hobby: { id: "hobby", label: "Hobby", priceMonthly: 0, pricingModel: "flat" },
      pro: { id: "pro", label: "Pro", priceMonthly: 20, pricingModel: "per_user" },
      pro_plus: { id: "pro_plus", label: "Pro+", priceMonthly: 60, pricingModel: "flat" },
      ultra: { id: "ultra", label: "Ultra", priceMonthly: 200, pricingModel: "flat" },
      teams: { id: "teams", label: "Teams", priceMonthly: 40, pricingModel: "per_user" },
    },
  },
  github_copilot: {
    id: "github_copilot",
    name: "GitHub Copilot",
    plans: {
      pro: { id: "pro", label: "Pro", priceMonthly: 10, pricingModel: "per_user" },
      pro_plus: { id: "pro_plus", label: "Pro+", priceMonthly: 39, pricingModel: "flat" },
      business: { id: "business", label: "Business", priceMonthly: 19, pricingModel: "per_user" },
      enterprise: { id: "enterprise", label: "Enterprise", priceMonthly: 39, pricingModel: "per_user" },
    },
  },
  claude: {
    id: "claude",
    name: "Claude (Anthropic)",
    plans: {
      free: { id: "free", label: "Free", priceMonthly: 0, pricingModel: "flat" },
      pro: { id: "pro", label: "Pro", priceMonthly: 20, pricingModel: "per_user" },
      max_5x: { id: "max_5x", label: "Max 5x", priceMonthly: 100, pricingModel: "flat" },
      max_20x: { id: "max_20x", label: "Max 20x", priceMonthly: 200, pricingModel: "flat" },
      team_standard: { id: "team_standard", label: "Team Standard", priceMonthly: 25, pricingModel: "per_user" },
      team_premium: { id: "team_premium", label: "Team Premium", priceMonthly: 125, pricingModel: "per_user" },
      enterprise: { id: "enterprise", label: "Enterprise", priceMonthly: null, pricingModel: "per_user" },
    },
  },
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT (OpenAI)",
    plans: {
      free: { id: "free", label: "Free", priceMonthly: 0, pricingModel: "flat" },
      plus: { id: "plus", label: "Plus", priceMonthly: 20, pricingModel: "per_user" },
      pro: { id: "pro", label: "Pro", priceMonthly: 200, pricingModel: "flat" },
      business_team: { id: "business_team", label: "Business (Team)", priceMonthly: 25, pricingModel: "per_user" },
      enterprise: { id: "enterprise", label: "Enterprise", priceMonthly: null, pricingModel: "per_user" },
    },
  },
  openai_api: {
    id: "openai_api",
    name: "OpenAI API",
    plans: {
      usage: { id: "usage", label: "Usage-Based", priceMonthly: null, pricingModel: "usage_based" },
    },
  },
  anthropic_api: {
    id: "anthropic_api",
    name: "Anthropic API",
    plans: {
      usage: { id: "usage", label: "Usage-Based", priceMonthly: null, pricingModel: "usage_based" },
    },
  },
  gemini: {
    id: "gemini",
    name: "Google Gemini",
    plans: {
      free: { id: "free", label: "Free", priceMonthly: 0, pricingModel: "flat" },
      pro_one: { id: "pro_one", label: "Gemini Pro (Google One)", priceMonthly: 19.99, pricingModel: "flat" },
      ultra: { id: "ultra", label: "Gemini Ultra", priceMonthly: 249.99, pricingModel: "flat" },
      workspace_add_on: { id: "workspace_add_on", label: "Workspace AI Add-on", priceMonthly: 24, pricingModel: "per_user" },
      enterprise: { id: "enterprise", label: "Enterprise", priceMonthly: null, pricingModel: "per_user" },
    },
  },
  windsurf: {
    id: "windsurf",
    name: "Windsurf / v0",
    plans: {
      free: { id: "free", label: "Free", priceMonthly: 0, pricingModel: "flat" },
      pro: { id: "pro", label: "Pro", priceMonthly: 15, pricingModel: "per_user" },
      team: { id: "team", label: "Team", priceMonthly: 25, pricingModel: "per_user" },
    },
  },
};

export function getToolPricing(toolId: string) {
  return PRICING_CATALOG[toolId as ToolId];
}

export function getPlanPricing(toolId: string, planId: string) {
  const tool = PRICING_CATALOG[toolId as ToolId];
  return tool?.plans[planId] || null;
}

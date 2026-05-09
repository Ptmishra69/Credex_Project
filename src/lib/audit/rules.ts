import { AuditInput, Recommendation, ToolInput } from "./types";
import { PRICING_CATALOG } from "./pricing";

export interface AuditRule {
  name: string;
  check: (input: AuditInput, tool: ToolInput) => Recommendation | null;
}

/**
 * Deterministic optimization rules.
 * Each rule returns a Recommendation if a condition is met, otherwise null.
 */
export const AUDIT_RULES: AuditRule[] = [
  // --- CHAT TOOLS OPTIMIZATION ---
  {
    name: "ChatGPT Team Efficiency",
    check: (input, tool) => {
      if (tool.toolId === "chatgpt" && tool.planId === "team" && tool.seats <= 2) {
        return {
          toolId: "chatgpt",
          toolName: "ChatGPT",
          currentPlanId: "team",
          recommendedPlanId: "plus",
          currentMonthlyCost: tool.monthlySpend,
          optimizedMonthlyCost: 20 * tool.seats,
          monthlySavings: tool.monthlySpend - (20 * tool.seats),
          reason: "ChatGPT Team provides admin features that are typically not cost-efficient for teams of 2 or fewer. Individual Plus plans offer the same core capabilities at a lower price point.",
          priority: "medium",
          action: "downgrade",
        };
      }
      return null;
    },
  },
  {
    name: "Claude Team Efficiency",
    check: (input, tool) => {
      if (tool.toolId === "claude" && tool.planId === "team" && tool.seats <= 2) {
        return {
          toolId: "claude",
          toolName: "Claude",
          currentPlanId: "team",
          recommendedPlanId: "pro",
          currentMonthlyCost: tool.monthlySpend,
          optimizedMonthlyCost: 20 * tool.seats,
          monthlySavings: tool.monthlySpend - (20 * tool.seats),
          reason: "Claude Team plans require a minimum seat count or annual commitment to be viable. For teams of 2, Individual Pro seats offer identical model access for less.",
          priority: "medium",
          action: "downgrade",
        };
      }
      return null;
    },
  },

  // --- CODING TOOLS OPTIMIZATION ---
  {
    name: "Cursor Solo Business",
    check: (input, tool) => {
      if (tool.toolId === "cursor" && tool.planId === "business" && tool.seats === 1) {
        return {
          toolId: "cursor",
          toolName: "Cursor",
          currentPlanId: "business",
          recommendedPlanId: "pro",
          currentMonthlyCost: tool.monthlySpend,
          optimizedMonthlyCost: 20,
          monthlySavings: tool.monthlySpend - 20,
          reason: "Cursor Business is designed for team management. A solo developer achieves the same AI features on the Pro plan while saving $20/month.",
          priority: "high",
          action: "downgrade",
        };
      }
      return null;
    },
  },
  {
    name: "GitHub Copilot Consolidation",
    check: (input, tool) => {
      const hasCursor = input.tools.some(t => t.toolId === "cursor");
      if (tool.toolId === "github_copilot" && hasCursor) {
        return {
          toolId: "github_copilot",
          toolName: "GitHub Copilot",
          currentPlanId: tool.planId,
          recommendedPlanId: "none",
          currentMonthlyCost: tool.monthlySpend,
          optimizedMonthlyCost: 0,
          monthlySavings: tool.monthlySpend,
          reason: "Cursor includes its own high-performance completions. Maintaining a separate GitHub Copilot subscription often results in redundant feature overlap.",
          priority: "high",
          action: "consolidate",
        };
      }
      return null;
    },
  },

  // --- API VS CHAT OPTIMIZATION ---
  {
    name: "Low Volume API Optimization",
    check: (input, tool) => {
      const isAPI = tool.toolId === "openai_api" || tool.toolId === "anthropic_api";
      if (isAPI && tool.monthlySpend > 0 && tool.monthlySpend < 15) {
        const targetChat = tool.toolId === "openai_api" ? "ChatGPT Plus" : "Claude Pro";
        return {
          toolId: tool.toolId,
          toolName: tool.toolId === "openai_api" ? "OpenAI API" : "Anthropic API",
          currentPlanId: "usage",
          recommendedPlanId: "chat_alternative",
          currentMonthlyCost: tool.monthlySpend,
          optimizedMonthlyCost: 20, // This is an "increase" in cost but better value
          monthlySavings: 0,
          reason: `Your ${tool.toolId === "openai_api" ? 'OpenAI' : 'Anthropic'} API spend is very low. You might get better value from a ${targetChat} subscription which provides a superior UI and unlimited standard usage.`,
          priority: "low",
          action: "optimize",
        };
      }
      return null;
    },
  },

  // --- GENERAL ENTERPRISE OVERSPEND ---
  {
    name: "Small Team Enterprise Check",
    check: (input, tool) => {
      if (tool.planId === "enterprise" && input.teamSize < 20) {
        const toolConfig = PRICING_CATALOG[tool.toolId];
        const businessPlan = toolConfig.plans["business"] || toolConfig.plans["pro"];
        const estimatedBusinessCost = (businessPlan?.priceMonthly || 30) * tool.seats;
        
        if (tool.monthlySpend > estimatedBusinessCost) {
          return {
            toolId: tool.toolId,
            toolName: toolConfig.name,
            currentPlanId: "enterprise",
            recommendedPlanId: businessPlan?.id || "business",
            currentMonthlyCost: tool.monthlySpend,
            optimizedMonthlyCost: estimatedBusinessCost,
            monthlySavings: tool.monthlySpend - estimatedBusinessCost,
            reason: "Enterprise plans typically add SSO and advanced governance that small teams under 20 seats rarely fully utilize. Scaling back to Business plans can save significant budget.",
            priority: "medium",
            action: "downgrade",
          };
        }
      }
      return null;
    },
  },
];

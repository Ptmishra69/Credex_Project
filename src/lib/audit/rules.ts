import { AuditInput, ToolInput, Recommendation, AuditRule, CompanyStage } from "./types";
import { getPlanPricing, getToolPricing } from "./pricing";

/**
 * UTILS
 */
export function classifyCompany(teamSize: number): CompanyStage {
  if (teamSize <= 1) return "solo";
  if (teamSize <= 10) return "startup";
  if (teamSize <= 50) return "growth";
  return "enterprise";
}

/**
 * LAYER 2 — PLAN EFFICIENCY
 * Detects enterprise overkill and unnecessary team plans.
 */
const planEfficiencyRule: AuditRule = {
  id: "plan-efficiency",
  check: (input, tool) => {
    const stage = classifyCompany(input.teamSize);
    
    // Rule: Solo users on Team/Enterprise plans
    if (stage === "solo" && (tool.planId === "teams" || tool.planId.includes("enterprise") || tool.planId.includes("team"))) {
      const proPlan = getPlanPricing(tool.toolId, "pro") || getPlanPricing(tool.toolId, "plus");
      if (proPlan && proPlan.priceMonthly !== null) {
        return {
          id: `eff-${tool.toolId}`,
          toolId: tool.toolId,
          toolName: tool.toolName,
          action: "downgrade",
          currentPlanId: tool.planId,
          recommendedPlanId: proPlan.id,
          currentMonthlyCost: tool.monthlySpend,
          optimizedMonthlyCost: proPlan.priceMonthly,
          monthlySavings: tool.monthlySpend - proPlan.priceMonthly,
          reason: `As a solo operator, you are paying for team management features (SSO, seat management) that are unnecessary. Switching to an individual Pro plan preserves all AI capabilities while reducing overhead.`,
          priority: "high",
          confidence: "certain",
          layer: 2
        };
      }
    }
    return null;
  }
};

/**
 * LAYER 3 — SAME-VENDOR OPTIMIZATION
 * Checks for cheaper same-vendor options (Downgrades).
 */
const sameVendorOptimizationRule: AuditRule = {
  id: "same-vendor-opt",
  check: (input, tool) => {
    // Claude Team Standard with low seat count
    if (tool.toolId === "claude" && tool.planId === "team_standard" && tool.seats < 5) {
      const proPlan = getPlanPricing("claude", "pro");
      if (proPlan && proPlan.priceMonthly !== null) {
        const optimizedCost = proPlan.priceMonthly * tool.seats;
        return {
          id: `svo-claude-${tool.toolId}`,
          toolId: tool.toolId,
          toolName: "Claude",
          action: "downgrade",
          currentPlanId: "Team Standard",
          recommendedPlanId: "Pro",
          currentMonthlyCost: tool.monthlySpend,
          optimizedMonthlyCost: optimizedCost,
          monthlySavings: tool.monthlySpend - optimizedCost,
          reason: "Claude Team ($25/seat) has a minimum seat requirement or premium features. For teams of < 5, individual Pro plans ($20) offer the same model performance at lower cost.",
          priority: "medium",
          confidence: "likely",
          layer: 3
        };
      }
    }
    return null;
  }
};

/**
 * LAYER 4 — USE CASE FIT
 * Matches tools to primary workflow (Coding, Research, etc).
 */
const useCaseFitRule: AuditRule = {
  id: "use-case-fit",
  check: (input, tool) => {
    // Coding team using generalist tools heavily but missing specialized ones
    if (input.primaryUseCase === "coding") {
      const hasCursor = input.tools.some(t => t.toolId === "cursor");
      if (tool.toolId === "chatgpt" && !hasCursor) {
        return {
          id: `ucf-coding-${tool.toolId}`,
          toolId: "cursor",
          toolName: "Cursor",
          action: "switch",
          currentPlanId: tool.planId,
          recommendedPlanId: "pro",
          currentMonthlyCost: tool.monthlySpend,
          optimizedMonthlyCost: 20, // Baseline Pro
          monthlySavings: 0, // Efficiency switch, not necessarily direct saving
          reason: "For coding-centric teams, Cursor offers deep IDE integration that ChatGPT cannot match. We recommend shifting your primary spend to a dedicated AI IDE to increase developer velocity.",
          priority: "medium",
          confidence: "likely",
          layer: 4
        };
      }
    }
    return null;
  }
};

/**
 * LAYER 5 — REDUNDANT TOOLING
 * Detects overlapping subscriptions.
 */
const redundancyRule: AuditRule = {
  id: "redundancy",
  check: (input, tool) => {
    const hasCursor = input.tools.some(t => t.toolId === "cursor");
    const isCopilot = tool.toolId === "github_copilot";
    
    if (isCopilot && hasCursor) {
      return {
        id: `red-copilot-${tool.toolId}`,
        toolId: tool.toolId,
        toolName: "GitHub Copilot",
        action: "consolidate",
        currentPlanId: tool.planId,
        recommendedPlanId: "none",
        currentMonthlyCost: tool.monthlySpend,
        optimizedMonthlyCost: 0,
        monthlySavings: tool.monthlySpend,
        reason: "Cursor includes built-in high-performance completions. Maintaining a separate GitHub Copilot subscription creates direct feature overlap and redundant spend.",
        priority: "high",
        confidence: "certain",
        layer: 5
      };
    }
    return null;
  }
};

/**
 * LAYER 6 — API VS SUBSCRIPTION
 */
const apiEconomicsRule: AuditRule = {
  id: "api-economics",
  check: (input, tool) => {
    if ((tool.toolId === "openai_api" || tool.toolId === "anthropic_api") && tool.monthlySpend < 15) {
      const hasConsumerPlus = input.tools.some(t => t.toolId === "chatgpt" || t.toolId === "claude");
      if (hasConsumerPlus) {
        return {
          id: `api-econ-${tool.toolId}`,
          toolId: tool.toolId,
          toolName: tool.toolName,
          action: "consolidate",
          currentPlanId: "Usage",
          recommendedPlanId: "none",
          currentMonthlyCost: tool.monthlySpend,
          optimizedMonthlyCost: 0,
          monthlySavings: tool.monthlySpend,
          reason: "Small API usage (<$15/mo) can often be absorbed by your existing UI subscriptions which provide model access via their web interfaces.",
          priority: "low",
          confidence: "speculative",
          layer: 6
        };
      }
    }
    return null;
  }
};

/**
 * LAYER 7 — CREDIT MARKETPLACE
 */
const creditMarketplaceRule: AuditRule = {
  id: "credit-marketplace",
  check: (input, tool) => {
    const totalSpend = input.tools.reduce((sum, t) => sum + t.monthlySpend, 0);
    if (totalSpend > 1000 && (tool.toolId === "openai_api" || tool.toolId === "anthropic_api")) {
      return {
        id: `cm-credits-${tool.toolId}`,
        toolId: tool.toolId,
        toolName: tool.toolName,
        action: "advisory",
        currentPlanId: "Standard API",
        recommendedPlanId: "Infrastructure Credits",
        currentMonthlyCost: tool.monthlySpend,
        optimizedMonthlyCost: tool.monthlySpend * 0.8, // 20% discount approx
        monthlySavings: tool.monthlySpend * 0.2,
        reason: "Your AI spend has reached the threshold where you are eligible for startup infrastructure credits (AWS/Azure/Google). This could reduce your API costs by up to 20% via credit marketplaces.",
        priority: "low",
        confidence: "speculative",
        layer: 7
      };
    }
    return null;
  }
};

/**
 * PRICE OVERAGE RULE (Custom layer 2)
 */
const priceOverageRule: AuditRule = {
  id: "price-overage",
  check: (input, tool) => {
    const officialPlan = getPlanPricing(tool.toolId, tool.planId);
    if (!officialPlan || officialPlan.priceMonthly === null) return null;

    let expectedMonthly = 0;
    if (officialPlan.pricingModel === "per_user") {
      expectedMonthly = officialPlan.priceMonthly * (tool.seats || 1);
    } else {
      expectedMonthly = officialPlan.priceMonthly;
    }

    if (tool.monthlySpend > (expectedMonthly + 2)) {
      const toolData = getToolPricing(tool.toolId);
      const toolName = toolData?.name || tool.toolId;
      const planName = officialPlan.label;

      return {
        id: `overage-${tool.toolId}`,
        toolId: tool.toolId,
        toolName: toolName,
        action: "optimize",
        currentPlanId: planName,
        recommendedPlanId: planName,
        currentMonthlyCost: tool.monthlySpend,
        optimizedMonthlyCost: expectedMonthly,
        monthlySavings: tool.monthlySpend - expectedMonthly,
        reason: `Your reported spend for ${toolName} ${planName} ($${tool.monthlySpend}) exceeds the official list price of $${expectedMonthly}. This often indicates ghost subscriptions or unassigned seats.`,
        priority: "medium",
        confidence: "certain",
        layer: 2
      };
    }
    return null;
  }
};

export const AUDIT_RULES: AuditRule[] = [
  planEfficiencyRule,
  sameVendorOptimizationRule,
  useCaseFitRule,
  redundancyRule,
  apiEconomicsRule,
  creditMarketplaceRule,
  priceOverageRule,
];

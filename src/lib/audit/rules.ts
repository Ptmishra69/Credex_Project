import { AuditInput, ToolInput, Recommendation, AuditRule } from "./types";
import { getPlanPricing, getToolPricing } from "./pricing";

/**
 * DETERMINISTIC BUSINESS RULES
 * These rules evaluate tools based on pricing tiers, team size, and redundancy.
 */

// 1. CURSOR: Solo Business Downgrade
const cursorSoloBusinessRule: AuditRule = {
  id: "cursor-solo-business",
  check: (input, tool) => {
    if (tool.toolId === "cursor" && tool.planId === "teams" && tool.seats === 1) {
      const proPlan = getPlanPricing("cursor", "pro");
      if (proPlan && proPlan.priceMonthly !== null) {
        return {
          toolId: tool.toolId,
          toolName: "Cursor",
          action: "downgrade",
          currentPlanId: "Teams",
          recommendedPlanId: "Pro",
          currentMonthlyCost: tool.monthlySpend,
          optimizedMonthlyCost: proPlan.priceMonthly,
          monthlySavings: tool.monthlySpend - proPlan.priceMonthly,
          reason: "Cursor Teams is priced at $40/user for management features. As a solo developer, the Pro plan ($20) offers identical AI capabilities at half the cost.",
          priority: "high",
        };
      }
    }
    return null;
  }
};

// 2. COPILOT: Redundancy with Cursor
const copilotCursorRedundancyRule: AuditRule = {
  id: "copilot-cursor-redundancy",
  check: (input, tool) => {
    const hasCursor = input.tools.some(t => t.toolId === "cursor");
    if (tool.toolId === "github_copilot" && hasCursor) {
      return {
        toolId: tool.toolId,
        toolName: "GitHub Copilot",
        action: "consolidate",
        currentPlanId: tool.planId,
        recommendedPlanId: "none",
        currentMonthlyCost: tool.monthlySpend,
        optimizedMonthlyCost: 0,
        monthlySavings: tool.monthlySpend,
        reason: "Cursor includes built-in high-performance completions. Maintaining a separate GitHub Copilot subscription creates feature overlap and redundant spend.",
        priority: "medium",
      };
    }
    return null;
  }
};

// 3. CLAUDE: Team to Pro Downgrade
const claudeTeamDowngradeRule: AuditRule = {
  id: "claude-team-downgrade",
  check: (input, tool) => {
    if (tool.toolId === "claude" && tool.planId === "team_standard" && tool.seats <= 2) {
      const proPlan = getPlanPricing("claude", "pro");
      if (proPlan && proPlan.priceMonthly !== null) {
        const optimizedCost = proPlan.priceMonthly * tool.seats;
        return {
          toolId: tool.toolId,
          toolName: "Claude",
          action: "downgrade",
          currentPlanId: "Team Standard",
          recommendedPlanId: "Pro",
          currentMonthlyCost: tool.monthlySpend,
          optimizedMonthlyCost: optimizedCost,
          monthlySavings: tool.monthlySpend - optimizedCost,
          reason: "Claude Team ($25/seat) requires a minimum of 5 seats or admin features that are underutilized for teams of 2 or fewer. Individual Pro plans ($20) are more cost-effective.",
          priority: "medium",
        };
      }
    }
    return null;
  }
};

// 4. CHATGPT: Plus to Free Optimization
const chatgptUsageOptimizationRule: AuditRule = {
  id: "chatgpt-plus-optimization",
  check: (input, tool) => {
    if (tool.toolId === "chatgpt" && tool.planId === "plus" && tool.monthlySpend > 20) {
      return {
        toolId: tool.toolId,
        toolName: "ChatGPT",
        action: "optimize",
        currentPlanId: "Plus",
        recommendedPlanId: "Plus (Fixed)",
        currentMonthlyCost: tool.monthlySpend,
        optimizedMonthlyCost: 20,
        monthlySavings: tool.monthlySpend - 20,
        reason: "Your reported spend exceeds the standard $20 ChatGPT Plus price. Ensure you are not being billed for redundant seats or secondary consumer subscriptions.",
        priority: "low",
      };
    }
    return null;
  }
};

// 5. API: Low usage consolidation
const apiConsolidationRule: AuditRule = {
  id: "api-consolidation",
  check: (input, tool) => {
    if ((tool.toolId === "openai_api" || tool.toolId === "anthropic_api") && tool.monthlySpend < 10) {
      const hasConsumerPlus = input.tools.some(t => t.toolId === "chatgpt" || t.toolId === "claude");
      if (hasConsumerPlus) {
        return {
          toolId: tool.toolId,
          toolName: tool.toolId === "openai_api" ? "OpenAI API" : "Anthropic API",
          action: "consolidate",
          currentPlanId: "Usage",
          recommendedPlanId: "none",
          currentMonthlyCost: tool.monthlySpend,
          optimizedMonthlyCost: 0,
          monthlySavings: tool.monthlySpend,
          reason: "Small API usage ($<10/mo) can often be absorbed by your existing ChatGPT/Claude subscriptions which provide similar model access via their UI/Artifacts.",
          priority: "low",
        };
      }
    }
    return null;
  }
};

// 6. GEMINI: Workspace Add-on redundant with Google One
const geminiWorkspaceRedundancyRule: AuditRule = {
  id: "gemini-workspace-redundancy",
  check: (input, tool) => {
    if (tool.toolId === "gemini" && tool.planId === "workspace_add_on") {
      const hasGoogleOne = input.tools.some(t => t.toolId === "gemini" && t.planId === "pro_one");
      if (hasGoogleOne) {
        return {
          toolId: tool.toolId,
          toolName: "Google Gemini",
          action: "consolidate",
          currentPlanId: "Workspace Add-on",
          recommendedPlanId: "none",
          currentMonthlyCost: tool.monthlySpend,
          optimizedMonthlyCost: 0,
          monthlySavings: tool.monthlySpend,
          reason: "The Gemini Workspace Add-on ($24) often overlaps with the Google One AI Premium ($19.99) plan which includes Gemini Advanced and Workspace integration.",
          priority: "medium",
        };
      }
    }
    return null;
  }
};

// 7. GENERIC: Price Overage Correction
// Flags when reported spend exceeds official pricing for the selected plan/seats
const priceOverageRule: AuditRule = {
  id: "price-overage-correction",
  check: (input, tool) => {
    const officialPlan = getPlanPricing(tool.toolId, tool.planId);
    if (!officialPlan || officialPlan.priceMonthly === null) return null;

    let expectedMonthly = 0;
    if (officialPlan.pricingModel === "per_user") {
      expectedMonthly = officialPlan.priceMonthly * (tool.seats || 1);
    } else {
      expectedMonthly = officialPlan.priceMonthly;
    }

    // Allow a small $2 buffer for regional tax/FX variations
    if (tool.monthlySpend > (expectedMonthly + 2)) {
      const toolData = getToolPricing(tool.toolId);
      const toolName = toolData?.name || tool.toolId;
      const planName = officialPlan.label;

      return {
        toolId: tool.toolId,
        toolName: toolName,
        action: "optimize",
        currentPlanId: planName,
        recommendedPlanId: planName,
        currentMonthlyCost: tool.monthlySpend,
        optimizedMonthlyCost: expectedMonthly,
        monthlySavings: tool.monthlySpend - expectedMonthly,
        reason: `Your reported spend for ${toolName} ${planName} ($${tool.monthlySpend}) exceeds the official list price of $${expectedMonthly}. You may be paying for redundant administrative seats or ghost subscriptions.`,
        priority: "medium",
      };
    }
    return null;
  }
};

export const AUDIT_RULES: AuditRule[] = [
  cursorSoloBusinessRule,
  copilotCursorRedundancyRule,
  claudeTeamDowngradeRule,
  apiConsolidationRule,
  geminiWorkspaceRedundancyRule,
  priceOverageRule,
];

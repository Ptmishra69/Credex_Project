import { AuditInput, AuditResult } from "./types";
import { 
  calculateCurrentSpend, 
  calculateOptimizedSpend, 
  calculateMonthlySavings, 
  calculateAnnualSavings,
  calculateSavingsPercentage
} from "./calculations";
import { generateRecommendations } from "./recommendations";

/**
 * The main entry point for the AI Spend Audit Engine.
 * Transforms user input into a complete optimization report.
 */
export function generateAudit(input: AuditInput): AuditResult {
  const recommendations = generateRecommendations(input);
  
  const currentMonthlySpend = calculateCurrentSpend(input);
  const monthlySavings = calculateMonthlySavings(recommendations);
  const optimizedMonthlySpend = calculateOptimizedSpend(currentMonthlySpend, recommendations);
  const annualSavings = calculateAnnualSavings(monthlySavings);
  const savingsPercentage = calculateSavingsPercentage(currentMonthlySpend, monthlySavings);

  // Identify the single biggest saving opportunity
  const topSavingOpportunity = recommendations.length > 0 
    ? `${recommendations[0].toolName} (${recommendations[0].action})` 
    : null;

  return {
    companyName: input.companyName,
    currentMonthlySpend,
    optimizedMonthlySpend,
    monthlySavings,
    annualSavings,
    recommendations,
    summaryMetadata: {
      totalToolsAnalyzed: input.tools.length,
      potentialSavingsPercentage: Math.round(savingsPercentage),
      topSavingOpportunity,
    },
  };
}

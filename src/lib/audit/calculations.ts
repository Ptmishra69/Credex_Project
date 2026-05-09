import { AuditInput, Recommendation } from "./types";

/**
 * Pure calculation functions for audit financials.
 */

export function calculateCurrentSpend(input: AuditInput): number {
  return input.tools.reduce((total, tool) => total + tool.monthlySpend, 0);
}

export function calculateOptimizedSpend(currentSpend: number, recommendations: Recommendation[]): number {
  const totalSavings = recommendations.reduce((total, rec) => total + rec.monthlySavings, 0);
  return Math.max(0, currentSpend - totalSavings);
}

export function calculateMonthlySavings(recommendations: Recommendation[]): number {
  return recommendations.reduce((total, rec) => total + rec.monthlySavings, 0);
}

export function calculateAnnualSavings(monthlySavings: number): number {
  return monthlySavings * 12;
}

export function calculateSavingsPercentage(current: number, savings: number): number {
  if (current === 0) return 0;
  return (savings / current) * 100;
}

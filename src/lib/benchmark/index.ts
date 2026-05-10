import { AuditResult } from "@/lib/audit/types";

export interface BenchmarkResult {
  category: string;
  percentile: number;
  isAboveAverage: boolean;
  percentageDiff: number;
  spendPerUser: number;
  targetSpendPerUser: number;
  insight: string;
}

/**
 * Industry Benchmark Engine
 * Compares current audit results against normalized industry data.
 */
export function calculateBenchmarks(result: AuditResult, teamSize: number): BenchmarkResult {
  const currentMonthly = result.currentMonthlySpend;
  const spendPerUser = currentMonthly / (teamSize || 1);

  // 1. Determine Category by Team Size
  let category = "Startup (2-10)";
  let targetSpendPerUser = 35; // Monthly $ per user

  if (teamSize <= 1) {
    category = "Solo Developer";
    targetSpendPerUser = 45; // Higher per-user cost for solo (no volume discounts)
  } else if (teamSize > 10 && teamSize <= 50) {
    category = "Growth Stage (11-50)";
    targetSpendPerUser = 30;
  } else if (teamSize > 50) {
    category = "Enterprise (51+)";
    targetSpendPerUser = 25;
  }

  // 2. Calculate Comparison
  const diff = spendPerUser - targetSpendPerUser;
  const percentageDiff = Math.abs((diff / targetSpendPerUser) * 100);
  const isAboveAverage = diff > 0;

  // 3. Estimate Percentile (Simple Heuristic)
  // 50th percentile is average. 
  // If you spend 20% more, you're in the 70th percentile of spenders.
  let percentile = 50 + (diff / targetSpendPerUser) * 50;
  percentile = Math.max(5, Math.min(95, percentile)); // Cap between 5% and 95%

  // 4. Generate Insight Text
  let insight = "Your AI spend is perfectly aligned with industry leaders of your size.";
  
  if (isAboveAverage) {
    insight = `Your AI spend per user is ${percentageDiff.toFixed(0)}% higher than similar ${category} companies.`;
  } else if (percentageDiff > 10) {
    insight = `Excellent! You are spending ${percentageDiff.toFixed(0)}% less than the industry average for ${category} teams.`;
  }

  return {
    category,
    percentile: Math.round(percentile),
    isAboveAverage,
    percentageDiff: Math.round(percentageDiff),
    spendPerUser: Math.round(spendPerUser),
    targetSpendPerUser,
    insight,
  };
}

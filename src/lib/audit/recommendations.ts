import { AuditInput, Recommendation } from "./types";
import { AUDIT_RULES } from "./rules";

/**
 * Generates a list of optimization recommendations based on the rules engine.
 */
export function generateRecommendations(input: AuditInput): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Iterate over every tool the user submitted
  for (const tool of input.tools) {
    // Run every rule against this tool
    for (const rule of AUDIT_RULES) {
      const recommendation = rule.check(input, tool);
      
      if (recommendation) {
        // Basic conflict resolution: If we already have a recommendation for this tool,
        // we keep the one with higher savings (or could use priority).
        const existingIdx = recommendations.findIndex(r => r.toolId === tool.toolId);
        
        if (existingIdx !== -1) {
          if (recommendation.monthlySavings > recommendations[existingIdx].monthlySavings) {
            recommendations[existingIdx] = recommendation;
          }
        } else {
          recommendations.push(recommendation);
        }
      }
    }
  }

  // Sort by savings (highest first)
  return recommendations.sort((a, b) => b.monthlySavings - a.monthlySavings);
}

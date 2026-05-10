import { AuditResult } from "@/lib/audit/types";

/**
 * Prompts for the AI summary generation.
 */
export const SUMMARY_PROMPT = (result: AuditResult) => `
You are a senior fintech systems architect. Analyze the following AI Spend Audit results for "${result.companyName}" and provide a concise executive summary.

METRICS:
- Current Monthly Spend: $${result.currentMonthlySpend}
- Annual Potential Savings: $${result.annualSavings}
- Potential Savings %: ${result.summaryMetadata.potentialSavingsPercentage}%
- Top Saving Opportunity: ${result.summaryMetadata.topSavingOpportunity || 'None'}

RECOMMENDATIONS:
${result.recommendations.map(r => `- [${r.action.toUpperCase()}] ${r.toolName}: ${r.reason}`).join('\n')}

INSTRUCTIONS:
1. Tone: Analytical, professional, financially credible.
2. Length: 80-120 words.
3. Focus on the biggest opportunity and the overall efficiency of the stack.
4. Avoid fluff or marketing speak.
5. Format: Return only the text summary.
`;

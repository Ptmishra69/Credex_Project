import { AuditInput, AuditResult, Recommendation, CompanyStage } from "./types";
import { AUDIT_RULES, classifyCompany } from "./rules";
import { calculateMonthlySavings, calculateAnnualSavings } from "./calculations";

export async function runAudit(input: AuditInput): Promise<AuditResult> {
  const recommendations: Recommendation[] = [];
  const currentMonthlySpend = input.tools.reduce((sum, t) => sum + t.monthlySpend, 0);
  const companyStage = classifyCompany(input.teamSize);


  for (const tool of input.tools) {
    for (const rule of AUDIT_RULES) {
      const rec = rule.check(input, tool);
      if (rec) {
        recommendations.push(rec);
      }
    }
  }


  const totalMonthlySavings = recommendations.reduce((sum, r) => sum + r.monthlySavings, 0);
  const optimizedMonthlySpend = Math.max(0, currentMonthlySpend - totalMonthlySavings);
  
  const monthlySavings = totalMonthlySavings;
  const annualSavings = calculateAnnualSavings(monthlySavings);
  
  const isOptimized = monthlySavings === 0;
  const potentialSavingsPercentage = currentMonthlySpend > 0 
    ? Math.round(((monthlySavings / currentMonthlySpend) * 100) * 10) / 10
    : 0;


  const topRec = [...recommendations].sort((a, b) => b.monthlySavings - a.monthlySavings)[0];
  const topSavingOpportunity = topRec ? `${topRec.toolName} (${topRec.action})` : null;


  const verdict = generateVerdict(monthlySavings, potentialSavingsPercentage, companyStage);

  return {
    companyName: input.companyName,
    companyStage,
    currentMonthlySpend,
    optimizedMonthlySpend,
    monthlySavings,
    annualSavings,
    verdict,
    recommendations,
    summaryMetadata: {
      totalToolsAnalyzed: input.tools.length,
      potentialSavingsPercentage,
      topSavingOpportunity,
      isOptimized,
    },
  };
}

function generateVerdict(savings: number, percentage: number, stage: CompanyStage): string {
  if (savings === 0) {
    return "Your AI stack is already highly optimized. You are paying list price for essential tools with no detectable redundancy.";
  }
  
  if (percentage < 10) {
    return `Your stack is reasonably efficient, but there are minor optimization opportunities ($${savings}/mo) in plan right-sizing.`;
  }

  if (percentage > 30) {
    return `Critical inefficiency detected. Your current spend is significantly above market list price for a ${stage}-stage team. Immediate consolidation is recommended.`;
  }

  return `We've identified $${savings}/mo in implementable savings. Most of this comes from redundant tooling and misaligned plan tiers.`;
}

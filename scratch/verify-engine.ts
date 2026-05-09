import { generateAudit } from "../src/lib/audit/engine";
import { AuditInput } from "../src/lib/audit/types";

// Scenario 1: Solo developer overspending
const soloDev: AuditInput = {
  companyName: "SoloDev Inc",
  teamSize: 1,
  useCase: "coding",
  tools: [
    { toolId: "cursor", planId: "business", monthlySpend: 40, seats: 1 },
    { toolId: "github_copilot", planId: "individual", monthlySpend: 10, seats: 1 }
  ]
};

// Scenario 2: Small startup using Team unnecessarily
const smallStartup: AuditInput = {
  companyName: "GrowthOps",
  teamSize: 5,
  useCase: "general",
  tools: [
    { toolId: "chatgpt", planId: "team", monthlySpend: 60, seats: 2 }, // 2 seats on team
    { toolId: "openai_api", planId: "usage", monthlySpend: 5, seats: 1 } // very low api spend
  ]
};

console.log("--- SOLO DEV AUDIT ---");
const res1 = generateAudit(soloDev);
console.log(`Current: $${res1.currentMonthlySpend}, Optimized: $${res1.optimizedMonthlySpend}`);
console.log(`Savings: $${res1.monthlySavings}/mo ($${res1.annualSavings}/yr)`);
res1.recommendations.forEach(r => console.log(`- [${r.action}] ${r.toolName}: ${r.reason}`));

console.log("\n--- SMALL STARTUP AUDIT ---");
const res2 = generateAudit(smallStartup);
console.log(`Current: $${res2.currentMonthlySpend}, Optimized: $${res2.optimizedMonthlySpend}`);
console.log(`Savings: $${res2.monthlySavings}/mo ($${res2.annualSavings}/yr)`);
res2.recommendations.forEach(r => console.log(`- [${r.action}] ${r.toolName}: ${r.reason}`));

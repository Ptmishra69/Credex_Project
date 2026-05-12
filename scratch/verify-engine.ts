import { runAudit } from "../src/lib/audit/engine";
import { AuditInput } from "../src/lib/audit/types";

// Scenario 1: Solo developer overspending
const soloDev: AuditInput = {
  companyName: "SoloDev Inc",
  teamSize: 1,
  primaryUseCase: "coding",
  tools: [
    { toolId: "cursor", toolName: "Cursor", planId: "teams", monthlySpend: 40, seats: 1 },
    { toolId: "github_copilot", toolName: "GitHub Copilot", planId: "individual", monthlySpend: 10, seats: 1 }
  ]
};

// Scenario 2: Small startup using Team unnecessarily
const smallStartup: AuditInput = {
  companyName: "GrowthOps",
  teamSize: 5,
  primaryUseCase: "mixed",
  tools: [
    { toolId: "chatgpt", toolName: "ChatGPT", planId: "team", monthlySpend: 60, seats: 2 },
    { toolId: "openai_api", toolName: "OpenAI API", planId: "usage", monthlySpend: 5, seats: 1 }
  ]
};

async function main() {
  console.log("--- SOLO DEV AUDIT ---");
  const res1 = await runAudit(soloDev);
  console.log(`Current: $${res1.currentMonthlySpend}, Optimized: $${res1.optimizedMonthlySpend}`);
  console.log(`Savings: $${res1.monthlySavings}/mo ($${res1.annualSavings}/yr)`);
  console.log(`Verdict: ${res1.verdict}`);
  res1.recommendations.forEach(r => console.log(`- [L${r.layer}][${r.action}] ${r.toolName}: ${r.reason}`));

  console.log("\n--- SMALL STARTUP AUDIT ---");
  const res2 = await runAudit(smallStartup);
  console.log(`Current: $${res2.currentMonthlySpend}, Optimized: $${res2.optimizedMonthlySpend}`);
  console.log(`Savings: $${res2.monthlySavings}/mo ($${res2.annualSavings}/yr)`);
  console.log(`Verdict: ${res2.verdict}`);
  res2.recommendations.forEach(r => console.log(`- [L${r.layer}][${r.action}] ${r.toolName}: ${r.reason}`));
}

main();

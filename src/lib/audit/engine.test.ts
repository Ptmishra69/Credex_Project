import { describe, it, expect } from "vitest";
import { runAudit } from "./engine";
import { AuditInput } from "./types";
import { classifyCompany } from "./rules";
import {
  calculateCurrentSpend,
  calculateOptimizedSpend,
  calculateMonthlySavings,
  calculateAnnualSavings,
  calculateSavingsPercentage,
} from "./calculations";

// ============================================================
// TEST 1: Solo developer with enterprise plan overkill
// ============================================================
describe("Layer 2 — Plan Efficiency (Enterprise Overkill)", () => {
  it("should recommend downgrade when a solo user is on a team plan", async () => {
    const input: AuditInput = {
      companyName: "SoloDev LLC",
      teamSize: 1,
      primaryUseCase: "coding",
      tools: [
        { toolId: "cursor", toolName: "Cursor", planId: "teams", monthlySpend: 40, seats: 1 },
      ],
    };

    const result = await runAudit(input);

    expect(result.recommendations.length).toBeGreaterThan(0);
    const rec = result.recommendations.find((r) => r.toolId === "cursor" && r.action === "downgrade");
    expect(rec).toBeDefined();
    expect(rec!.monthlySavings).toBeGreaterThan(0);
    expect(rec!.confidence).toBe("certain");
    expect(rec!.layer).toBe(2);
  });
});

// ============================================================
// TEST 2: Cursor + Copilot redundancy detection
// ============================================================
describe("Layer 5 — Redundant Tooling", () => {
  it("should flag GitHub Copilot as redundant when Cursor is present", async () => {
    const input: AuditInput = {
      companyName: "DualIDE Inc",
      teamSize: 3,
      primaryUseCase: "coding",
      tools: [
        { toolId: "cursor", toolName: "Cursor", planId: "pro", monthlySpend: 20, seats: 1 },
        { toolId: "github_copilot", toolName: "GitHub Copilot", planId: "individual", monthlySpend: 10, seats: 1 },
      ],
    };

    const result = await runAudit(input);

    const rec = result.recommendations.find((r) => r.toolId === "github_copilot");
    expect(rec).toBeDefined();
    expect(rec!.action).toBe("consolidate");
    expect(rec!.monthlySavings).toBe(10);
    expect(rec!.priority).toBe("high");
  });
});

// ============================================================
// TEST 3: Already optimized stack should return no savings
// ============================================================
describe("Honesty — Optimized Stack Detection", () => {
  it("should return zero savings when the stack is already efficient", async () => {
    const input: AuditInput = {
      companyName: "LeanStartup Co",
      teamSize: 5,
      primaryUseCase: "coding",
      tools: [
        { toolId: "cursor", toolName: "Cursor", planId: "pro", monthlySpend: 20, seats: 1 },
      ],
    };

    const result = await runAudit(input);

    expect(result.monthlySavings).toBe(0);
    expect(result.summaryMetadata.isOptimized).toBe(true);
    expect(result.verdict).toContain("optimized");
  });
});

// ============================================================
// TEST 4: Price overage detection
// ============================================================
describe("Price Overage Rule", () => {
  it("should flag when reported spend exceeds official list price", async () => {
    const input: AuditInput = {
      companyName: "Overpaying Corp",
      teamSize: 1,
      primaryUseCase: "mixed",
      tools: [
        { toolId: "chatgpt", toolName: "ChatGPT", planId: "plus", monthlySpend: 35, seats: 1 },
      ],
    };

    const result = await runAudit(input);

    const rec = result.recommendations.find((r) => r.action === "optimize");
    expect(rec).toBeDefined();
    expect(rec!.monthlySavings).toBeGreaterThan(0);
    expect(rec!.reason).toContain("exceeds");
  });
});

// ============================================================
// TEST 5: Savings calculations are mathematically correct
// ============================================================
describe("Savings Calculations", () => {
  it("should correctly compute current spend from tool inputs", () => {
    const input: AuditInput = {
      companyName: "Test",
      teamSize: 1,
      primaryUseCase: "mixed",
      tools: [
        { toolId: "cursor", toolName: "Cursor", planId: "pro", monthlySpend: 20, seats: 1 },
        { toolId: "chatgpt", toolName: "ChatGPT", planId: "plus", monthlySpend: 20, seats: 1 },
        { toolId: "claude", toolName: "Claude", planId: "pro", monthlySpend: 20, seats: 1 },
      ],
    };

    expect(calculateCurrentSpend(input)).toBe(60);
  });

  it("should compute annual savings as 12x monthly", () => {
    expect(calculateAnnualSavings(100)).toBe(1200);
    expect(calculateAnnualSavings(0)).toBe(0);
  });

  it("should compute savings percentage correctly", () => {
    expect(calculateSavingsPercentage(200, 50)).toBe(25);
    expect(calculateSavingsPercentage(0, 0)).toBe(0);
  });

  it("should never return negative optimized spend", () => {
    const recs = [
      { monthlySavings: 500 },
      { monthlySavings: 300 },
    ] as any[];

    expect(calculateOptimizedSpend(100, recs)).toBe(0);
  });
});

// ============================================================
// TEST 6: Company classification
// ============================================================
describe("Team Classification", () => {
  it("should classify solo operators correctly", () => {
    expect(classifyCompany(1)).toBe("solo");
  });

  it("should classify startups correctly", () => {
    expect(classifyCompany(5)).toBe("startup");
    expect(classifyCompany(10)).toBe("startup");
  });

  it("should classify growth-stage companies", () => {
    expect(classifyCompany(25)).toBe("growth");
    expect(classifyCompany(50)).toBe("growth");
  });

  it("should classify enterprise", () => {
    expect(classifyCompany(100)).toBe("enterprise");
  });
});

// ============================================================
// TEST 7: Same-vendor downgrade (Claude Team → Pro)
// ============================================================
describe("Layer 3 — Same-Vendor Optimization", () => {
  it("should recommend Claude Pro over Team for small teams", async () => {
    const input: AuditInput = {
      companyName: "SmallTeam AI",
      teamSize: 3,
      primaryUseCase: "writing",
      tools: [
        { toolId: "claude", toolName: "Claude", planId: "team_standard", monthlySpend: 75, seats: 3 },
      ],
    };

    const result = await runAudit(input);

    const rec = result.recommendations.find((r) => r.toolId === "claude" && r.action === "downgrade");
    expect(rec).toBeDefined();
    expect(rec!.recommendedPlanId).toBe("Pro");
    expect(rec!.monthlySavings).toBeGreaterThan(0);
  });
});

// ============================================================
// TEST 8: Verdict generation
// ============================================================
describe("Verdict Generation", () => {
  it("should produce an optimized verdict when savings are zero", async () => {
    const input: AuditInput = {
      companyName: "PerfectStack",
      teamSize: 3,
      primaryUseCase: "research",
      tools: [
        { toolId: "claude", toolName: "Claude", planId: "pro", monthlySpend: 20, seats: 1 },
      ],
    };

    const result = await runAudit(input);
    expect(result.verdict).toContain("optimized");
  });

  it("should produce a savings verdict when there are recommendations", async () => {
    const input: AuditInput = {
      companyName: "WastefulCo",
      teamSize: 1,
      primaryUseCase: "coding",
      tools: [
        { toolId: "cursor", toolName: "Cursor", planId: "teams", monthlySpend: 40, seats: 1 },
        { toolId: "github_copilot", toolName: "Copilot", planId: "individual", monthlySpend: 10, seats: 1 },
      ],
    };

    const result = await runAudit(input);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.verdict.length).toBeGreaterThan(20);
  });
});

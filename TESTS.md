# TESTS.md

## Test Suite Overview

All automated tests are located in `src/lib/audit/engine.test.ts` and cover the core audit engine — the financial brain of the application. Tests are written with [Vitest](https://vitest.dev/) and run in under 1 second.

### How to Run

```bash
npm test
```

This executes `vitest run`, which finds all `*.test.ts` files and runs them in Node.js.

---

## Test Inventory

| # | Test Name | What It Covers | File |
|---|---|---|---|
| 1 | Solo user on team plan → downgrade | Layer 2: Plan Efficiency — detects enterprise overkill for solo operators | `engine.test.ts` |
| 2 | Cursor + Copilot → consolidate | Layer 5: Redundancy — flags overlapping IDE subscriptions | `engine.test.ts` |
| 3 | Optimized stack → zero savings | Honesty rule — confirms engine doesn't fabricate savings | `engine.test.ts` |
| 4 | Reported spend > list price → flag | Price Overage — catches ghost seats and billing errors | `engine.test.ts` |
| 5 | Current spend calculation | Math — sums tool.monthlySpend across all entries | `engine.test.ts` |
| 6 | Annual savings = 12 × monthly | Math — verifies annualization | `engine.test.ts` |
| 7 | Savings percentage | Math — division-by-zero safety | `engine.test.ts` |
| 8 | Negative optimized spend guard | Math — ensures optimized spend never goes below $0 | `engine.test.ts` |
| 9 | classifyCompany("solo") | Classification — team of 1 | `engine.test.ts` |
| 10 | classifyCompany("startup") | Classification — teams of 5-10 | `engine.test.ts` |
| 11 | classifyCompany("growth") | Classification — teams of 25-50 | `engine.test.ts` |
| 12 | classifyCompany("enterprise") | Classification — teams of 100+ | `engine.test.ts` |
| 13 | Claude Team → Pro downgrade | Layer 3: Same-Vendor — small teams don't need Team plan | `engine.test.ts` |
| 14 | Verdict: optimized stack | Verdict — confirms "optimized" wording when savings = 0 | `engine.test.ts` |
| 15 | Verdict: wasteful stack | Verdict — confirms savings-aware verdict text | `engine.test.ts` |

---

## Latest Run Output

```
 ✓ src/lib/audit/engine.test.ts (15 tests) 12ms

 Test Files  1 passed (1)
      Tests  15 passed (15)
   Duration  661ms
```

# REFLECTION.md

---

## 1. The Hardest Bug I Hit This Week

The hardest bug was a silent data corruption issue in the pricing engine.

I had set up the `pricing.ts` catalog with every AI tool's plans — Cursor Pro at $20, Claude Pro at $20, ChatGPT Plus at $20, etc. The audit engine would loop through a user's tools, look up the official price, and compare it to their reported spend. Simple enough.

The bug: when a user entered 10 seats on Claude Pro, the engine was calculating the "expected cost" as $20/month flat — not $20 × 10 = $200/month. So anyone with more than 1 seat was being told they were massively overspending, even when they were paying exactly the right amount.

**What I tried first:** I assumed the issue was in the rules engine. I added `console.log` statements in every rule's `check()` function to trace which rule was generating the incorrect recommendation. The overage rule was firing, which was correct — it *should* fire when reported spend exceeds expected. But the "expected" number was wrong.

**Second hypothesis:** Maybe the `seats` value wasn't being passed through correctly from the form. I traced the data from `audit-form.tsx` → `submitAudit()` → `runAudit()` → the rule. The seats value was 10 at every step. The data was fine.

**What actually fixed it:** The root cause was in `pricing.ts`. I had defined every plan with `pricingModel: "flat"` during the initial scaffold on Day 2, because I was focused on getting the structure right. When I added the team pricing logic later, I never went back and changed Pro plans to `pricingModel: "per_user"`. The engine was checking `if (plan.pricingModel === "per_user")` before multiplying by seats — and since every plan said "flat", it never multiplied.

The fix was one-line-per-plan: changing `"flat"` to `"per_user"` for every Pro tier. But finding it took over an hour because the bug was in the *data*, not the *logic*. The code was doing exactly what I told it to do — the problem was that I told it the wrong thing.

**Lesson:** When your financial calculations are wrong, check your pricing catalog before you check your math. Static data bugs are invisible to debuggers.

---

## 2. A Decision I Reversed Mid-Week

On Day 3, I built the audit engine as a single `generateAudit()` function that did everything — classification, rule evaluation, savings calculation, and result assembly — in one big synchronous block. It worked. The tests passed. I shipped it.

By Day 5, I reversed this and broke it into a multi-layer architecture with `classifyCompany()`, 7 named `AuditRule` objects, and a `generateVerdict()` function.

**Why I reversed it:** When I tried to add the "use case fit" rule (recommending Cursor for coding teams), I realized I couldn't easily test it without running the entire engine. The monolithic function made unit testing painful — I had to construct a full `AuditInput` with all fields just to test one rule. And when a rule failed, the error pointed to a 100-line function instead of a specific 15-line rule.

**What made me actually do it:** The Credex spec explicitly asked for "modular pure functions" and "highly testable" code. I had been putting off the refactor because the monolith worked. But when I sat down to write the Day 6 tests, I couldn't write clean, isolated test cases. That was the forcing function.

The refactor took about 2 hours and broke the build 3 times (mostly import mismatches), but the result is dramatically better. Each rule is now a standalone object that I can test with a 5-line input.

---

## 3. What I Would Build in Week 2

If I had a second week, here's what I'd prioritize:

1. **Automated email delivery** — Right now the "Email Full Report" modal captures the lead's email in Supabase but doesn't actually send anything. I'd integrate Resend ($0 for 100 emails/day) to send a formatted HTML report with the user's specific savings breakdown.

2. **A "Saved Audits" dashboard** — Add Supabase Auth so returning users can log in and see all their past audits. This creates a retention loop and gives us longitudinal data on how companies' AI spend changes over time.

3. **Dynamic pricing updates** — The static pricing catalog will go stale. I'd build a simple admin page where we can update plan prices without redeploying, backed by a Supabase table with a TTL cache.

4. **Deeper redundancy detection** — Right now we only catch Cursor + Copilot overlap. In week 2, I'd add detection for ChatGPT + Claude + Gemini (triple-stacking general-purpose LLMs) and surface a "pick your best 2" recommendation.

5. **A/B test the CTA** — The current CTA says "Book Savings Consultation." I'd want to test that against "Get Your Custom Optimization Plan" and "Talk to a Credex Expert" to see which converts better.

---

## 4. How I Used AI Tools

I used **Antigravity (Gemini-based coding assistant)** as my primary pair-programming tool throughout the week.

**What I used it for:**
- Scaffolding boilerplate (component files, Supabase client setup, Zod schemas)
- Debugging TypeScript errors — especially the recurring `Property does not exist on type 'never'` issues with Supabase's auto-generated types
- Writing the pricing catalog data (I gave it the official pricing pages and asked it to structure the data)
- Generating the initial CSS design system tokens

**What I didn't trust it with:**
- Financial calculations. I manually verified every savings formula by hand with a calculator. The engine's math is too critical to trust to an LLM.
- Business logic decisions. The 7-layer evaluation framework came from my own understanding of SaaS procurement, not from asking AI "what rules should I use."
- User interview insights. Those conversations happened in real life and I wrote the notes myself.

**One specific time the AI was wrong and I caught it:**
When I asked it to fix the `priceOverageRule`, it added a call to `getToolPricing()` in `rules.ts` but forgot to import the function. The code looked correct syntactically, but the build failed with `Cannot find name 'getToolPricing'`. This is a classic AI mistake — it generates correct-looking code but doesn't track the import context of the file it's editing. I caught it immediately because I always run `npm run build` after every change, and the TypeScript compiler flagged it.

The broader lesson: AI is great at generating code *within* a function, but it struggles with *cross-file* dependencies. I always double-check imports manually.

---

## 5. Self-Rating

| Dimension | Score | Reason |
|---|---|---|
| **Discipline** | 7/10 | I shipped every day and maintained a devlog, but I compressed Days 4-5 into one session because of exam pressure. A 10 would have been steady daily commits. |
| **Code Quality** | 7/10 | The engine is modular and testable. The `as any` casts on Supabase calls are technical debt I'm aware of — they exist because I didn't sync the generated types. |
| **Design Sense** | 8/10 | The dark fintech theme, glassmorphic cards, and Recharts visualizations look genuinely premium. I'm proud of the result dashboard — it doesn't look like a student project. |
| **Problem Solving** | 8/10 | The pricing model bug and the 7-layer refactor were real engineering challenges that I solved methodically. I traced data flows, formed hypotheses, and iterated. |
| **Entrepreneurial Thinking** | 7/10 | I built features that drive business outcomes (lead capture, sharing, benchmarking), not just technical features. But I could have done more customer discovery earlier in the week. |

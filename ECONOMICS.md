# ECONOMICS.md — Unit Economics Analysis

---

## What Is a Converted Lead Worth to Credex?

Credex sells discounted cloud infrastructure credits. A typical customer buys credits in bulk — let's estimate conservatively.

**Assumptions:**
- Average cloud credit purchase: **$5,000–$20,000/year**
- Credex margin on credit resale: **~15-20%** (standard marketplace margin)
- Average revenue per customer: **$1,500–$4,000/year**
- Customer lifetime: **~2 years** (startups either grow into direct contracts or stay)
- **Estimated LTV per converted customer: ~$5,000**

The AI Spend Audit tool targets the same buyer — engineering leaders at startups managing cloud + AI budgets. A lead who completes an audit and books a consultation has already demonstrated:
1. They manage a meaningful AI/cloud budget
2. They care about cost optimization
3. They're willing to engage with a tool from Credex

**Estimated value of a qualified lead: $200–$500** (based on a 5-10% close rate on consultations × $5,000 LTV).

---

## Customer Acquisition Cost by Channel

| Channel | Effort (hrs/week) | Expected Leads/Month | Effective CAC |
|---|---|---|---|
| Reddit (r/startups, r/SaaS) | 3 hrs | 5-8 leads | $0 (time only) |
| Twitter/X threads | 2 hrs | 3-5 leads | $0 (time only) |
| Cursor/Supabase Discord | 1 hr | 2-3 leads | $0 (time only) |
| Hacker News (Show HN) | 1 hr (one-time) | 10-15 leads (spike) | $0 (time only) |
| Credex onboarding embed | 0 hrs (automated) | 20-30 leads | $0 (existing traffic) |

If we value engineering time at $50/hr, the organic channels cost ~$350/month for ~20-30 leads.

**Organic CAC: ~$12–$18 per lead.**

The Credex onboarding embed is essentially **$0 CAC** since those users are already in the funnel.

---

## Conversion Funnel

Here's the full funnel from audit to revenue:

```
Audit Page Visit          1,000 visitors/month
        ↓ (30% form completion)
Audit Completed             300 audits/month
        ↓ (12% email capture)
Lead Captured                36 leads/month
        ↓ (25% book consultation)
Consultation Booked           9 consultations/month
        ↓ (33% convert to credit purchase)
Credit Purchase                3 customers/month
        ↓ (× $5,000 LTV)
Monthly Revenue            $15,000/month
```

**Break-even requires:** At $0 paid spend, the tool is profitable from day one. The only cost is the Vercel hosting ($0 on free tier up to ~100k requests) and Supabase ($0 on free tier up to 500MB).

---

## Path to $1M ARR in 18 Months

$1M ARR = ~$83,333/month in revenue.

At $5,000 LTV per customer, that's **200 active customers** or roughly **~17 new customers/month** sustained.

Working backwards through the funnel:

| Metric | Required Monthly Volume |
|---|---|
| New customers | 17 |
| Consultations booked (at 33% close) | 51 |
| Leads captured (at 25% consultation rate) | 204 |
| Audits completed (at 12% capture rate) | 1,700 |
| Page visitors (at 30% completion rate) | 5,667 |

**What has to be true:**

1. **~6,000 monthly visitors** — Achievable through a combination of organic content (SEO-optimized blog posts about AI spend optimization), Credex's existing customer base, and community presence. This is not a crazy number for a free tool.

2. **30% form completion rate** — The current form is short (company name, team size, use case, tool list). This rate is realistic for a free tool with no signup required.

3. **The Credex onboarding embed must work** — If Credex embeds the audit in their existing customer flow, the 6,000 visitors become much easier. Even if only 10% of existing Credex customers try the audit, that's a significant base.

4. **LTV must hold at $5,000** — This depends on Credex's credit pricing and retention. If customers churn faster or buy smaller packages, the math breaks.

5. **The tool must expand beyond AI spend** — At $1M ARR, we'd likely need to audit cloud spend too (AWS, GCP, Azure), not just AI subscriptions. The engine architecture supports this — adding new tools to the pricing catalog is trivial.

---

## Honest Assessment

The $1M ARR target is aggressive for 18 months. The most realistic path is:

- **Months 1-6:** $5k-10k/month from organic + Credex embed (20-40 customers)
- **Months 7-12:** $20k-40k/month as SEO kicks in and the tool gets word-of-mouth
- **Months 13-18:** $50k-80k/month if cloud spend auditing is added

Getting to $1M ARR probably takes 24 months, not 18. But the unit economics are sound — CAC is near-zero, and each customer is worth thousands.

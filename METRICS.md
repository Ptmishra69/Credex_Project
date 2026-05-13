# METRICS.md — Product Analytics Framework

---

## North Star Metric

**Audits Completed Per Week**

This is the single number I'd check every Monday morning. Here's why:

An "audit completed" means a user trusted us enough to enter their real spending data, waited for the engine to process it, and saw their results. It sits at the exact intersection of acquisition (they found us), activation (they filled the form), and value delivery (they got savings recommendations).

Unlike "page views" or "signups," a completed audit means the user *received value*. And unlike "consultations booked," it's high-volume enough to be statistically meaningful in week 1.

If this number is growing, everything downstream — leads, consultations, revenue — will follow.

---

## Three Input Metrics That Drive the North Star

### 1. Form Start Rate
**Definition:** % of `/audit` page visitors who add at least one tool entry.

**Why it matters:** If people land on the form and bounce, either the page copy isn't compelling or the form looks too long. This metric tells us if we have a *demand* problem or a *UX* problem.

**Target:** >40% form start rate.

### 2. Form Completion Rate
**Definition:** % of users who start the form and successfully submit it.

**Why it matters:** Drop-off between starting and completing means the form is confusing, too long, or erroring out. This is the most actionable metric — we can directly improve it by simplifying fields, adding better validation messages, or reducing the number of required inputs.

**Target:** >70% completion rate (among starters).

### 3. Share Rate
**Definition:** % of users who complete an audit and then copy the share link or open the email modal.

**Why it matters:** This is our organic growth multiplier. Every shared audit is a free impression to a potential new user — and shared audits carry implicit social proof ("my colleague used this and saved $X"). If the share rate is zero, we have no viral loop and growth depends entirely on direct acquisition.

**Target:** >8% share rate.

---

## What I'd Instrument First

If I had to add analytics tomorrow with one afternoon of work:

1. **PostHog or Mixpanel** on three events:
   - `audit_form_started` (user adds first tool)
   - `audit_completed` (form submitted successfully)
   - `share_clicked` (copy link or email modal opened)

2. **A simple Supabase query** counting audits per day, run as a daily cron that posts to a Slack channel. No dashboard needed — just a number in Slack every morning.

3. **UTM parameter tracking** on the result page URL, so when someone shares a link on Twitter or Reddit, we know which channel drove the re-visit.

---

## What Number Triggers a Pivot

If after 30 days of active distribution (Reddit posts, Twitter threads, Discord sharing):

- **< 50 audits completed total** → The problem isn't big enough, or our distribution isn't reaching the right people. Pivot: try a different wedge (maybe audit cloud spend instead of AI tools, or target a different persona like CFOs instead of engineering managers).

- **> 200 audits but < 5 leads captured** → People find the tool useful but don't trust us enough to give their email. Pivot: remove the email gate entirely and find another monetization path (maybe a "premium audit" with API usage analysis).

- **> 50 audits and > 10 leads but 0 consultations** → The leads are curious but not in pain. Pivot: the savings amounts are too small to motivate action. We need to audit bigger spend categories (cloud infra, not just AI tools) to find larger savings that justify a conversation.

The honest truth: if the tool can't generate 3 consultation requests in 30 days of active promotion, the AI-spend-audit wedge isn't strong enough for Credex and we should explore a different entry point.

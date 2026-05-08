# AI Tool Pricing Data — Official Sources

> **Last verified:** 2026-05-07
> All prices in USD. Monthly unless otherwise noted.

---

## 1. Cursor

| Plan | Price | Notes |
|---|---|---|
| Hobby | $0/mo | Limited completions |
| Pro | $20/mo | Unlimited completions, 500 fast premium requests |
| Pro+ | $60/mo | Unlimited completions, 1500 fast premium requests |
| Ultra | $200/mo | Unlimited completions, unlimited fast premium requests |
| Teams | $40/user/mo | Team admin, centralized billing, usage dashboard |

**Source:** [cursor.com/pricing](https://cursor.com/pricing)

---

## 2. GitHub Copilot

| Plan | Price | Notes |
|---|---|---|
| Pro | $10/mo | Individual developers |
| Pro+ | $39/mo | Expanded model access, premium requests |
| Business | $19/user/mo | Organization-level, policy controls |
| Enterprise | $39/user/mo | Enterprise SSO, audit logs, IP indemnity |

**Source:** [GitHub Docs — Copilot Plans](https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot)

---

## 3. Claude (Anthropic) — Consumer & Team

### Consumer Plans

| Plan | Price | Notes |
|---|---|---|
| Free | $0/mo | Limited usage |
| Pro | $20/mo ($200/yr) | Higher limits, priority access |
| Max 5× | $100/mo | 5× Pro usage limits |
| Max 20× | $200/mo | 20× Pro usage limits |

### Team Plans

| Plan | Price | Notes |
|---|---|---|
| Team Standard | $25/seat/mo ($20 annual) | Collaboration features, admin controls |
| Team Premium | $125/seat/mo ($100 annual) | Higher limits per member |
| Enterprise | Custom | SSO, SCIM, dedicated support |

**Source:** [Claude Help — Choosing a Plan](https://support.anthropic.com/en/articles/9840818-choosing-a-claude-plan)
**Source:** [Claude Help — Team Plan](https://support.anthropic.com/en/articles/9572909-claude-team-plan)

---

## 4. ChatGPT (OpenAI) — Consumer & Business

### Consumer Plans

| Plan | Price | Notes |
|---|---|---|
| Free | $0/mo | GPT-4o mini only |
| Plus | $20/mo | GPT-4o, DALL·E, Advanced Voice |
| Pro | $200/mo | Unlimited access, o1 pro mode |

### Business Plans

| Plan | Price | Notes |
|---|---|---|
| Business (Team) | $25/user/mo ($20 annual) | Admin console, data excluded from training |
| Enterprise | Custom | SSO, unlimited usage, advanced analytics |

**Source:** [OpenAI Help — What is ChatGPT Business?](https://help.openai.com/en/articles/9186755-what-is-chatgpt-business)
**Source:** [ChatGPT Pricing](https://openai.com/chatgpt/pricing/)

---

## 5. OpenAI API

| Model | Input | Output | Notes |
|---|---|---|---|
| GPT-4o | $2.50/1M tokens | $10/1M tokens | Flagship multimodal |
| GPT-4o mini | $0.15/1M tokens | $0.60/1M tokens | Cost-optimized |
| GPT-4.5 Preview | $75/1M tokens | $150/1M tokens | Research preview |
| o1 | $15/1M tokens | $60/1M tokens | Reasoning model |
| o3-mini | $1.10/1M tokens | $4.40/1M tokens | Cost-efficient reasoning |

> For audit purposes, API costs are estimated based on user-reported monthly spend.

**Source:** [OpenAI API Pricing](https://openai.com/api/pricing/)

---

## 6. Google Gemini

### Consumer / Google One AI Plans

| Plan | Price | Notes |
|---|---|---|
| Free | $0/mo | Limited Gemini access |
| Gemini Pro (Google One AI Premium) | $19.99/mo | 2TB storage, Gemini Advanced |
| Gemini Ultra | $249.99/mo | 30TB storage, highest model tier |

### Workspace / Business

| Plan | Price | Notes |
|---|---|---|
| Google Workspace AI Add-on | $24/user/mo | Gemini for Workspace apps |
| Enterprise | Custom | Full suite with compliance controls |

**Source:** [Google One AI Premium](https://one.google.com/about/plans)
**Source:** [Google Workspace Gemini](https://workspace.google.com/solutions/ai/)

---

## 7. Windsurf / v0 (Placeholder)

| Plan | Price | Notes |
|---|---|---|
| Free | $0/mo | Limited completions |
| Pro | $15/mo | Extended usage |
| Team | $25/user/mo | Collaboration features |

> Pricing is approximate / placeholder. Update when official pricing is confirmed.

**Source:** [codeium.com/windsurf](https://codeium.com/windsurf) (check for latest)

---

## How Pricing Data Is Used

1. **Form Defaults:** When a user selects a tool + plan, we can pre-fill the expected monthly cost.
2. **Audit Engine:** Compares reported spend against known pricing to flag overspend or underutilization.
3. **Recommendations:** Suggests downgrades/switches based on comparable plan features and pricing.

## Maintenance

- Re-verify pricing **monthly** or when a vendor announces changes.
- Update `src/lib/constants/tools.ts` pricing fields alongside this document.
- All prices are **pre-tax, USD**.

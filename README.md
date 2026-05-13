# Credex — AI Spend Audit Platform

Credex is a production-grade financial audit tool designed specifically for startups and engineering teams to identify waste in their AI subscription stack. By analyzing spend against a 7-layer deterministic engine, it surfaces redundant subscriptions, plan overages, and credit eligibility to help companies recover 20-40% of their monthly AI budget.

## 🔗 Live Demo
**[ai-spend-audit-pink.vercel.app](https://ai-spend-audit-pink.vercel.app)**

## 📸 Screenshots

### 1. Landing Page
![Home Page](/public/screenshots/home.png)
*High-fidelity landing page with glassmorphic design and clear value propositions.*

### 2. Audit Input Form
![Audit Form](/public/screenshots/audit.png)
*Dynamic multi-tool entry system with real-time plan validation and local persistence.*

### 3. Optimization Dashboard
![Results Page](/public/screenshots/result.png)
*Comprehensive savings breakdown featuring AI-narrated executive summaries and actionable recommendation cards.*

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (for database persistence)
- Hugging Face API Token (for AI summaries)

### Local Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ptmishra69/Credex_Project.git
   cd ai-spend-audit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   HUGGINGFACE_API_KEY=your_hf_token
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

### Deployment
The project is optimized for **Vercel**. Simply push your code to GitHub and connect the repository to Vercel. Ensure all environment variables are added in the Vercel dashboard.

## 🧠 Technical Decisions & Trade-offs

1. **Deterministic Logic vs. LLM Engine**: We opted for a hardcoded, rule-based audit engine (`src/lib/audit/rules.ts`) instead of relying solely on an LLM. This ensures 100% financial accuracy and predictable logic without the risk of AI "hallucinating" pricing or savings numbers.
2. **7-Layer Evaluation Architecture**: We structured the audit into 7 distinct layers (Plan Efficiency, Redundancy, API Economics, etc.). This modular approach allows for granular unit testing (15+ Vitest cases passing) and makes it trivial to add new vendor rules without touching core orchestrator logic.
3. **Tailwind v4 CSS-First Styling**: We adopted the latest Tailwind CSS v4 architecture. While this required more manual configuration for certain UI components, it provides superior performance and a modern CSS-variable-driven theme that makes the "glassmorphism" aesthetic highly performant.
4. **Supabase Persistence for Viral Loops**: Instead of keeping data in local storage, we implemented a Supabase backend. This was a critical trade-off to enable shareable "Audit IDs," allowing users to share their results with co-founders or engineering managers via unique URLs.
5. **Hugging Face vs. OpenAI**: We used the Hugging Face Inference API for the executive summary generation. This choice provides high-quality narration at zero operating cost (vs. per-token costs with OpenAI), keeping the platform's unit economics sustainable for a free tool.

## 🧪 Testing
Run the comprehensive suite of financial logic tests:
```bash
npm test
```

---
Built with ☕ and AI during the AKTU/GNIOT semester season.

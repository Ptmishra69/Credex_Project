## DAY - 1 (07-05-2026)

Hours Worked - 1.5 hours

# what did i do today

- **Scaffolded Production Folder Structure**: Reorganized routes into `src/app` and created modular directories for `lib`, `types`, and `api`.
- **Root Layout & Global Styles**: Created `layout.tsx` and a full Tailwind 4 design system in `globals.css` featuring dark mode glassmorphism and custom brand colors.
- **Supabase Integration**: Set up a singleton typed Supabase client with environment variable validation.
- **Domain Modeling**: Defined core TypeScript types (`AuditInput`, `Recommendation`, `AuditResult`) and a SQL schema for `audits` and `leads` tables.
- **Route Implementation**: 
    - Created `/audit` skeleton with a polished input form UI.
    - Created dynamic `/result/[id]` page with async params and summary cards.
    - Added `/api/health` check endpoint for monitoring.
- **Verification**: Verified project stability with `npm run build` and successful local runtime tests.

# what i learned today:

- **Singleton Pattern for Supabase**: Learned how to implement a singleton typed client that ensures a single database connection instance is reused across the app, while providing full TypeScript autocomplete for tables and columns.
- **Next.js 15/16 Essentials**: 
    - Understood the absolute necessity of `layout.tsx` for the App Router to function.
    - Learned the new async `params` pattern for dynamic routes (e.g., `await params` in `[id]/page.tsx`).
- **Tailwind 4 CSS-First Design**: Explored the shift toward configuring themes directly in `globals.css` using the `@theme` directive instead of a JS config file.
- **Production-Grade Schemas**: Learned why UUIDs and JSONB are preferred for scalable MVP databases—UUIDs for security/uniqueness and JSONB for schema flexibility during early-stage iteration.
- **Clean Architecture**: Reaffirmed the importance of modular folder structures (`lib`, `types`, `api`) to keep a codebase maintainable as it grows.

# Plan for tomorrow

## DAY 2 — Form System
**Goal**: Fully working spend audit input form.

**Tasks**:
-**Tool Selectors**: Implement a searchable dropdown for popular AI tools.
-**Dynamic Field Management**: Allow users to add/remove multiple tool entries dynamically.
-**Plan & Seat Logic**: Add dropdowns for common pricing tiers and numeric inputs for seat counts.
-**Form Validation**: Use `react-hook-form` and `zod` for robust client-side validation.
-**Persistence**: Implement `localStorage` save/restore so users don't lose progress on refresh.
-**Submission Flow**: Prepare the form for submission to the Supabase backend.

---

## DAY - 2 (07-05-2026)

Hours Worked - 3 hours

# what did i do today

### Form System (Steps 1–8)
- **Tools & Plans Constants**: Created `src/lib/constants/tools.ts` — centralized config for all supported AI tools and their plans.
- **Zod Validation Schema**: Created `src/lib/validators/audit-form.ts` — enforces min seats, positive spend, required company info, and at least one tool.
- **Reusable ToolRow Component**: Built `src/components/forms/tool-row.tsx` — modular component per tool entry using `useWatch` for reactive plan filtering.
- **AuditForm Component**: Built `src/components/forms/audit-form.tsx` — orchestrates `useFieldArray` for dynamic tool rows, section-based layout, and a polished submit flow.
- **localStorage Persistence**: Form auto-saves on every change and restores on page reload (hydration-safe).
- **Audit Page Integration**: Updated `/audit` page with hero section, decorative glows, and the live form.
- **shadcn UI Components**: Installed Button, Input, Select, Label, Card, and Form components. Manually created `form.tsx` when CLI failed.
- **Radix Dependencies**: Installed `@radix-ui/react-label`, `@radix-ui/react-select`, `@radix-ui/react-slot`.

### Pricing Data Collection (Step 1 — Inventory)
- **`PRICING_DATA.md`**: Created comprehensive pricing reference with official source URLs for all 8 supported tools.
- **Updated `tools.ts` with real pricing**: Added `priceMonthly`, `priceAnnual`, `pricingModel` (flat/per_user/usage_based), and `category` fields to every tool and plan.
- **Helper functions**: Added `getPlanPricing()` and `calculateMonthlyCost()` utilities for the audit engine.
- **Tools covered**: Cursor, GitHub Copilot, Claude (consumer + team), ChatGPT (consumer + business), Anthropic API, OpenAI API, Google Gemini, Windsurf/v0.

# what i learned today:

- **`useFieldArray`**: React Hook Form's built-in dynamic field array manager — provides stable keys, optimized re-renders, and clean `append`/`remove` methods. Much better than manually managing arrays in state.
- **Zod + RHF Type Alignment**: `z.coerce.number()` creates an `unknown` input type that conflicts with RHF's resolver generics. Solution: use strict `z.number()` and coerce manually with `valueAsNumber` in the Input `onChange`.
- **`useWatch` for Reactive Selects**: Watching a specific field in a field array (e.g., `tools.${index}.toolId`) lets child components react to changes without re-rendering the entire form.
- **Pricing Model Taxonomy**: AI tools use three distinct pricing patterns — flat (solo plans), per-user (team/business), and usage-based (APIs). This distinction is critical for accurate cost calculations.

# Plan for tomorrow

## DAY 3 — Audit Engine & Results
**Goal**: Wire form submission to an audit engine that generates savings recommendations.

**Tasks**:
- Build `src/lib/audit/engine.ts` — core calculation logic
- Save audit to Supabase on submission
- Generate result page with real data at `/result/[id]`
- Display recommendations with savings breakdown

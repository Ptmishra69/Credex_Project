import { ArrowRight, Sparkles, TrendingDown, Shield } from "lucide-react";
import Link from "next/link";

/**
 * Home page — landing page for AI Spend Audit.
 * Directs users to the /audit flow.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="mx-auto max-w-4xl px-6 py-24">
        {/* Hero */}
        <div className="text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            <Sparkles className="h-4 w-4" />
            AI-Powered Cost Optimization
          </div>
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
            Stop Overspending
            <br />
            <span className="gradient-text">on AI Tools</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Startups waste thousands on overlapping AI subscriptions. Get a
            free audit of your AI tooling spend with actionable recommendations
            to cut costs — in minutes.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500 glow-brand"
            >
              Start Free Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Value props */}
        <div className="mt-24 grid gap-6 sm:grid-cols-3">
          <ValueCard
            icon={<TrendingDown className="h-6 w-6 text-emerald-400" />}
            title="Save 20-40%"
            description="Most startups find significant savings by eliminating overlapping tools and right-sizing plans."
          />
          <ValueCard
            icon={<Sparkles className="h-6 w-6 text-indigo-400" />}
            title="AI-Powered Analysis"
            description="Our engine analyzes your stack against pricing data and usage patterns to surface hidden waste."
          />
          <ValueCard
            icon={<Shield className="h-6 w-6 text-amber-400" />}
            title="No Risk, Free Report"
            description="Enter your tools, get a detailed report. No payment required, no strings attached."
          />
        </div>
      </div>
    </main>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="glass-card p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}
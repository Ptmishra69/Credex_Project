import { ArrowLeft, TrendingDown, Lightbulb, DollarSign } from "lucide-react";
import Link from "next/link";

/**
 * /result/[id] — Audit result page.
 *
 * Displays the optimization report for a specific audit.
 * Uses Next.js 15+ async params pattern for dynamic routes.
 */
interface ResultPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Back navigation */}
        <Link
          href="/audit"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Audit
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Audit Report
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Audit ID: <code className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">{id}</code>
          </p>
        </div>

        {/* Summary cards */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            icon={<DollarSign className="h-5 w-5 text-rose-400" />}
            label="Current Monthly Spend"
            value="—"
            bgClass="bg-rose-500/10 ring-rose-500/20"
          />
          <SummaryCard
            icon={<TrendingDown className="h-5 w-5 text-emerald-400" />}
            label="Estimated Savings"
            value="—"
            bgClass="bg-emerald-500/10 ring-emerald-500/20"
          />
          <SummaryCard
            icon={<Lightbulb className="h-5 w-5 text-amber-400" />}
            label="Recommendations"
            value="—"
            bgClass="bg-amber-500/10 ring-amber-500/20"
          />
        </div>

        {/* Recommendations placeholder */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl backdrop-blur-sm">
          <h2 className="mb-1 text-xl font-semibold text-white">
            Optimization Recommendations
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Detailed recommendations will appear here once the audit is
            processed.
          </p>
          <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-700">
            <p className="text-sm text-slate-600">
              No recommendations yet — audit processing not implemented.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Sub-component (co-located because it's page-specific)
// ---------------------------------------------------------------------------

function SummaryCard({
  icon,
  label,
  value,
  bgClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgClass: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
      <div className={`mb-3 inline-flex rounded-lg p-2 ring-1 ${bgClass}`}>
        {icon}
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

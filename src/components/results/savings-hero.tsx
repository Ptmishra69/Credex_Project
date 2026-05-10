import { TrendingDown, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SavingsHeroProps {
  monthlySavings: number;
  annualSavings: number;
  currentSpend: number;
  optimizedSpend: number;
}

export function SavingsHero({
  monthlySavings,
  annualSavings,
  currentSpend,
  optimizedSpend,
}: SavingsHeroProps) {
  const isHighlyOptimized = monthlySavings < 50;
  const isHighSavings = monthlySavings > 500;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-8 md:p-12">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            {isHighlyOptimized ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Stack Highly Optimized
              </>
            ) : (
              <>
                <TrendingDown className="h-3.5 w-3.5" />
                Optimization Opportunity Identified
              </>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {isHighlyOptimized ? (
              "Your AI stack is lean."
            ) : (
              <>
                You could save{" "}
                <span className="text-emerald-400">
                  ${annualSavings.toLocaleString()}
                </span>
                /year.
              </>
            )}
          </h1>

          <p className="max-w-xl text-lg text-slate-400">
            {isHighlyOptimized
              ? "We analyzed your subscriptions and found no major overlaps or inefficiencies. Great job maintaining a focused AI budget."
              : `Our audit identified ${isHighSavings ? 'significant' : 'moderate'} savings by consolidating redundant tools and right-sizing team plans.`}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:w-auto lg:grid-cols-2">
          <StatCard
            label="Monthly Savings"
            value={`$${monthlySavings.toLocaleString()}`}
            isPositive={!isHighlyOptimized}
          />
          <StatCard
            label="Current Spend"
            value={`$${currentSpend.toLocaleString()}`}
            subValue="Monthly total"
          />
          <StatCard
            label="Optimized Spend"
            value={`$${optimizedSpend.toLocaleString()}`}
            subValue="Target state"
            highlight
          />
          <StatCard
            label="Annual Potential"
            value={`$${annualSavings.toLocaleString()}`}
            isPositive={!isHighlyOptimized}
            highlight
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  subValue,
  isPositive,
  highlight,
}: {
  label: string;
  value: string;
  subValue?: string;
  isPositive?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border p-5 transition-all",
        highlight
          ? "border-emerald-500/30 bg-emerald-500/5 ring-1 ring-emerald-500/20"
          : "border-slate-800 bg-slate-900/60"
      )}
    >
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-2xl font-bold tracking-tight",
          isPositive ? "text-emerald-400" : "text-white"
        )}
      >
        {value}
      </p>
      {subValue && <p className="mt-1 text-[10px] text-slate-600">{subValue}</p>}
    </div>
  );
}

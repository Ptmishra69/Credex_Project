import { ArrowRight, Tag, Users, Zap, Info } from "lucide-react";
import { Recommendation } from "@/lib/audit/types";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const {
    toolName,
    currentPlanId,
    recommendedPlanId,
    currentMonthlyCost,
    optimizedMonthlyCost,
    monthlySavings,
    reason,
    action,
    priority,
  } = recommendation;

  const actionStyles = {
    downgrade: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    consolidate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    switch: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    optimize: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const actionIcons = {
    downgrade: <Tag className="h-3.5 w-3.5" />,
    consolidate: <Users className="h-3.5 w-3.5" />,
    switch: <ArrowRight className="h-3.5 w-3.5" />,
    optimize: <Zap className="h-3.5 w-3.5" />,
  };

  return (
    <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-slate-700 hover:bg-slate-900/80">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Tool Branding & Action */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">{toolName}</h3>
            <div
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                actionStyles[action]
              )}
            >
              {actionIcons[action]}
              {action}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-400">
              {currentPlanId}
            </span>
            <ArrowRight className="h-3 w-3 text-slate-600" />
            <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-400">
              {recommendedPlanId === "none" ? "Remove Subscription" : recommendedPlanId}
            </span>
          </div>

          <div className="relative rounded-xl border border-slate-800 bg-slate-950/40 p-4">
            <div className="absolute top-3 left-3">
              <Info className="h-3.5 w-3.5 text-slate-600" />
            </div>
            <p className="pl-6 text-sm leading-relaxed text-slate-400">
              {reason}
            </p>
          </div>
        </div>

        {/* Savings Breakdown */}
        <div className="flex flex-col justify-between border-t border-slate-800 pt-6 sm:w-48 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                Monthly Savings
              </p>
              <p className="text-2xl font-bold text-emerald-400">
                ${monthlySavings.toLocaleString()}
              </p>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Current</span>
                <span className="font-mono text-slate-300">${currentMonthlyCost}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Target</span>
                <span className="font-mono text-emerald-400">${optimizedMonthlyCost}</span>
              </div>
            </div>
          </div>

          <div className={cn(
            "mt-4 rounded-lg px-2 py-1 text-center text-[10px] font-bold uppercase tracking-widest",
            priority === "high" ? "bg-rose-500/10 text-rose-400" : "bg-slate-800 text-slate-400"
          )}>
            {priority} priority
          </div>
        </div>
      </div>
    </div>
  );
}

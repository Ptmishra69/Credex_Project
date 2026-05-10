import { Recommendation } from "@/lib/audit/types";
import { RecommendationCard } from "./recommendation-card";

interface AuditBreakdownProps {
  recommendations: Recommendation[];
}

export function AuditBreakdown({ recommendations }: AuditBreakdownProps) {
  if (recommendations.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Recommendations</h2>
          <p className="text-sm text-slate-500">
            Actionable steps to optimize your AI tooling budget.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">
            Total Items
          </p>
          <p className="text-lg font-bold text-white">{recommendations.length}</p>
        </div>
      </div>

      <div className="grid gap-6">
        {recommendations.map((rec, idx) => (
          <RecommendationCard key={`${rec.toolId}-${idx}`} recommendation={rec} />
        ))}
      </div>
    </section>
  );
}

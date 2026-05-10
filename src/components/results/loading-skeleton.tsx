import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      {/* Hero Skeleton */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          <div className="flex-1 space-y-4">
            <div className="h-6 w-32 rounded-full bg-slate-800" />
            <div className="h-16 w-3/4 rounded-xl bg-slate-800" />
            <div className="h-4 w-1/2 rounded-lg bg-slate-800" />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 w-40 rounded-2xl bg-slate-800" />
            ))}
          </div>
        </div>
      </div>

      {/* Summary Skeleton */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
        <div className="h-6 w-48 mb-4 rounded bg-slate-800" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-slate-800" />
          <div className="h-4 w-full rounded bg-slate-800" />
          <div className="h-4 w-2/3 rounded bg-slate-800" />
        </div>
      </div>

      {/* Charts Skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-[300px] rounded-2xl border border-slate-800 bg-slate-900/40" />
        <div className="h-[300px] rounded-2xl border border-slate-800 bg-slate-900/40" />
      </div>

      {/* Recommendations Skeleton */}
      <div className="space-y-6">
        <div className="h-8 w-64 rounded bg-slate-800" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 rounded-2xl border border-slate-800 bg-slate-900/60" />
        ))}
      </div>
    </div>
  );
}

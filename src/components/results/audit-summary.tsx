import { Sparkles } from "lucide-react";

interface AuditSummaryProps {
  summary: string;
}

export function AuditSummary({ summary }: AuditSummaryProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4 text-indigo-400 font-semibold text-sm uppercase tracking-widest">
        <Sparkles className="h-4 w-4" />
        AI Executive Summary
      </div>
      
      <div className="relative z-10">
        <p className="text-lg leading-relaxed text-slate-300 italic">
          "{summary}"
        </p>
      </div>
      
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-16 -mt-16" />
    </section>
  );
}

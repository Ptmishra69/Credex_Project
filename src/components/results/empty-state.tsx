import { CheckCircle2, Sparkles, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/40 p-12 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
        <CheckCircle2 className="h-8 w-8 text-emerald-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-white">Your Stack is Optimized</h2>
      <p className="mt-2 max-w-md text-slate-400">
        We analyzed your AI tooling spend and found your subscriptions are perfectly aligned with your usage. No overlaps or inefficiencies were detected.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button variant="outline" className="gap-2 border-slate-700 bg-slate-800/50 text-white hover:bg-slate-800">
          <Share2 className="h-4 w-4" />
          Share Results
        </Button>
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-500">
          <Sparkles className="h-4 w-4" />
          Keep Monitoring
        </Button>
      </div>

      <div className="mt-12 border-t border-slate-800 pt-8">
        <p className="text-xs font-medium text-slate-600 uppercase tracking-widest">
          Audit Verified by Credex Engine
        </p>
      </div>
    </div>
  );
}

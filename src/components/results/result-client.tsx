"use client";

import { useEffect, useState } from "react";
import { runAudit } from "@/lib/audit/engine";
import { AuditResult } from "@/lib/audit/types";
import { generateExecutiveSummary } from "@/lib/ai/generate-summary";
import { calculateBenchmarks, BenchmarkResult } from "@/lib/benchmark";
import { SavingsHero } from "./savings-hero";
import { BenchmarkCard } from "./benchmark-card";
import { AuditSummary } from "./audit-summary";
import { SpendChart } from "./spend-chart";
import { AuditBreakdown } from "./audit-breakdown";
import { LoadingSkeleton } from "./loading-skeleton";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, ArrowRight, FileText, Mail, PhoneCall, Share2 } from "lucide-react";
import Link from "next/link";
import { EmailReportModal } from "@/components/modals/email-report-modal";
import { CopyLinkButton } from "@/components/share/copy-link-button";

export function ResultClient({ 
  auditId, 
  initialData, 
  teamSize = 1 
}: { 
  auditId: string; 
  initialData?: AuditResult;
  teamSize?: number;
}) {
  const [result, setResult] = useState<AuditResult | null>(initialData || null);
  const [summary, setSummary] = useState<string>("");
  const [benchmark, setBenchmark] = useState<BenchmarkResult | null>(null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function prepareResult() {
      try {
        setLoading(true);
        
        let auditResult = initialData;

        // If no server data, try to fallback to local (for old links or dev)
        if (!auditResult) {
          const savedData = localStorage.getItem("ai-spend-audit-form");
          if (!savedData) {
            setError("No audit data found. Please complete the form first.");
            setLoading(false);
            return;
          }
          const input = JSON.parse(savedData);
          auditResult = await runAudit(input);
          setResult(auditResult);
        }

        // 3. Generate Benchmarks
        const benchmarkData = calculateBenchmarks(auditResult, teamSize);
        setBenchmark(benchmarkData);

        // 4. Generate AI summary
        const aiSummary = await generateExecutiveSummary(auditResult);
        setSummary(aiSummary);
        
        setLoading(false);
      } catch (err) {
        console.error("Audit performance failed:", err);
        setError("An unexpected error occurred during analysis.");
        setLoading(false);
      }
    }

    prepareResult();
  }, [auditId, initialData, teamSize]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;
  if (!result) return <EmptyState />;

  const hasSavings = result.monthlySavings > 0;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* 1. Dashboard Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SavingsHero
            monthlySavings={result.monthlySavings}
            annualSavings={result.annualSavings}
            currentSpend={result.currentMonthlySpend}
            optimizedSpend={result.optimizedMonthlySpend}
          />
        </div>
        <div className="lg:col-span-1">
          {benchmark && <BenchmarkCard benchmark={benchmark} />}
        </div>
      </div>

      {/* 2. AI Summary */}
      <AuditSummary summary={summary} />

      {/* 3. Data Visualizations */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SpendChart
          currentSpend={result.currentMonthlySpend}
          optimizedSpend={result.optimizedMonthlySpend}
        />
        
        {/* Insight Panel (Placeholder for Step 1 above) */}
        <div className="flex flex-col justify-center rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Key Insights
          </h3>
          <ul className="space-y-4">
            <InsightItem 
              icon={<Sparkles className="h-4 w-4 text-indigo-400" />}
              text={result.verdict}
            />
            <InsightItem 
              icon={<ArrowRight className="h-4 w-4 text-emerald-400" />}
              text={`You can reduce your monthly spend by ${Math.round(result.summaryMetadata.potentialSavingsPercentage)}% with these optimizations.`}
            />
            <InsightItem 
              icon={<Calendar className="h-4 w-4 text-amber-400" />}
              text={`Capturing these savings results in $${result.annualSavings.toLocaleString()} recovered annually.`}
            />
            {result.summaryMetadata.topSavingOpportunity && (
              <InsightItem 
                icon={<ArrowRight className="h-4 w-4 text-cyan-400" />}
                text={`Top opportunity: ${result.summaryMetadata.topSavingOpportunity}.`}
              />
            )}
          </ul>
        </div>
      </div>

      {/* 4. Recommendations List */}
      <AuditBreakdown recommendations={result.recommendations} />

      {/* 5. CTA Section */}
      <section className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-12 text-center shadow-2xl shadow-indigo-500/10">
        <h2 className="text-3xl font-bold text-white">
          {hasSavings 
            ? "Maximize Your Savings Potential" 
            : "Keep Your Stack Optimized"}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
          {hasSavings 
            ? "Our engine identified significant overspend. Book a free consultation with a Credex expert to implement these savings across your entire organization." 
            : "You've done a great job keeping your AI stack lean. Subscribe to our monthly audit report to stay ahead of new pricing changes and overlaps."}
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <EmailReportModal 
            auditId={auditId} 
            trigger={
              hasSavings ? (
                <Button size="lg" className="h-14 px-10 text-base font-bold bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-500/20 transition-all hover:scale-105 gap-2">
                  <PhoneCall className="h-5 w-5" />
                  Book Savings Consultation
                </Button>
              ) : (
                <Button size="lg" className="h-14 px-10 text-base font-bold bg-indigo-600 hover:bg-indigo-500 gap-2">
                  <Mail className="h-5 w-5" />
                  Email Full Report
                </Button>
              )
            }
          />
          <CopyLinkButton />
        </div>
      </section>

      {/* 6. Footer Metadata */}
      <div className="text-center text-[10px] font-medium text-slate-600 uppercase tracking-widest pb-12">
        Audit ID: {auditId} • Analyzed on {new Date().toLocaleDateString()} • Powered by Credex Engine v1.0
      </div>
    </div>
  );
}

function InsightItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-1 rounded-lg bg-slate-800 p-1.5">{icon}</div>
      <p className="text-sm leading-relaxed text-slate-300">{text}</p>
    </li>
  );
}

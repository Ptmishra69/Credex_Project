"use client";

import { BenchmarkResult } from "@/lib/benchmark";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingDown, TrendingUp, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function BenchmarkCard({ benchmark }: { benchmark: BenchmarkResult }) {
  const { isAboveAverage, percentile, percentageDiff, insight, category } = benchmark;

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-slate-400">
          Industry Benchmark
        </CardTitle>
        <BarChart3 className="h-4 w-4 text-indigo-400" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-baseline justify-between">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-white">
              {percentile}
              <span className="text-sm font-normal text-slate-500 ml-1">th Percentile</span>
            </p>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Category: {category}
            </p>
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
            isAboveAverage 
              ? "bg-rose-500/10 text-rose-500" 
              : "bg-emerald-500/10 text-emerald-500"
          }`}>
            {isAboveAverage ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {isAboveAverage ? "Above Avg" : "Optimized"}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Efficient</span>
            <span>Overspending</span>
          </div>
          <Progress value={percentile} className="h-2 bg-slate-800" />
        </div>

        <div className="flex gap-3 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
          <Info className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-300 leading-relaxed italic">
            "{insight}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

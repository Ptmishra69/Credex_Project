import { Metadata } from "next";
import { ResultClient } from "@/components/results/result-client";
import { getSupabaseClient } from "@/lib/db/supabase";
import { notFound } from "next/navigation";
import { AuditResult } from "@/lib/audit/types";

/**
 * /result/[id] — Audit result page.
 * Fetches the high-fidelity optimization report from Supabase.
 */
interface ResultPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ResultPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = getSupabaseClient();
  
  const { data } = (await supabase
    .from("audits")
    .select("result_data")
    .eq("id", id)
    .single()) as any;

  if (!data || !data.result_data) {
    return {
      title: "Audit Result | AI Spend Audit",
    };
  }

  const result = data.result_data as any;
  const savings = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(result.annualSavings);

  return {
    title: `Saved ${savings}/year on AI Spend | Audit Report`,
    description: `We analyzed ${result.summaryMetadata.totalToolsAnalyzed} AI tools and found ${savings} in annual savings. View the full optimization roadmap.`,
    openGraph: {
      title: `Saved ${savings}/year on AI Spend`,
      description: `Actionable AI optimization roadmap for ${result.companyName}.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Saved ${savings}/year on AI Spend`,
      description: `View the full AI spend audit for ${result.companyName}.`,
    },
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params;
  const supabase = getSupabaseClient();

  // Fetch the audit from Supabase
  const { data, error } = (await supabase
    .from("audits")
    .select("result_data, company_name, team_size")
    .eq("id", id)
    .single()) as any;

  if (error || !data) {
    console.error("[ResultPage] Fetch error:", error);
    return notFound();
  }

  // Cast the JSONB data to our AuditResult type
  const auditResult = data.result_data as AuditResult;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <ResultClient 
          auditId={id} 
          initialData={auditResult} 
          teamSize={data.team_size || 1}
        />
      </div>
    </main>
  );
}

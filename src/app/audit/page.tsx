import { ClipboardList } from "lucide-react";
import { AuditForm } from "@/components/forms/audit-form";

/**
 * /audit — Main audit input page.
 *
 * This page hosts the dynamic spend audit form.
 */
export default function AuditPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 ring-1 ring-indigo-500/20">
            <ClipboardList className="h-8 w-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Analyze Your AI Stack
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Enter your team&apos;s tooling and spend. We&apos;ll identify overlaps,
            under-utilized seats, and potential savings.
          </p>
        </div>

        {/* The Main Form */}
        <div className="relative">
          {/* Decorative background glow */}
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl" />

          <AuditForm />
        </div>

        {/* Footer Info */}
        <div className="mt-16 border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-500">
            Typical startups save <span className="text-emerald-400 font-semibold">22-35%</span> on annual AI spend after their first audit.
          </p>
        </div>
      </div>
    </main>
  );
}

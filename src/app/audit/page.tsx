import { ClipboardList } from "lucide-react";

/**
 * /audit — Main audit input page.
 *
 * This is where startups enter their AI tooling spend.
 * Currently a clean skeleton; the actual form component
 * will be added in a future step.
 */
export default function AuditPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 ring-1 ring-indigo-500/20">
            <ClipboardList className="h-8 w-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            AI Spend Audit
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Enter your team&apos;s AI tooling details below. We&apos;ll analyze your
            spend and surface actionable savings.
          </p>
        </div>

        {/* Form placeholder card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl backdrop-blur-sm">
          <h2 className="mb-1 text-xl font-semibold text-white">
            Company Details
          </h2>
          <p className="mb-8 text-sm text-slate-500">
            Tell us about your team and the AI tools you use.
          </p>

          {/* Placeholder fields — will be replaced by a form component */}
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Company Name
              </label>
              <div className="h-11 rounded-lg border border-slate-700 bg-slate-800/50" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Team Size
              </label>
              <div className="h-11 rounded-lg border border-slate-700 bg-slate-800/50" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                AI Tools
              </label>
              <div className="h-32 rounded-lg border border-dashed border-slate-700 bg-slate-800/30" />
              <p className="mt-2 text-xs text-slate-600">
                Tool input form coming soon — you&apos;ll add each tool with cost,
                seats, and usage frequency.
              </p>
            </div>
          </div>

          {/* Submit placeholder */}
          <div className="mt-10">
            <button
              disabled
              className="w-full cursor-not-allowed rounded-xl bg-indigo-600/50 px-6 py-3 text-sm font-semibold text-white/60 transition"
            >
              Generate Audit Report →
            </button>
            <p className="mt-2 text-center text-xs text-slate-600">
              Form functionality will be wired in the next development phase.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

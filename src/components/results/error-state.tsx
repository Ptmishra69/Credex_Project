import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "Something went wrong while analyzing your audit.", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/40 p-12 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 ring-1 ring-rose-500/20">
        <AlertCircle className="h-8 w-8 text-rose-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-white">Analysis Failed</h2>
      <p className="mt-2 max-w-md text-slate-400">
        {message}
      </p>

      <div className="mt-8 flex items-center gap-4">
        <Link href="/audit">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Audit
          </Button>
        </Link>
        {onRetry && (
          <Button onClick={onRetry} className="gap-2 bg-indigo-600 hover:bg-indigo-500">
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}

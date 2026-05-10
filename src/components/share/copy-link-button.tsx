"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      
      toast.success("Link Copied!", {
        description: "You can now share this audit with your team.",
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="h-14 px-10 text-base font-bold border-slate-700 bg-transparent text-white hover:bg-slate-800 gap-2 transition-all active:scale-95"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="h-5 w-5 text-emerald-500" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="h-5 w-5 text-indigo-400" />
          Share Audit Link
        </>
      )}
    </Button>
  );
}

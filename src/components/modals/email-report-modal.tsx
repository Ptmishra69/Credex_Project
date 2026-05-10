"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, CheckCircle2, Loader2, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const leadSchema = z.object({
  email: z.string().email("Please enter a valid business email"),
  name: z.string().min(2, "Name is too short").optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface EmailReportModalProps {
  auditId: string;
  trigger?: React.ReactElement;
}

export function EmailReportModal({ auditId, trigger }: EmailReportModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      email: "",
      name: "",
      company: "",
    },
  });

  async function onSubmit(data: LeadFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, auditId }),
      });

      if (!response.ok) throw new Error("Failed to save lead");

      setIsSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        // Reset after modal closes
        setTimeout(() => setIsSuccess(false), 500);
      }, 2500);
    } catch (error) {
      console.error("[EmailReportModal] Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={trigger || (
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 gap-2">
            <Mail className="h-4 w-4" />
            Email My Full Report
          </Button>
        )}
      />
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-white">
        {isSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-16 w-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold">Report Sent!</DialogTitle>
              <DialogDescription className="text-slate-400">
                Check your inbox. Your custom AI Spend Optimization roadmap is on its way.
              </DialogDescription>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="h-12 w-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-indigo-400" />
              </div>
              <DialogTitle className="text-2xl font-bold">Get the Full Report</DialogTitle>
              <DialogDescription className="text-slate-400">
                We'll email you a PDF breakdown of these savings, plus our 12-month AI roadmap for your team.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Work Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="alex@company.com" 
                          {...field} 
                          className="bg-slate-950 border-slate-700 focus:ring-indigo-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Name (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Alex" {...field} className="bg-slate-950 border-slate-700" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Inc" {...field} className="bg-slate-950 border-slate-700" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-12 text-base font-bold bg-indigo-600 hover:bg-indigo-500 transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    "Send My Report"
                  )}
                </Button>
                <p className="text-[10px] text-center text-slate-500">
                  By requesting the report, you agree to our terms and to receive AI optimization insights.
                </p>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

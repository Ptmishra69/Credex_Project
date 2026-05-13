"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Calculator, Info } from "lucide-react";
import { auditFormSchema, type AuditFormValues } from "@/lib/validators/audit-form";
import { submitAudit } from "@/lib/actions/audit";
import { AuditInput, ToolId } from "@/lib/audit/types";
import { ToolRow } from "./tool-row";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STORAGE_KEY = "ai-spend-audit-form";

export function AuditForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      companyName: "",
      teamSize: 1,
      useCase: "mixed",
      tools: [{ toolId: "", planId: "", monthlySpend: 0, seats: 1 }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tools",
  });


  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);

        setTimeout(() => {
          form.reset(parsed);
        }, 0);
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, [form]);


  const formValues = form.watch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
    }
  }, [formValues]);

  async function onSubmit(data: AuditFormValues) {
    setIsSubmitting(true);

    try {

      const auditInput: AuditInput = {
        companyName: data.companyName,
        teamSize: data.teamSize,
        primaryUseCase: data.useCase,
        tools: data.tools.map(t => ({
          toolId: t.toolId as ToolId,
          toolName: t.toolId,
          planId: t.planId,
          monthlySpend: t.monthlySpend,
          seats: t.seats,
        })),
      };

      const result = await submitAudit(auditInput);

      if (result.success && result.id) {

        localStorage.removeItem(STORAGE_KEY);
        router.push(`/result/${result.id}`);
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (err) {
      console.error("[AuditForm] Submission error:", err);

      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

        <section className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/20">
              <Info className="h-4 w-4 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">General Information</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Company Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Acme Corp"
                      className="bg-slate-800/50 border-slate-700 text-white h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teamSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Total Team Size</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="bg-slate-800/50 border-slate-700 text-white h-11"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                    />
                  </FormControl>
                  <FormDescription className="text-slate-500">
                    Total employees in your company/department.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="useCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Primary AI Use Case</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white h-11">
                        <SelectValue placeholder="Select usage focus" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                      <SelectItem value="coding">Software Development</SelectItem>
                      <SelectItem value="writing">Writing & Content</SelectItem>
                      <SelectItem value="research">Research & Analysis</SelectItem>
                      <SelectItem value="data_analysis">Data Analysis</SelectItem>
                      <SelectItem value="mixed">Mixed / General</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>


        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20">
                <Calculator className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">AI Tools & Spend</h3>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ toolId: "", planId: "", monthlySpend: 0, seats: 1 })}
              className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Tool
            </Button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <ToolRow key={field.id} index={index} onRemove={remove} />
            ))}

            {fields.length === 0 && (
              <div className="flex h-32 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 text-slate-500">
                <p className="mb-2">No AI tools added yet.</p>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => append({ toolId: "", planId: "", monthlySpend: 0, seats: 1 })}
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Add your first tool
                </Button>
              </div>
            )}
          </div>
          {form.formState.errors.tools?.root && (
            <p className="text-sm font-medium text-destructive">{form.formState.errors.tools.root.message}</p>
          )}
        </section>


        <div className="pt-6">
          <Button
            type="submit"
            className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] glow-brand"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Analyzing Spend Pattern..." : "Generate Optimization Audit →"}
          </Button>
          <p className="mt-4 text-center text-xs text-slate-500">
            Securely analyzed. No data shared without your consent.
          </p>
        </div>
      </form>
    </Form>
  );
}

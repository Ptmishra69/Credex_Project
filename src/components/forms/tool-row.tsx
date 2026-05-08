"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { SUPPORTED_TOOLS, getPlansForTool } from "@/lib/constants/tools";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AuditFormValues } from "@/lib/validators/audit-form";

interface ToolRowProps {
  index: number;
  onRemove: (index: number) => void;
}

/** Single AI tool entry with tool/plan selects, spend, and seat inputs. */
export function ToolRow({ index, onRemove }: ToolRowProps) {
  const { control } = useFormContext<AuditFormValues>();

  const selectedToolId = useWatch({
    control,
    name: `tools.${index}.toolId`,
  });

  const availablePlans = getPlansForTool(selectedToolId);

  return (
    <div className="grid gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4 shadow-sm transition-all hover:bg-slate-900/60 md:grid-cols-12 md:items-start">
      {/* Tool Selection */}
      <div className="md:col-span-3">
        <FormField
          control={control}
          name={`tools.${index}.toolId`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                AI Tool
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Select tool" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                  {SUPPORTED_TOOLS.map((tool) => (
                    <SelectItem key={tool.id} value={tool.id}>
                      {tool.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Plan Selection */}
      <div className="md:col-span-3">
        <FormField
          control={control}
          name={`tools.${index}.planId`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Plan
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!selectedToolId}
              >
                <FormControl>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder={selectedToolId ? "Select plan" : "Select tool first"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                  {availablePlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Monthly Spend */}
      <div className="md:col-span-3">
        <FormField
          control={control}
          name={`tools.${index}.monthlySpend`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Monthly Spend ($)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="bg-slate-800/50 border-slate-700 text-white"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Seats */}
      <div className="md:col-span-2">
        <FormField
          control={control}
          name={`tools.${index}.seats`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Seats
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  className="bg-slate-800/50 border-slate-700 text-white"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Remove Button */}
      <div className="flex justify-end pt-6 md:col-span-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onRemove(index)}
          className="text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

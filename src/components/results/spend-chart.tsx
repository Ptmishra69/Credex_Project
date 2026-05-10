"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface SpendChartProps {
  currentSpend: number;
  optimizedSpend: number;
}

export function SpendChart({ currentSpend, optimizedSpend }: SpendChartProps) {
  const data = [
    { name: "Current Spend", value: currentSpend, color: "#6366f1" }, // indigo-500
    { name: "Optimized Spend", value: optimizedSpend, color: "#10b981" }, // emerald-500
  ];

  return (
    <div className="h-[300px] w-full rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
      <h3 className="mb-6 text-sm font-semibold text-slate-400 uppercase tracking-widest">
        Monthly Spend Comparison
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          barSize={60}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 shadow-xl">
                    <p className="text-xs font-medium text-slate-400">
                      {payload[0].payload.name}
                    </p>
                    <p className="text-lg font-bold text-white">
                      ${payload[0].value?.toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

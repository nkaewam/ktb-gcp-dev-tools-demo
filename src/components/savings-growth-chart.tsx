"use client";

import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  savings: {
    label: "Cumulative Savings",
    color: "var(--primary)", // Resolves to KTB Brand Color
  },
} satisfies ChartConfig;

const data = [
  { month: "Jan", savings: 245000 },
  { month: "Feb", savings: 310000 },
  { month: "Mar", savings: 430000 },
  { month: "Apr", savings: 510000 },
  { month: "May", savings: 680000 },
  { month: "Jun", savings: 750000 },
  { month: "Jul", savings: 890000 },
  { month: "Aug", savings: 940000 },
  { month: "Sep", savings: 1050000 },
  { month: "Oct", savings: 1100000 },
  { month: "Nov", savings: 1180000 },
  { month: "Dec", savings: 1245600 },
];

export function SavingsGrowthChart() {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 40,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="fillSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.2)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tickFormatter={(value) => value}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              width={50}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="dot"
                  className="bg-background/90 backdrop-blur-md border-slate-200/50 shadow-xl rounded-xl"
                  formatter={(value, name, item, index) => {
                     return (
                        <div className="flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                           <span className="font-medium">฿{Number(value).toLocaleString()}</span>
                        </div>
                     )
                  }}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="savings"
              stroke="var(--color-savings)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#fillSavings)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

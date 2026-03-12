"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Coins } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  projected: {
    label: "Projected Value (THB)",
    color: "hsl(var(--primary))",
  },
  principal: {
    label: "Principal Injected (THB)",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig;

export function DCACalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const years = 5;
  const annualReturnRate = 0.05; // 5% expected growth annually for illustration

  const projectionData = useMemo(() => {
    const data = [];
    let principal = 0;
    let balance = 0;
    const monthlyRate = annualReturnRate / 12;

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        principal += monthlyContribution;
        balance = (balance + monthlyContribution) * (1 + monthlyRate);
      }
      data.push({
        year: `Year ${year}`,
        principal: principal,
        projected: Math.round(balance),
      });
    }
    return data;
  }, [monthlyContribution]);

  const handleIncrement = () =>
    setMonthlyContribution((prev) => Math.min(prev + 1000, 100000));
  const handleDecrement = () =>
    setMonthlyContribution((prev) => Math.max(prev - 1000, 1000));

  const totalProjected = projectionData[projectionData.length - 1]?.projected || 0;

  return (
    <div className="flex flex-col gap-8 w-full h-full">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl border border-slate-200/50 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <div className="flex gap-4 items-center">
          <div className="flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary">
            <Coins size={24} weight="duotone" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Monthly DCA Target
            </h3>
            <div className="flex items-baseline gap-1 overflow-hidden">
              <span className="text-2xl font-bold tracking-tight">฿</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={monthlyContribution}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="text-3xl font-bold tracking-tight tabular-nums"
                >
                  {monthlyContribution.toLocaleString("th-TH")}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full size-10 border-slate-200 text-slate-600 hover:text-primary hover:border-primary/50 transition-colors"
            onClick={handleDecrement}
            disabled={monthlyContribution <= 1000}
          >
            <Minus size={18} weight="bold" />
          </Button>
          <div className="w-16 text-center font-medium tabular-nums shadow-inner py-2 px-3 rounded-full bg-slate-50 border border-slate-100/50 text-sm">
            ± 1k
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full size-10 border-slate-200 text-slate-600 hover:text-primary hover:border-primary/50 transition-colors"
            onClick={handleIncrement}
            disabled={monthlyContribution >= 100000}
          >
            <Plus size={18} weight="bold" />
          </Button>
        </div>
      </div>

      {/* Hero Number */}
      <div className="flex flex-col items-center justify-center text-center gap-2">
        <p className="text-sm font-medium text-slate-500">
          Potential balance in 5 Years (5% p.a.)
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-900 overflow-hidden flex items-baseline justify-center">
          <span className="text-2xl md:text-3xl text-slate-400 mr-1 inline-block">฿</span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={totalProjected}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="tabular-nums bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary/70"
            >
              {totalProjected.toLocaleString("th-TH")}
            </motion.span>
          </AnimatePresence>
        </h2>
      </div>

      {/* Chart */}
      <div className="w-full flex-grow min-h-[250px] md:min-h-[300px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={projectionData}
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
              barGap={0}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                className="text-xs text-muted-foreground font-medium"
              />
              <YAxis 
                 tickLine={false}
                 axisLine={false}
                 width={50}
                 tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                 className="text-xs text-muted-foreground font-medium"
              />
              <ChartTooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }}
                content={
                  <ChartTooltipContent
                    className="w-[200px]"
                    indicator="dot"
                    formatter={(value: any, name: any) => (
                      <div className="flex items-center gap-2 w-full justify-between">
                        <span className="text-muted-foreground capitalize text-xs">
                          {name}
                        </span>
                        <span className="font-semibold text-foreground text-sm tabular-nums">
                          ฿{Number(value).toLocaleString("th-TH")}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <Bar
                dataKey="principal"
                fill="hsl(var(--muted))"
                radius={[4, 4, 0, 0]}
                stackId="a"
              />
              <Bar
                dataKey="projected"
                fill="var(--color-projected)"
                radius={[4, 4, 0, 0]}
                stackId="b"
              >
                {projectionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(var(--primary) / ${0.5 + (index + 1) * 0.1})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}

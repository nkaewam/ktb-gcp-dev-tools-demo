"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, YAxis, XAxis, CartesianGrid } from "recharts";
import { ArrowUpRight, Sparkle, TrendUp, ClockCounterClockwise, PiggyBank } from "@phosphor-icons/react";

// Theming & Animation Constants
const SPRING_TRANSITION = { type: "spring", stiffness: 100, damping: 20 };
const STAGGER_CHILDREN: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
const FADE_IN_UP: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: SPRING_TRANSITION as any },
};

// Mock historical savings growth over the past 3 years (based on cumulative spendings turning into savings)
const historicalSavingsData = [
  { date: "2023 Q1", balance: 125000 },
  { date: "2023 Q2", balance: 142000 },
  { date: "2023 Q3", balance: 158000 },
  { date: "2023 Q4", balance: 180000 },
  { date: "2024 Q1", balance: 210000 },
  { date: "2024 Q2", balance: 245000 },
  { date: "2024 Q3", balance: 280000 },
  { date: "2024 Q4", balance: 315000 },
  { date: "2025 Q1", balance: 345200 },
];

export default function SavingsDashboard() {
  // Monthly DCA amount (0 - 50,000 THB)
  const [dcaAmount, setDcaAmount] = useState<number>(5000);

  // Generate 5-year projection based on DCA amount and 1.5% APY
  const projectionData = useMemo(() => {
    const monthlyInterestRate = 0.015 / 12; // 1.5% APY
    let currentBalance = 345200; // Starting with current balance
    const data = [];

    for (let year = 1; year <= 5; year++) {
      let principalContributed = 0;
      for (let month = 1; month <= 12; month++) {
        currentBalance = (currentBalance + dcaAmount) * (1 + monthlyInterestRate);
        principalContributed += dcaAmount;
      }
      data.push({
        year: `Year ${year}`,
        balance: Math.round(currentBalance),
        // To show the breakdown in the chart if desired
        principal: Math.round(345200 + (dcaAmount * 12 * year)),
      });
    }
    return data;
  }, [dcaAmount]);

  const finalAmount = projectionData[4]?.balance || 0;
  const currentBalance = 345200;

  const formatTHB = (value: number) => {
    return new Intl.NumberFormat("th-TH").format(Math.round(value));
  };

  const formatShortTHB = (value: number) => {
    if (value >= 1000000) return `฿${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `฿${(value / 1000).toFixed(0)}k`;
    return `฿${value}`;
  };

  return (
    <div className="min-h-[100dvh] bg-[#f9fafb] dark:bg-zinc-950 selection:bg-primary/20 p-4 md:p-8 lg:p-12 font-sans text-foreground">
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] mix-blend-multiply opacity-50 dark:opacity-20 animate-pulse" />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto space-y-8"
        variants={STAGGER_CHILDREN}
        initial="hidden"
        animate="show"
      >
        {/* Header Section */}
        <motion.header variants={FADE_IN_UP} className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tighter leading-none text-foreground flex items-center gap-3">
              Wealth Overview
              <Sparkle weight="fill" className="text-primary size-8 md:size-10" />
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Track your historical growth and simulate your financial future with Krungthai NEXT.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 px-6 py-4 rounded-3xl shadow-sm">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
              <img src="https://picsum.photos/seed/savings/200/200" alt="User Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Balance</p>
              <p className="text-2xl font-mono font-bold tracking-tight text-foreground">
                ฿{formatTHB(currentBalance)}
              </p>
            </div>
          </div>
        </motion.header>

        {/* Full Width Historical Chart */}
        <motion.div variants={FADE_IN_UP} className="w-full">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-sm p-8 md:p-10 relative overflow-hidden group">
            <div className="flex flex-col md:flex-row justify-between mb-8 gap-6 relative z-10">
              <div>
                <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <ClockCounterClockwise className="text-primary size-6" /> Historical Savings Growth
                </h3>
                <p className="text-muted-foreground mt-1 max-w-2xl">
                  Your cumulative savings over the past years.
                </p>
              </div>
              <div className="text-left md:text-right bg-slate-50 dark:bg-zinc-800/50 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/5">
                <p className="text-sm text-muted-foreground">Growth Since Q1 2023</p>
                <motion.p
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl font-mono font-bold text-foreground tracking-tight"
                >
                  +฿{formatTHB(currentBalance - historicalSavingsData[0].balance)}
                </motion.p>
              </div>
            </div>

            <div className="h-[280px] w-full relative z-10">
              <ChartContainer
                config={{
                  balance: {
                    label: "Savings Balance",
                    color: "var(--primary)",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalSavingsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="histGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatShortTHB} dx={-10} />
                    <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                    <Area
                      type="linear"
                      dataKey="balance"
                      stroke="var(--primary)"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#histGradient)"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </motion.div>

        {/* Bottom Grid: DCA Controls & 5-Year Projection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Left Column: DCA Slider */}
          <motion.div variants={FADE_IN_UP} className="lg:col-span-4 flex flex-col">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-sm p-8 md:p-10 flex-grow relative overflow-hidden">
              <div className="mb-8">
                <h3 className="text-xl font-bold tracking-tight flex items-center gap-2 mb-2">
                  <PiggyBank className="text-primary size-6" /> Monthly Investment
                </h3>
                <p className="text-muted-foreground text-sm">
                  Set your monthly Dollar-Cost Averaging (DCA) amount to project your 5-year goal.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-slate-100 dark:border-white/5 mb-8 text-center">
                <p className="text-sm text-muted-foreground mb-1">DCA Amount</p>
                <p className="text-4xl font-mono font-bold tracking-tight text-primary">
                  ฿{formatTHB(dcaAmount)}
                  <span className="text-lg text-muted-foreground font-sans font-medium"> /mo</span>
                </p>
              </div>

              <div className="relative pt-4 pb-2">
                <Slider
                  value={[dcaAmount]}
                  onValueChange={(val) => setDcaAmount(val[0])}
                  min={0}
                  max={50000}
                  step={1000}
                  className="cursor-pointer w-full [&_[role=slider]]:bg-primary [&_[role=slider]]:border-4 [&_[role=slider]]:border-background [&_[role=slider]]:w-7 [&_[role=slider]]:h-7 [&_[role=slider]]:shadow-sm"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-mono mt-4 font-medium">
                  <span>฿0</span>
                  <span>฿50k</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 5-Year Projection Chart */}
          <motion.div variants={FADE_IN_UP} className="lg:col-span-8 flex flex-col h-full">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-sm p-8 md:p-10 flex-grow relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between mb-8 gap-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <TrendUp className="text-primary size-6" /> 5-Year Potential
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    Projected growth with ฿{formatTHB(dcaAmount)}/mo at 1.5% APY
                  </p>
                </div>
                <div className="text-left md:text-right bg-slate-50 dark:bg-zinc-800/50 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/5">
                  <p className="text-sm text-muted-foreground">Estimated Year 5 Balance</p>
                  <motion.p
                    key={finalAmount}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl font-mono font-bold text-foreground tracking-tight"
                  >
                    ฿{formatTHB(finalAmount)}
                  </motion.p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium font-mono mt-1 flex items-center md:justify-end gap-1">
                    <ArrowUpRight weight="bold" /> +฿{formatTHB(finalAmount - currentBalance - (dcaAmount * 60))} Interest
                  </p>
                </div>
              </div>

              {/* Bar Chart Component */}
              <div className="h-[280px] w-full relative z-10">
                <ChartContainer
                  config={{
                    balance: {
                      label: "Projected Balance",
                      color: "var(--primary)",
                    },
                  }}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                      <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatShortTHB} dx={-10} />
                      <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: 'var(--muted)', opacity: 0.2 }} />
                      <Bar
                        dataKey="balance"
                        fill="var(--primary)"
                        radius={[6, 6, 0, 0]}
                        animationDuration={1000}
                        maxBarSize={60}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

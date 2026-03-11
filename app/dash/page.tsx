"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendUp,
  Wallet,
  PiggyBank,
  Plus,
  Minus,
  Sparkle
} from "@phosphor-icons/react/dist/ssr";

const SPRING_TRANSITION = { type: "spring" as const, stiffness: 100, damping: 20 };

// Mock data
const CUMULATIVE_DATA = [
  { month: "Jan", balance: 15000 },
  { month: "Feb", balance: 28000 },
  { month: "Mar", balance: 35000 },
  { month: "Apr", balance: 52000 },
  { month: "May", balance: 68000 },
  { month: "Jun", balance: 85000 },
  { month: "Jul", balance: 102000 },
  { month: "Aug", balance: 132000 },
  { month: "Sep", balance: 165000 },
];

export default function SavingsDashboard() {
  const [dcaAmount, setDcaAmount] = useState(5000);
  
  // Calculate DCA projection (5 years, 1.5% APY rough estimate)
  const dcaProjectionData = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() + i + 1;
    // rough approximation for smooth curve
    const months = (i + 1) * 12;
    const totalPrincipal = dcaAmount * months;
    const estimatedInterest = totalPrincipal * 0.015 * (i + 1); 
    return {
      year: year.toString(),
      total: totalPrincipal + estimatedInterest,
    };
  });

  const handleIncrement = () => setDcaAmount((prev) => prev + 1000);
  const handleDecrement = () => setDcaAmount((prev) => Math.max(1000, prev - 1000));

  return (
    <div className="min-h-[100dvh] bg-[#f9fafb] text-zinc-900 p-4 md:p-8 font-sans overflow-x-hidden selection:bg-[#00A1E0]/20 selection:text-[#00A1E0]">
      {/* Container */}
      <div className="max-w-7xl mx-auto space-y-16 py-8">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING_TRANSITION}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#00A1E0]/10 rounded-2xl">
              <Sparkle weight="duotone" className="w-8 h-8 text-[#00A1E0]" />
            </div>
            <h1 className="text-4xl md:text-6xl tracking-tighter leading-none font-medium">
              Savings Sprint.
            </h1>
          </div>
          <p className="text-base text-zinc-500 leading-relaxed max-w-[65ch] mt-4">
            Track your cumulative growth over time and project your future wealth with Dollar-Cost Averaging. Consistency is key to unlocking financial freedom.
          </p>
        </motion.header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-12 md:gap-16">
          
          {/* Row 1: Full width Cumulative Graph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_TRANSITION, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* The Bento Card */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] w-full h-[400px] relative overflow-hidden group">
              
              {/* Liquid Glass Overlay on hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 
                              border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-[2.5rem]"></div>
              
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CUMULATIVE_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00A1E0" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00A1E0" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `฿${val.toLocaleString()}`} dx={-10} width={80} />
                  <Tooltip 
                    cursor={{ stroke: '#00A1E0', strokeWidth: 1, strokeDasharray: '4 4' }}
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontWeight: 500 }}
                    formatter={(value: number) => [`฿${value.toLocaleString()}`, "Balance"]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#00A1E0" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorBalance)" 
                    activeDot={{ r: 6, strokeWidth: 0, fill: '#00A1E0' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Label outside the card */}
            <div className="flex flex-col gap-1 px-4">
              <h3 className="text-xl font-medium tracking-tight flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#00A1E0]" weight="fill" /> Cumulative Growth
              </h3>
              <p className="text-sm text-zinc-500">Your total savings trajectory over the recent months.</p>
            </div>
          </motion.div>

          {/* Row 2: DCA Graph & Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
            
            {/* DCA Graph (2 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_TRANSITION, delay: 0.2 }}
              className="md:col-span-2 flex flex-col gap-6"
            >
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] w-full h-[350px] relative overflow-hidden group">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dcaProjectionData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorDca" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `฿${(val/1000).toLocaleString()}k`} dx={-10} width={80} />
                    <Tooltip 
                      cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '4 4' }}
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontWeight: 500 }}
                      formatter={(value: number) => [`฿${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, "Projected"]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorDca)" 
                      activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-1 px-4">
                <h3 className="text-xl font-medium tracking-tight flex items-center gap-2">
                  <TrendUp className="w-5 h-5 text-emerald-500" weight="bold" /> 5-Year Projection
                </h3>
                <p className="text-sm text-zinc-500">Estimated wealth assuming a consistent 1.5% APY compound interest.</p>
              </div>
            </motion.div>

            {/* DCA Controls (1 col) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_TRANSITION, delay: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] h-full flex flex-col justify-center gap-10 relative overflow-hidden group">
                {/* Decorative Liquid Glass element */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#00A1E0]/5 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest">Monthly Auto-Save</span>
                    <PiggyBank className="w-6 h-6 text-[#00A1E0]" weight="duotone" />
                  </div>
                  
                  <div className="h-16 flex items-center">
                    <AnimatePresence mode="popLayout">
                      <motion.div 
                        key={dcaAmount}
                        initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 20, filter: "blur(4px)", position: "absolute" }}
                        transition={SPRING_TRANSITION}
                        className="text-4xl lg:text-5xl font-mono font-semibold tracking-tighter text-[#00A1E0]"
                      >
                        ฿{dcaAmount.toLocaleString()}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex gap-4 relative z-10">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDecrement}
                    className="flex-1 flex items-center justify-center py-4 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 rounded-2xl transition-colors border border-zinc-200"
                  >
                    <Minus weight="bold" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleIncrement}
                    className="flex-1 flex items-center justify-center py-4 bg-[#00A1E0] hover:bg-[#008cc2] text-white rounded-2xl transition-colors shadow-lg shadow-[#00A1E0]/20"
                  >
                    <Plus weight="bold" />
                  </motion.button>
                </div>
              </div>

              <div className="flex flex-col gap-1 px-4">
                <h3 className="text-xl font-medium tracking-tight flex items-center gap-2">Adjust Contribution</h3>
                <p className="text-sm text-zinc-500">Tweak the controls to model your future returns.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

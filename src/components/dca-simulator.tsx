"use client";

import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  projected: {
    label: "Projected Value",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function DcaSimulator() {
  const [dcaAmount, setDcaAmount] = useState(5000);

  const increment = () => setDcaAmount((prev) => prev + 1000);
  const decrement = () => setDcaAmount((prev) => Math.max(1000, prev - 1000));

  // Compute 5 years projection based on simple 5% annualized return
  const years = Array.from({ length: 5 }, (_, i) => i + 1);
  const annualReturn = 0.05;
  
  const chartData = years.map(year => {
    // FV = P * (((1 + r/n)^(nt) - 1) / (r/n))
    // simple approximation
    const monthlyRate = annualReturn / 12;
    const months = year * 12;
    const futureValue = dcaAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    return {
      year: `Year ${year}`,
      projected: Math.round(futureValue)
    };
  });

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Controls */}
      <div className="bg-slate-50/50 rounded-[2rem] p-6 border border-slate-100 flex items-center justify-between">
         <div>
            <div className="text-sm font-medium text-slate-500 mb-2">Monthly DCA</div>
            <div className="flex items-center gap-4">
               <Button 
                 variant="outline" 
                 size="icon" 
                 onClick={decrement}
                 className="h-12 w-12 rounded-2xl border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-primary transition-colors disabled:opacity-50"
                 disabled={dcaAmount <= 1000}
               >
                 <Minus size={20} weight="bold" />
               </Button>
               
               <div className="text-3xl font-bold tracking-tighter w-32 text-center relative overflow-hidden h-10 flex items-center justify-center font-mono">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={dcaAmount}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute text-foreground"
                    >
                      {dcaAmount.toLocaleString()}
                    </motion.span>
                  </AnimatePresence>
               </div>
               
               <Button 
                 variant="outline" 
                 size="icon" 
                 onClick={increment}
                 className="h-12 w-12 rounded-2xl border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:text-primary transition-colors"
               >
                 <Plus size={20} weight="bold" />
               </Button>
            </div>
         </div>
      </div>

      {/* Visualizer */}
      <div className="flex-1 min-h-[220px]">
         <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: 10, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.15)" />
                 <XAxis 
                   dataKey="year" 
                   tickLine={false} 
                   axisLine={false} 
                   tickMargin={10} 
                   fontSize={12}
                   stroke="hsl(var(--muted-foreground))"
                 />
                 <YAxis 
                   tickLine={false} 
                   axisLine={false} 
                   tickMargin={10}
                   fontSize={12}
                   width={50}
                   stroke="hsl(var(--muted-foreground))"
                   tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
                 />
                 <ChartTooltip 
                    cursor={{ fill: 'hsl(var(--muted-foreground) / 0.05)' }}
                    content={
                       <ChartTooltipContent 
                         indicator="line"
                         className="bg-background/90 backdrop-blur-md border border-slate-200/50 shadow-xl rounded-xl mix-blend-normal"
                       />
                    }
                 />
                 <Bar 
                   dataKey="projected" 
                   fill="var(--color-projected)" 
                   radius={[6, 6, 6, 6]}
                   animationDuration={800}
                   animationEasing="ease-out"
                 />
              </BarChart>
            </ResponsiveContainer>
         </ChartContainer>
      </div>
      
      {/* Target summary */}
      <div className="bg-primary/5 rounded-[1.5rem] p-5 flex items-center justify-between border border-primary/10">
         <div className="text-sm font-medium text-primary">Expected 5Y Output</div>
         <div className="text-xl font-bold tracking-tight text-primary font-mono">
            ฿{chartData[4].projected.toLocaleString()}
         </div>
      </div>
    </div>
  );
}

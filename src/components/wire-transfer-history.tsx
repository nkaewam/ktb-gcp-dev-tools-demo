"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Receipt, Calendar, CaretRight, QrCode } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const MOCK_SLIPS = [
  { id: 1, date: "12 Mar 2024", amount: "฿12,500.00", time: "10:30" },
  { id: 2, date: "10 Mar 2024", amount: "฿5,000.00", time: "14:15" },
  { id: 3, date: "05 Mar 2024", amount: "฿8,200.00", time: "09:45" },
  { id: 4, date: "28 Feb 2024", amount: "฿15,000.00", time: "16:20" },
  { id: 5, date: "25 Feb 2024", amount: "฿2,300.00", time: "11:10" },
  { id: 6, date: "20 Feb 2024", amount: "฿4,500.00", time: "13:05" },
];

const SlipPlaceholder = ({ date, amount, time, className }: { date: string, amount: string, time: string, className?: string }) => (
  <div className={cn(
    "relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-sky-50 to-white border border-sky-100 shadow-sm transition-all duration-300 hover:shadow-md group",
    className
  )}>
    <div className="absolute inset-0 p-4 flex flex-col items-center justify-between text-center">
      <div className="w-full flex justify-between items-start opacity-60">
        <Receipt size={16} mirrored />
        <span className="text-[10px] font-mono">{time}</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <div className="p-2 rounded-lg bg-sky-100/50 text-sky-600">
          <QrCode size={24} weight="duotone" />
        </div>
        <div className="space-y-0.5">
          <p className="text-[10px] uppercase tracking-wider text-sky-500 font-bold">Transfer Success</p>
          <p className="text-sm font-bold text-slate-800">{amount}</p>
        </div>
      </div>

      <div className="w-full pt-2 border-t border-sky-50">
        <p className="text-[10px] text-slate-400 font-medium">{date}</p>
      </div>
    </div>
    
    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
  </div>
);

export function WireTransferHistory() {
  const extraSlips = useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      id: `extra-${i}`,
      date: `${20 - i} Feb 2024`,
      amount: `฿${(Math.random() * 5000 + 1000).toLocaleString()}.00`,
      time: "12:00",
      className: "aspect-[3/4.5] grayscale opacity-40 hover:grayscale-0 hover:opacity-100",
    }));
  }, []);

  return (
    <Card className="rounded-[2.5rem] border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden h-full">
      <CardHeader className="p-8 pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold tracking-tight">Wire Transfer Proof</CardTitle>
            <CardDescription className="text-sm text-muted-foreground italic">Transaction evidence history</CardDescription>
          </div>
          <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
            <Receipt weight="duotone" size={20} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {MOCK_SLIPS.slice(0, 3).map((slip) => (
            <SlipPlaceholder key={slip.id} {...slip} />
          ))}
        </div>

        <Dialog>
          <DialogTrigger render={
            <button className="w-full group flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="size-8 rounded-full border-2 border-white bg-sky-100 flex items-center justify-center text-sky-600 text-[10px] font-bold shadow-sm">
                      <Receipt weight="bold" size={12} />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors">See 12 more images</span>
              </div>
              <CaretRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
          } />
          <DialogContent className="max-w-4xl rounded-[3rem] p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold tracking-tight">Transaction History Slips</DialogTitle>
              <CardDescription>Records from your recent saving activities</CardDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
              {MOCK_SLIPS.map((slip) => (
                <SlipPlaceholder key={slip.id} {...slip} className="aspect-[3/4.5]" />
              ))}
              {extraSlips.map((slip) => (
                <SlipPlaceholder 
                  key={slip.id} 
                  date={slip.date} 
                  amount={slip.amount} 
                  time={slip.time} 
                  className={slip.className}
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

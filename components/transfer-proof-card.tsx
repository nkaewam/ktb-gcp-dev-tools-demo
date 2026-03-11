"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Receipt, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_SLIPS = [
  "/ktb-slip.png",
  "/ktb-slip.png",
  "/ktb-slip.png",
  "/ktb-slip.png",
  "/ktb-slip.png",
  "/ktb-slip.png",
];

export function TransferProofCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="rounded-[2rem] border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Receipt size={20} />
          </div>
          <CardTitle className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            Wire Transfer History
          </CardTitle>
        </div>
        <CardDescription>Recent Krungthai NEXT payment slips</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="w-full border-none p-0 bg-transparent cursor-pointer group">
            <div className="grid grid-cols-3 gap-3 w-full">
              {MOCK_SLIPS.slice(0, 3).map((slip, index) => (
                <div 
                  key={index} 
                  className="relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 shadow-sm transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-md"
                >
                  <Image
                    src={slip}
                    alt={`Transfer proof ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {index === 2 && MOCK_SLIPS.length > 3 && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white gap-1">
                      <Eye size={20} />
                      <span className="text-xs font-bold">+{MOCK_SLIPS.length - 3} More</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <Receipt className="text-primary" />
                Transfer Proof History
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {MOCK_SLIPS.map((slip, index) => (
                <div 
                  key={index} 
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.03]"
                >
                  <Image
                    src={slip}
                    alt={`Transfer proof ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-bold text-primary border border-primary/20">
                    SLIP #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

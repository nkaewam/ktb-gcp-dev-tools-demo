"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Receipt, ArrowsOutSimple, Image as ImageIcon } from "@phosphor-icons/react";

const SLIPS = [
  "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586281380349-631531a744c2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1626266061368-46a8358f0e36?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621416848469-e01df8651a20?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1633151209234-1b933d2f937d?q=80&w=800&auto=format&fit=crop",
];

const SPRING_TRANSITION = { type: "spring" as const, stiffness: 100, damping: 20 };

export function WireTransferHistory() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_TRANSITION, delay: 0.4 }}
      className="flex flex-col gap-6"
    >
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] w-full relative overflow-hidden group">
        
        {/* Decorative background blurs */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#00A1E0]/5 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#00A1E0]/10 rounded-xl">
              <Receipt className="w-5 h-5 text-[#00A1E0]" weight="duotone" />
            </div>
            <h3 className="text-xl font-medium tracking-tight">Wire Transfer Proofs</h3>
          </div>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger 
              render={
                <button className="text-sm font-medium text-[#00A1E0] hover:text-[#008cc2] transition-colors flex items-center gap-1.5 px-4 py-2 bg-[#00A1E0]/5 rounded-full hover:bg-[#00A1E0]/10" />
              }
            >
              <ArrowsOutSimple weight="bold" />
              See all
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-8 bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border-white/40 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold tracking-tight mb-6 flex items-center gap-3">
                   <div className="p-2 bg-[#00A1E0]/10 rounded-xl">
                    <Receipt className="w-6 h-6 text-[#00A1E0]" weight="duotone" />
                  </div>
                  Recently Uploaded Proofs
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SLIPS.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group/item"
                  >
                    <img 
                      src={src} 
                      alt={`Transfer proof ${i + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white">
                         <ArrowsOutSimple weight="bold" className="w-6 h-6" />
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Initial 3x1 Grid */}
        <div className="grid grid-cols-3 gap-4 relative z-10">
          {SLIPS.slice(0, 3).map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group/item"
              onClick={() => setIsOpen(true)}
            >
              <img 
                src={src} 
                alt={`Transfer proof ${i + 1}`} 
                className="w-full h-full object-cover grayscale-[0.5] group-hover/item:grayscale-0 transition-all duration-500"
              />
              {i === 2 && SLIPS.length > 3 && (
                <div 
                  className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white backdrop-blur-[2px] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                  }}
                >
                  <span className="text-2xl font-bold">+{SLIPS.length - 3}</span>
                  <span className="text-[10px] uppercase tracking-widest font-medium opacity-80">More</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 flex items-center gap-3 text-sm text-zinc-500">
           <div className="flex -space-x-2">
             {[1,2,3].map(i => (
               <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                 <ImageIcon className="w-3 h-3 text-slate-400" />
               </div>
             ))}
           </div>
           <span>Last upload today at 10:45 AM</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-1 px-4">
        <h3 className="text-xl font-medium tracking-tight flex items-center gap-2">
          Image History
        </h3>
        <p className="text-sm text-zinc-500">A visual timeline of your savings deposits and wire transfers.</p>
      </div>
    </motion.div>
  );
}

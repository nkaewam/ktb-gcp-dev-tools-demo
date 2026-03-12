import { SavingsGrowthChart } from "@/components/savings-growth-chart";
import { DCACalculator } from "@/components/dca-calculator";
import { TransferProofCard } from "@/components/transfer-proof-card";
import { Sparkle, PiggyBank, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export default function DashboardPage() {
  return (
    <div className="min-h-[100dvh] w-full bg-[#fcfcfd] text-slate-900 selection:bg-primary/20">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="mx-auto max-w-[1400px] px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center bg-primary text-white rounded-lg size-8 shadow-sm">
              <PiggyBank size={20} weight="fill" />
            </div>
            <span className="font-semibold tracking-tight text-lg">Krungthai NEXT</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-slate-100/80 px-3 py-1.5 rounded-full text-sm font-medium text-slate-600 border border-slate-200/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
              <span className="relative inline-flex rounded-full size-2 bg-primary"></span>
            </span>
            <span className="ml-1.5">Live Sync active</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 md:px-6 py-8 md:py-12 flex flex-col gap-10">
        
        {/* Title Section */}
        <section className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 w-max px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary font-medium text-sm">
            <Sparkle size={16} weight="duotone" className="text-primary" />
            Savings Sprint 2026
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-900 leading-none">
            Your Wealth, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#007ba8]">Accelerated.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 max-w-[55ch] mt-2 leading-relaxed">
            Monitor your historical accumulation and project your future milestones seamlessly. Stay disciplined, reach your goals faster.
          </p>
        </section>

        {/* Bento Grid Layout for Dashboard */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 auto-rows-min">
          
          {/* Main Growth Chart Card (Spans 8 cols on desktop) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Savings Growth</h2>
                <p className="text-sm text-slate-500 mt-1">Cumulative balance over the last 12 months</p>
              </div>
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-sm font-medium text-slate-500 mb-1">Total Accumulated</span>
                <span className="text-3xl font-extrabold tracking-tight tabular-nums flex items-baseline text-slate-900">
                  <span className="text-xl text-slate-400 mr-1">฿</span>
                  111,540
                  <span className="inline-flex items-center justify-center ml-3 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <ArrowUpRight size={12} weight="bold" className="mr-0.5" /> 8.4%
                  </span>
                </span>
              </div>
            </div>

            <div className="flex-1 w-full min-h-[350px]">
              <SavingsGrowthChart />
            </div>
          </div>

          {/* DCA Calculator Card (Spans 4 cols on desktop) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Future Projection</h2>
              <p className="text-sm text-slate-500 mt-1">Auto-invest with DCA strategy</p>
            </div>
            
            <div className="flex-1 flex flex-col h-full w-full">
               <DCACalculator />
            </div>
          </div>

          {/* Wire Transfer Proof Card (Spans full width or appropriate size) */}
          <div className="lg:col-span-12 xl:col-span-12">
            <TransferProofCard />
          </div>

        </section>

      </main>
    </div>
  );
}

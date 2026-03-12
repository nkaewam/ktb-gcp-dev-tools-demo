import { SavingsGrowthChart } from "@/components/savings-growth-chart";
import { DcaSimulator } from "@/components/dca-simulator";
import { WireTransferHistory } from "@/components/wire-transfer-history";
import { UserCircle, Bell, MagnifyingGlass, Wallet } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-[100dvh] bg-background font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_10px_20px_-10px_#00A1E0]">
              <Wallet weight="duotone" size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Savings Sprint
            </h1>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <button aria-label="Search" className="hover:text-primary transition-colors">
              <MagnifyingGlass size={24} />
            </button>
            <button aria-label="Notifications" className="hover:text-primary transition-colors relative">
              <span className="absolute -right-1 -top-1 flex h-3 w-3 rounded-full bg-destructive border-2 border-background" />
              <Bell size={24} />
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium text-foreground leading-none">Vito Corleone</p>
                <p className="text-xs text-muted-foreground mt-1">Premium Member</p>
              </div>
              <div className="h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400">
                <UserCircle weight="fill" size={40} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1400px] px-4 py-8 md:px-8 md:py-12">
        <div className="mb-10 lg:flex lg:items-end lg:justify-between">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl tracking-tighter leading-none font-bold text-foreground">
              Your Sprint Overview
            </h2>
            <p className="text-base text-gray-500 leading-relaxed max-w-[65ch]">
              Track your savings journey and visualize your potential future growth with disciplined DCA strategies.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 lg:mt-0">
            <Button variant="outline" className="rounded-full shadow-sm hover:bg-slate-50 border-slate-200">
              Download Report
            </Button>
            <Button className="rounded-full shadow-[0_8px_16px_-4px_rgba(0,161,224,0.4)]">
              New Investment
            </Button>
          </div>
        </div>

        {/* Bento Grid 2.0 Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Main Chart Column */}
          <section className="md:col-span-8 flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-card p-1 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex-1 min-h-[400px]">
              <div className="absolute inset-0 z-0 pointer-events-none rounded-[2.5rem] shadow-[inset_0_1px_0_rgba(255,255,255,1)]" />
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">Cumulative Savings</h3>
                    <p className="text-sm text-muted-foreground mt-1">Total accumulated relative to historical performance</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">+14.2% YoY</p>
                    <div className="mt-2 text-3xl font-bold tracking-tighter text-foreground font-mono">
                      ฿1,245,600.00
                    </div>
                  </div>
                </div>
                {/* Embedded Chart */}
                <div className="flex-1 min-h-[300px] w-full mt-4">
                  <SavingsGrowthChart />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contextual Metric 1 */}
              <div className="rounded-[2.5rem] bg-card p-8 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-[40px] transition-transform duration-700 group-hover:scale-150" />
                <h4 className="text-sm text-muted-foreground mb-2">Next Milestone</h4>
                <div className="text-2xl font-bold tracking-tight mb-4">฿1.5M Auto-buy Target</div>
                <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                  <div className="bg-primary h-2 rounded-full w-[83%]" />
                </div>
                <div className="text-xs text-slate-400 text-right">83% completed</div>
              </div>
              
              {/* Contextual Metric 2 */}
              <div className="rounded-[2.5rem] bg-card p-8 border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                 <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] transition-transform duration-700 group-hover:scale-150" />
                <h4 className="text-sm text-muted-foreground mb-2">Portfolio Health</h4>
                <div className="text-2xl font-bold tracking-tight text-emerald-600 mb-2">Excellent</div>
                <p className="text-sm text-slate-500 leading-relaxed">Diversification is well-balanced across 4 major asset classes.</p>
              </div>
            </div>

            {/* Wire Transfer Proof Card */}
            <WireTransferHistory />
          </section>

          {/* DCA Simulator Column */}
          <section className="md:col-span-4 h-full">
            <div className="h-full rounded-[2.5rem] bg-card border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
               <div className="absolute inset-0 top-0 h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
               <div className="p-8 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">DCA Simulator</h3>
                  <p className="text-sm text-muted-foreground mt-1">Project 5-year potential savings</p>
                </div>
                <DcaSimulator />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

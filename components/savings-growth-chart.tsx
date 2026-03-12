"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const generateMockData = () => {
  const data = [];
  let currentSavings = 50000;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();
  const currentMonth = date.getMonth();
  
  for (let i = 11; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    data.push({
      month: months[monthIndex],
      savings: Math.round(currentSavings),
    });
    // Add random growth between 2000 and 8000
    currentSavings += Math.random() * 6000 + 2000;
  }
  return data;
};

const chartConfig = {
  savings: {
    label: "Cumulative Savings (THB)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function SavingsGrowthChart() {
  const chartData = useMemo(() => generateMockData(), []);

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[400px]">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="fillSavings" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-savings)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-savings)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.4} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={32}
              className="text-xs text-muted-foreground font-medium"
            />
            <YAxis 
               tickLine={false}
               axisLine={false}
               tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
               width={60}
               className="text-xs text-muted-foreground font-medium"
               domain={['dataMin - 10000', 'dataMax + 10000']}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[200px]"
                  nameKey="savings"
                  labelFormatter={(value) => {
                    return value;
                  }}
                  formatter={(value: any) => (
                    <div className="flex items-center text-sm">
                      <div className="font-semibold text-foreground">
                        {new Intl.NumberFormat("th-TH", {
                          style: "currency",
                          currency: "THB",
                          maximumFractionDigits: 0,
                        }).format(value as number)}
                      </div>
                    </div>
                  )}
                />
              }
            />
            <Area
              dataKey="savings"
              type="monotone"
              fill="url(#fillSavings)"
              fillOpacity={0.4}
              stroke="var(--color-savings)"
              strokeWidth={3}
              animationDuration={1500}
              activeDot={{
                r: 6,
                fill: "hsl(var(--background))",
                stroke: "var(--color-savings)",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

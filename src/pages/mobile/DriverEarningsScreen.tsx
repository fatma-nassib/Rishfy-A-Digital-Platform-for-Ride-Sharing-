import React, { useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Props {
  onNavigate: (s: Screen) => void;
}

type Period = "week" | "month" | "all";

const data: Record<Period, { total: string; trips: number; average: string }> = {
  week: { total: "48,300", trips: 14, average: "3,450" },
  month: { total: "196,000", trips: 56, average: "3,500" },
  all: { total: "524,200", trips: 134, average: "3,913" },
};

const txns = [
  { id: "#4521", route: "Kimara → Kariakoo", amount: "3,500", date: "Today 07:35", type: "credit" },
  { id: "#4519", route: "Mbezi → City Centre", amount: "4,000", date: "Yesterday 18:10", type: "credit" },
  { id: "#4517", route: "Kimara → Kariakoo", amount: "2,800", date: "Feb 22 07:00", type: "credit" },
];

const DriverEarningsScreen: React.FC<Props> = ({ onNavigate }) => {
  const [period, setPeriod] = useState<Period>("week");
  const stats = data[period];

  return (
    <div className="pt-12 px-5 animate-fade-in">
      <button onClick={() => onNavigate("driver-home")} className="mb-4">
        <ArrowLeft size={20} className="text-foreground" />
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Wallet className="text-primary" size={22} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">Earnings</h1>
          <p className="text-xs text-muted-foreground">Summary of trips completed as a driver.</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {(["week", "month", "all"] as Period[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriod(p)}
            className={`flex-1 py-2.5 rounded-full text-xs font-semibold ${
              period === p ? "bg-primary text-primary-foreground" : "bg-background border border-input text-muted-foreground"
            }`}
          >
            {p === "week" && "This week"}
            {p === "month" && "This month"}
            {p === "all" && "All time"}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-primary text-primary-foreground p-4 mb-4">
        <p className="text-xs font-medium opacity-80 mb-1">Total earned</p>
        <p className="text-3xl font-extrabold mb-1">TZS {stats.total}</p>
        <p className="text-[11px] opacity-80">
          {stats.trips} trips • Average TZS {stats.average} per trip
        </p>
      </div>

      <div className="rounded-xl border border-input bg-background px-4 py-3 mb-4 text-sm flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Available balance</p>
          <p className="text-base font-bold text-foreground">TZS 12,300</p>
        </div>
        <button
          type="button"
          className="px-3 py-2 rounded-lg bg-foreground text-background text-xs font-semibold flex items-center gap-1"
        >
          Withdraw
          <ArrowUpRight size={14} />
        </button>
      </div>

      <p className="text-xs font-semibold text-muted-foreground mb-2">Recent payouts</p>
      <div className="space-y-2">
        {txns.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between px-3 py-3 rounded-xl border border-input bg-background"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{t.route}</p>
              <p className="text-[11px] text-muted-foreground">
                {t.id} • {t.date}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary">
                <ArrowDownRight size={12} />
                TZS {t.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverEarningsScreen;


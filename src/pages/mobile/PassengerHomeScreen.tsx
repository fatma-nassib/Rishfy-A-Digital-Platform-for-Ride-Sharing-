// import { useMobileNav } from '../../hooks/use-mobile';

// export function PassengerHomeScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Where are you going?</h1>
//       <p className="screen-subtitle">Search a destination to request a ride.</p>
//       <div className="form">
//         <label className="field">
//           <span>Pickup</span>
//           <input placeholder="Current location" />
//         </label>
//         <label className="field">
//           <span>Destination</span>
//           <input placeholder="Enter destination" />
//         </label>
//         <button className="primary-button" onClick={() => setScreen('search-results')}>
//           See options
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useMemo, useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { MapPin, Calendar, Search, ArrowRight } from "lucide-react";
import { useTrip } from "@/context/trip";

interface Props { onNavigate: (s: Screen) => void; }

const PassengerHomeScreen: React.FC<Props> = ({ onNavigate }) => {
  const { setSearch } = useTrip();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [mode, setMode] = useState<"rides" | "schedule">("rides");
  const [date, setDate] = useState<"Today" | "Tomorrow" | "Pick date">("Today");
  const [time, setTime] = useState("07:00");

  const canSearch = useMemo(() => from.trim().length > 1 && to.trim().length > 1, [from, to]);

  const recentSearches = [
    { from: "Kimara", to: "Kariakoo" },
    { from: "Kimara", to: "Kariakoo" },
    { from: "Kimara", to: "Kariakoo" },
  ];

  return (
    <div className="pt-12 px-5 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Good morning,</p>
          <h1 className="text-xl font-bold text-foreground">Fatma Nassib</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
          <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">FN</div>
        </div>
      </div>

      {/* Choose journey */}
      <div className="bg-muted rounded-2xl p-4 mb-4">
        <div className="flex gap-3 mb-4">
          <button
            type="button"
            onClick={() => setMode("rides")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              mode === "rides" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground border border-input"
            }`}
          >
            Rides
          </button>
          <button
            type="button"
            onClick={() => setMode("schedule")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              mode === "schedule" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground border border-input"
            }`}
          >
            Schedule
          </button>
        </div>

        <h2 className="font-bold text-foreground mb-3">Choose your journey</h2>

        <p className="text-xs text-muted-foreground mb-3">Where are you headed?</p>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <input placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-destructive" />
            <input placeholder="To" value={to} onChange={(e) => setTo(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Calendar size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {mode === "rides" ? "Search for rides right now" : `Scheduled: ${date} at ${time}`}
          </span>
        </div>

        {mode === "schedule" && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {(["Today", "Tomorrow", "Pick date"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDate(d)}
                className={`py-2 rounded-xl text-xs font-semibold border transition-colors ${
                  date === d ? "bg-primary/10 border-primary text-primary" : "bg-background border-input text-muted-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}

        {mode === "schedule" && (
          <div className="mb-4">
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Departure time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        )}

        <button
          disabled={!canSearch}
          onClick={() => {
            setSearch({ from, to, intent: mode, dateLabel: date, time });
            onNavigate("search-results");
          }}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2">
          <Search size={16} /> Search Rides
        </button>
      </div>

      {/* Recent */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground text-sm">Recent searches</h3>
        <button className="text-xs text-muted-foreground">Clear</button>
      </div>
      <div className="space-y-2">
        {recentSearches.map((r, i) => (
          <button key={i} onClick={() => onNavigate("search-results")}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted transition-colors text-left">
            <MapPin size={14} className="text-primary" />
            <span className="text-sm text-foreground">{r.from}</span>
            <ArrowRight size={12} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{r.to}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PassengerHomeScreen;

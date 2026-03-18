// import { useMobileNav } from '../../hooks/use-mobile';

// export function RouteCreationScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Custom route</h1>
//       <p className="screen-subtitle">Add intermediate stops for your ride.</p>
//       <div className="form">
//         <label className="field">
//           <span>Stops</span>
//           <input placeholder="Add a stop" />
//         </label>
//         <button className="primary-button" onClick={() => setScreen('route-details')}>
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, Clock, MapPin, Calendar, Repeat } from "lucide-react";

interface Props { onNavigate: (s: Screen) => void; }

const RouteCreationScreen: React.FC<Props> = ({ onNavigate }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [from, setFrom] = useState("Kimara");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<"Today" | "Tomorrow" | "Pick date">("Today");
  const [time, setTime] = useState("07:00");
  const [seats, setSeats] = useState(3);
  const [recurring, setRecurring] = useState(false);
  const [days, setDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);

  const toggleDay = (d: string) =>
    setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));

  if (step === 1) {
    return (
      <div className="pt-12 px-5 animate-fade-in">
        <button onClick={() => onNavigate("driver-home")} className="mb-4">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground mb-6">Where are you going?</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-xs font-bold text-foreground mb-1 block">FROM</label>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-foreground mb-1 block">TO</label>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-destructive" />
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Where to?"
                className="flex-1 px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xs font-bold text-foreground mb-2 block">DATE OF TRIP</label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-input">
            <Calendar size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{date}</span>
          </div>
          <div className="flex gap-2 mt-3">
            {(["Today", "Tomorrow", "Pick date"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDate(d)}
                className={`px-4 py-2 rounded-full border text-xs font-semibold transition-colors ${
                  date === d ? "bg-primary/10 border-primary text-primary" : "border-input text-foreground hover:bg-muted"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setStep(2)}
          disabled={!from.trim() || !to.trim()}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-60"
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <div className="pt-12 px-5 animate-fade-in">
      <button onClick={() => setStep(1)} className="mb-4">
        <ArrowLeft size={20} className="text-foreground" />
      </button>
      <h1 className="text-xl font-bold text-foreground mb-6">Trip Details</h1>

      <div className="space-y-5">
        <div>
          <label className="text-xs font-bold text-foreground mb-2 block">DEPARTURE TIME</label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-input bg-background">
            <Clock size={16} className="text-muted-foreground" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-foreground"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-foreground mb-2 block">AVAILABLE SEATS</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setSeats(n)}
                className={`w-10 h-10 rounded-lg border text-sm font-semibold transition-colors ${
                  n === seats ? "bg-primary text-primary-foreground border-primary" : "border-input text-foreground hover:bg-muted"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-input p-4 bg-background">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Repeat size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-foreground">Recurring route</p>
                <p className="text-xs text-muted-foreground">Repeat this route on selected days</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setRecurring((v) => !v)}
              className={`w-12 h-7 rounded-full relative transition-colors ${
                recurring ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-background transition-all ${
                  recurring ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          {recurring && (
            <div className="grid grid-cols-7 gap-1.5 mt-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => {
                const active = days.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDay(d)}
                    className={`py-2 rounded-lg text-[11px] font-semibold border transition-colors ${
                      active ? "bg-primary text-primary-foreground border-primary" : "bg-background border-input text-muted-foreground"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-foreground mb-2 block">PRICE PER SEAT</label>
          <input defaultValue="TZS 5000" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm" />
        </div>

        <div className="bg-secondary rounded-xl p-4">
          <p className="text-xs font-bold text-primary mb-2">ROUTE SUMMARY</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Route</span><span className="text-foreground font-medium">{from} to {to || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="text-foreground font-medium">{date}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="text-foreground font-medium">{time}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Seats</span><span className="text-foreground font-medium">{seats} seat{seats > 1 ? "s" : ""} available</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Recurring</span><span className="text-foreground font-medium">{recurring ? days.join(", ") : "One-time"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total Earnings</span><span className="text-foreground font-medium">Tsh 15,000</span></div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onNavigate("booking-requests")}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base mt-6"
      >
        Publish Route
      </button>
    </div>
  );
};

export default RouteCreationScreen;

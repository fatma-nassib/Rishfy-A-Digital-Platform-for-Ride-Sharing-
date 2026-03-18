import React, { useEffect } from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, Loader2, Shield, PhoneCall } from "lucide-react";
import { useTrip } from "@/context/trip";

interface Props {
  onNavigate: (s: Screen) => void;
}

const RideSearchingScreen: React.FC<Props> = ({ onNavigate }) => {
  const { trip, markMatched, cancelTrip } = useTrip();

  useEffect(() => {
    // Simulate matching
    const t = window.setTimeout(() => {
      markMatched();
      onNavigate("ride-matched");
    }, 1800);
    return () => window.clearTimeout(t);
  }, [markMatched, onNavigate]);

  return (
    <div className="pt-12 px-5 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <button
          type="button"
          onClick={() => {
            cancelTrip();
            onNavigate("passenger-home");
          }}
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">Finding a driver</h1>
          <p className="text-xs text-muted-foreground">
            {trip.search.from || "Pickup"} to {trip.search.to || "Destination"}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Loader2 size={22} className="text-primary animate-spin" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Searching nearby drivers</p>
            <p className="text-xs text-muted-foreground">This usually takes less than a minute.</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onNavigate("emergency-contacts")}
            className="py-3 rounded-xl border border-input text-foreground text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Shield size={16} />
            Safety
          </button>
          <button
            type="button"
            onClick={() => onNavigate("emergency-contacts")}
            className="py-3 rounded-xl border border-input text-foreground text-sm font-semibold flex items-center justify-center gap-2"
          >
            <PhoneCall size={16} />
            Help
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-muted p-4">
        <p className="text-xs font-semibold text-muted-foreground mb-1">Pickup PIN</p>
        <p className="text-2xl font-extrabold text-foreground tracking-wider">{trip.tripPin}</p>
        <p className="text-[11px] text-muted-foreground mt-1">
          Share this PIN only when the driver arrives to confirm pickup.
        </p>
      </div>
    </div>
  );
};

export default RideSearchingScreen;


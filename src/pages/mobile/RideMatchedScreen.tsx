import React from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, Phone, Share2, ShieldCheck, Navigation } from "lucide-react";
import { useTrip } from "@/context/trip";

interface Props {
  onNavigate: (s: Screen) => void;
}

const RideMatchedScreen: React.FC<Props> = ({ onNavigate }) => {
  const { trip, markArriving, cancelTrip } = useTrip();
  const d = trip.selectedDriver;

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
          <h1 className="text-lg font-bold text-foreground">Driver matched</h1>
          <p className="text-xs text-muted-foreground">
            ETA {d?.etaMin ?? "—"} min • Pickup PIN {trip.tripPin}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-background p-5">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary font-extrabold text-xs">
            {d ? d.name.split(" ").map((x) => x[0]).join("") : "DR"}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-foreground">{d?.name || "Driver"}</p>
              {d?.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                  <ShieldCheck size={12} />
                  Verified
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {d ? `${d.car} • ${d.plate}` : "Vehicle details unavailable"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {trip.search.from || "Pickup"} to {trip.search.to || "Destination"} • {trip.requestedSeats} seat
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <a
            href="tel:+255000000000"
            className="py-3 rounded-xl border border-input text-foreground text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Phone size={14} />
            Call
          </a>
          <button
            type="button"
            onClick={() => onNavigate("notifications")}
            className="py-3 rounded-xl border border-input text-foreground text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Share2 size={14} />
            Share
          </button>
          <button
            type="button"
            onClick={() => onNavigate("emergency-contacts")}
            className="py-3 rounded-xl border border-input text-foreground text-xs font-semibold flex items-center justify-center gap-2"
          >
            <ShieldCheck size={14} />
            Safety
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          markArriving();
          onNavigate("passenger-tracking");
        }}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm mt-4 flex items-center justify-center gap-2"
      >
        <Navigation size={16} />
        Track driver
      </button>
    </div>
  );
};

export default RideMatchedScreen;


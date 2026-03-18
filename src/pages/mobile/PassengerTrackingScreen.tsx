import React, { useEffect, useMemo, useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, ShieldAlert, Share2, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { useTrip } from "@/context/trip";

interface Props {
  onNavigate: (s: Screen) => void;
}

const phases = [
  { id: "arriving", label: "Driver is arriving", eta: "~8 min" },
  { id: "pickup", label: "Driver nearby", eta: "~2 min" },
  { id: "in_trip", label: "Trip in progress", eta: "~14 min" },
  { id: "almost", label: "Almost at destination", eta: "~2 min" },
] as const;

const PassengerTrackingScreen: React.FC<Props> = ({ onNavigate }) => {
  const { trip, startTrip, completeTrip } = useTrip();
  const d = trip.selectedDriver;
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setPhase((p) => (p < 3 ? p + 1 : 3)), 3200);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (phase >= 2) startTrip();
    if (phase === 3) {
      const t = window.setTimeout(() => completeTrip(), 900);
      return () => window.clearTimeout(t);
    }
    return;
  }, [phase, startTrip, completeTrip]);

  const progress = useMemo(() => [18, 40, 72, 95][phase], [phase]);

  return (
    <div className="animate-fade-in">
      {/* Map placeholder */}
      <div className="w-full h-72 bg-muted relative flex items-center justify-center">
        <MapPin size={44} className="text-primary" />
        <div className="absolute top-4 left-4">
          <button
            type="button"
            onClick={() => onNavigate("ride-matched")}
            className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center shadow-sm"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </button>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            type="button"
            onClick={() => onNavigate("emergency-contacts")}
            className="w-10 h-10 rounded-xl bg-destructive text-destructive-foreground flex items-center justify-center shadow-sm"
            aria-label="SOS"
            title="SOS"
          >
            <ShieldAlert size={18} />
          </button>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="-mt-6 bg-background rounded-t-3xl border-t border-border px-5 pt-5 pb-6">
        <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-4" />

        <div className="rounded-2xl border border-border bg-muted/40 p-4 mb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-foreground">{phases[phase].label}</p>
              <p className="text-xs text-muted-foreground mt-1">
                ETA {phases[phase].eta} • Pickup PIN {trip.tripPin}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Trip ref</p>
              <p className="text-xs font-bold text-foreground">{trip.reference}</p>
            </div>
          </div>
          <div className="h-2 bg-border rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-background p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-primary font-extrabold text-xs">
              {d ? d.name.split(" ").map((x) => x[0]).join("") : "DR"}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">{d?.name || "Driver"}</p>
              <p className="text-xs text-muted-foreground">{d ? `${d.car} • ${d.plate}` : "Vehicle details"}</p>
            </div>
            <a
              href="tel:+255000000000"
              className="w-11 h-11 rounded-xl border border-border flex items-center justify-center"
              aria-label="Call driver"
              title="Call driver"
            >
              <Phone size={18} className="text-foreground" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              type="button"
              onClick={() => onNavigate("notifications")}
              className="py-3 rounded-xl border border-input text-foreground text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Share2 size={16} />
              Share trip
            </button>
            <button
              type="button"
              onClick={() => onNavigate("emergency-contacts")}
              className="py-3 rounded-xl border border-input text-foreground text-sm font-semibold flex items-center justify-center gap-2"
            >
              <ShieldAlert size={16} />
              Safety
            </button>
          </div>
        </div>

        {trip.status === "completed" && (
          <button
            type="button"
            onClick={() => onNavigate("receipt")}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} />
            View receipt
          </button>
        )}
      </div>
    </div>
  );
};

export default PassengerTrackingScreen;


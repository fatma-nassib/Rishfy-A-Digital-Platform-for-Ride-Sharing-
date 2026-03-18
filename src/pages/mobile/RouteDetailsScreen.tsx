// import { useMobileNav } from '../../hooks/use-mobile';

// export function RouteDetailsScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Route details</h1>
//       <p className="screen-subtitle">Distance, ETA and price estimate.</p>
//       <div className="form">
//         <button className="primary-button" onClick={() => setScreen('booking-confirm')}>
//           Request ride
//         </button>
//         <button className="link-button" onClick={() => setScreen('route-creation')}>
//           Adjust route
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, ArrowRight, Star, Clock, MapPin, CarFront, BadgeCheck } from "lucide-react";
import { useTrip } from "@/context/trip";

interface Props { onNavigate: (s: Screen) => void; }

const RouteDetailsScreen: React.FC<Props> = ({ onNavigate }) => {
  const { trip, setRequestedSeats } = useTrip();
  const d = trip.selectedDriver;

  return (
    <div className="pt-12 px-5 animate-fade-in">
    <button onClick={() => onNavigate("search-results")} className="mb-4">
      <ArrowLeft size={20} className="text-foreground" />
    </button>

    {/* Map placeholder */}
    <div className="w-full h-40 rounded-xl bg-muted mb-4 flex items-center justify-center">
      <MapPin size={32} className="text-primary" />
    </div>

    <h2 className="font-bold text-foreground mb-1">Your Driver</h2>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xs">
        {d ? d.name.split(" ").map((x) => x[0]).join("") : "DR"}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-foreground text-sm">{d ? d.name : "Select a driver"}</p>
          {d?.verified && <BadgeCheck size={14} className="text-primary" />}
        </div>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, j) => (
            <Star key={j} size={10} className={j < Math.round(d?.rating || 0) ? "text-rishfy-star fill-rishfy-star" : "text-muted"} />
          ))}
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="text-foreground font-medium">{trip.search.from || "Pickup"}</span>
          <ArrowRight size={10} />
          <span className="text-foreground font-medium">{trip.search.to || "Destination"}</span>
        </div>
        <p className="text-xs text-muted-foreground">ETA {d?.etaMin ?? "—"} min</p>
      </div>
    </div>

    <div className="space-y-2 text-sm mb-4">
      <div className="flex items-center gap-2"><CarFront size={14} className="text-primary" /><span className="text-muted-foreground">Vehicle</span><span className="text-foreground font-medium ml-auto">{d ? `${d.car} • ${d.plate}` : "—"}</span></div>
      <div className="flex items-center gap-2"><MapPin size={14} className="text-primary" /><span className="text-muted-foreground">Seats available</span><span className="text-foreground font-medium ml-auto">{d ? d.seatsAvailable : "—"}</span></div>
      <div className="flex items-center gap-2"><Clock size={14} className="text-primary" /><span className="text-muted-foreground">Departure</span><span className="text-foreground font-medium ml-auto">{trip.search.time} • {trip.search.dateLabel}</span></div>
      <div className="flex items-center gap-2"><MapPin size={14} className="text-primary" /><span className="text-muted-foreground">Price per Seat</span><span className="text-foreground font-medium ml-auto">{d ? `TZS ${d.priceTzs}` : "—"}</span></div>
    </div>

    <div>
      <p className="text-xs font-medium text-foreground mb-2">Select seats</p>
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRequestedSeats(n)}
            className={`w-9 h-9 rounded-lg border text-sm font-semibold ${
              n === trip.requestedSeats ? "bg-primary text-primary-foreground border-primary" : "border-input text-foreground"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>

    <button onClick={() => onNavigate("booking-confirm")} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base">
      Confirm
    </button>
    <button onClick={() => onNavigate("search-results")} className="w-full py-3 rounded-xl border border-destructive text-destructive font-semibold text-sm mt-2">
      Cancel
    </button>
    </div>
  );
};

export default RouteDetailsScreen;

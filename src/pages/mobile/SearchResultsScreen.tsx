// import { useMobileNav } from '../../hooks/use-mobile';

// export function SearchResultsScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Suggested routes</h1>
//       <p className="screen-subtitle">Pick the option that works best for you.</p>
//       <div className="form">
//         <button className="primary-button" onClick={() => setScreen('route-selection')}>
//           Select this route
//         </button>
//         <button className="link-button" onClick={() => setScreen('route-creation')}>
//           Create a custom route
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, Clock, Star, ArrowRight } from "lucide-react";
import { useTrip, type DriverOption } from "@/context/trip";

interface Props { onNavigate: (s: Screen) => void; }

const filters = ["All", "Cheapest", "Fastest", "Top rated"];

const results: (DriverOption & { initial: string })[] = [
  { id: "d1", name: "Khadija Omary", rating: 4.9, priceTzs: 5000, etaMin: 8, seatsAvailable: 3, verified: true, car: "Toyota Corolla", plate: "T34 CAZ", initial: "KO" },
  { id: "d2", name: "Ezekiel Simeon", rating: 4.7, priceTzs: 4200, etaMin: 12, seatsAvailable: 2, verified: true, car: "Toyota Corolla", plate: "T18 KLM", initial: "ES" },
  { id: "d3", name: "Godfrey Omary", rating: 4.8, priceTzs: 4600, etaMin: 15, seatsAvailable: 1, verified: false, car: "Toyota Belta", plate: "T22 BTT", initial: "GO" },
];

const SearchResultsScreen: React.FC<Props> = ({ onNavigate }) => {
  const [active, setActive] = useState("All");
  const { trip, selectDriver } = useTrip();

  return (
    <div className="pt-12 px-5 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => onNavigate("passenger-home")}>
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <span className="text-sm text-foreground">{trip.search.from || "Pickup"}</span>
        <ArrowRight size={14} className="text-muted-foreground" />
        <span className="text-sm text-foreground">{trip.search.to || "Destination"}</span>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto">
        {filters.map((f) => (
          <button key={f} onClick={() => setActive(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              active === f ? "bg-primary text-primary-foreground" : "border border-input text-foreground"
            }`}>{f}</button>
        ))}
      </div>

      <div className="space-y-4">
        {results.map((r, i) => (
          <div key={i} className="border border-input rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xs">{r.initial}</div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{r.name}</p>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={10} className={j < Math.round(r.rating) ? "text-rishfy-star fill-rishfy-star" : "text-muted"} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">TZS {r.priceTzs}</p>
                <p className="text-[10px] text-muted-foreground">Per seat</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              <span className="flex items-center gap-1"><Clock size={10} /> {trip.search.time}</span>
              <span>{r.seatsAvailable} seats available</span>
              <span className="text-primary">Available</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{r.car} • {r.plate} • ETA {r.etaMin} min</p>
            <button onClick={() => { selectDriver(r); onNavigate("route-details"); }}
              className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
              View details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsScreen;

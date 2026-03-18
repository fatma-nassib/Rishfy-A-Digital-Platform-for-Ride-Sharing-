// import { useMobileNav } from '../../hooks/use-mobile';

// export function RidesHistoryScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Rides history</h1>
//       <p className="screen-subtitle">Previous trips and receipts.</p>
//       <div className="form">
//         <button className="primary-button" onClick={() => setScreen('passenger-home')}>
//           Back to home
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowRight, Clock, Star } from "lucide-react";

interface Props { onNavigate: (s: Screen) => void; }

const rides = [
  { from: "Kimara", to: "Kariakoo", date: "Feb 22, 2026", time: "07:00AM", price: "TZS 5000", status: "Completed", rating: 5 },
  { from: "Kimara", to: "Kariakoo", date: "Feb 20, 2026", time: "07:30AM", price: "TZS 4000", status: "Completed", rating: 4 },
  { from: "Mbezi", to: "City Centre", date: "Feb 18, 2026", time: "08:00AM", price: "TZS 6000", status: "Cancelled", rating: 0 },
];

const RidesHistoryScreen: React.FC<Props> = ({ onNavigate }) => (
  <div className="pt-12 px-5 animate-fade-in">
    <h1 className="text-lg font-bold text-foreground mb-6">Ride History</h1>

    <div className="space-y-3">
      {rides.map((r, i) => (
        <button
          key={i}
          onClick={() => {
            if (r.status === "Completed" && r.rating > 0) onNavigate("receipt");
            if (r.status === "Completed" && r.rating === 0) onNavigate("rating");
          }}
          className="w-full p-4 rounded-xl border border-input text-left">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-foreground">{r.from}</span>
              <ArrowRight size={12} className="text-muted-foreground" />
              <span className="font-medium text-foreground">{r.to}</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              r.status === "Completed" ? "bg-secondary text-secondary-foreground" : "bg-destructive/10 text-destructive"
            }`}>{r.status}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock size={10} /> {r.date} • {r.time}
            </div>
            <span className="font-semibold text-foreground">{r.price}</span>
          </div>
          {r.rating > 0 && (
            <div className="flex items-center gap-0.5 mt-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={8} className={j < r.rating ? "text-rishfy-star fill-rishfy-star" : "text-muted"} />
              ))}
            </div>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default RidesHistoryScreen;

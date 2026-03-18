// import { useMobileNav } from '../../hooks/use-mobile';

// export function DriverHomeScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Driver dashboard</h1>
//       <p className="screen-subtitle">You are online and ready to receive requests.</p>
//       <div className="form">
//         <button className="primary-button" onClick={() => setScreen('booking-requests')}>
//           View booking requests
//         </button>
//         <button className="link-button" onClick={() => setScreen('active-trip')}>
//           Jump to active trip
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";
import type { Screen } from "@/components/MobileApp";
import { MapPin, Clock, Star, Plus, ChevronRight } from "lucide-react";

interface Props { onNavigate: (s: Screen) => void; }

const DriverHomeScreen: React.FC<Props> = ({ onNavigate }) => {
  const routes = [
    { from: "Kimara", to: "Kariakoo", time: "07:00AM", price: "TZS 5000", seats: "3 seats left" },
    { from: "Kimara", to: "Kariakoo", time: "07:00AM", price: "TZS 6000", seats: "2 seats left" },
    { from: "Kimara", to: "Kariakoo", time: "07:00AM", price: "TZS 5000", seats: "3 seats left" },
  ];

  return (
    <div className="pt-12 px-5 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Good morning,</p>
          <h1 className="text-xl font-bold text-foreground">Ezekiel Mazwa </h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
          <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">EM</div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-2 mb-6">
        {[
          { label: "Trips", value: "0" },
          { label: "Earned", value: "TZshx.16" },
          { label: "Rating", value: "4.5" },
        ].map((s) => (
          <div key={s.label} className="flex-1 bg-muted rounded-xl p-3 text-center">
            <p className="text-sm font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Create Route */}
      <button
        onClick={() => onNavigate("route-creation")}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-muted mb-6"
      >
        <div>
          <p className="font-semibold text-foreground text-sm">Create new Route</p>
          <p className="text-xs text-muted-foreground">Set your route & earn today</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Plus size={18} className="text-primary-foreground" />
        </div>
      </button>

      {/* Active Routes */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-foreground">Active Routes</h2>
        <button className="text-xs text-primary font-medium">See all</button>
      </div>

      <div className="space-y-3">
        {routes.map((r, i) => (
          <button
            key={i}
            onClick={() => onNavigate("trip-details")}
            className="w-full p-3 rounded-xl border border-input text-left"
          >
            <div className="flex justify-between items-start mb-1">
              <div>
                <p className="font-medium text-foreground text-sm">{r.from}</p>
                <p className="text-xs text-muted-foreground">to</p>
                <p className="font-medium text-foreground text-sm">{r.to}</p>
              </div>
              <span className="text-xs text-primary font-medium bg-secondary px-2 py-0.5 rounded-full">{r.seats}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} /> {r.time}
              </div>
              <span className="text-sm font-bold text-primary">{r.price}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DriverHomeScreen;

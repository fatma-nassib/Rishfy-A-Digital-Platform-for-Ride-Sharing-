// import { useMobileNav } from '../../hooks/use-mobile';

// export function TripDetailsScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Trip details</h1>
//       <p className="screen-subtitle">Summary of the current or last ride.</p>
//       <div className="form">
//         <button className="primary-button" onClick={() => setScreen('rating')}>
//           Rate this trip
//         </button>
//         <button className="link-button" onClick={() => setScreen('rides-history')}>
//           View ride history
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, Clock, MapPin, CarFront } from "lucide-react";

interface Props { onNavigate: (s: Screen) => void; }

const TripDetailsScreen: React.FC<Props> = ({ onNavigate }) => (
  <div className="pt-12 px-5 animate-fade-in">
    <button onClick={() => onNavigate("driver-home")} className="mb-4">
      <ArrowLeft size={20} className="text-foreground" />
    </button>
    <h1 className="text-xl font-bold text-foreground mb-6">Trip Details</h1>

    <div className="space-y-4">
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-input">
        <Clock size={16} className="text-muted-foreground" />
        <span className="text-sm text-foreground">07:00AM</span>
      </div>

      <div className="bg-secondary rounded-xl p-4 space-y-1 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Route</span><span className="text-foreground font-medium">Kimara to Kariakoo</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="text-foreground font-medium">22 Feb 2026</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Seats</span><span className="text-foreground font-medium">3 seats available</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="text-foreground font-medium">TZS 5000/seat</span></div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <CarFront size={12} />
        <span>Vehicle: Toyota Corolla • T34 CAZ</span>
      </div>

      <button onClick={() => onNavigate("booking-requests")} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
        View Booking Requests
      </button>
      <button onClick={() => onNavigate("active-trip")} className="w-full py-3 rounded-xl border border-foreground text-foreground font-semibold text-sm">
        START TRIP
      </button>
    </div>
  </div>
);

export default TripDetailsScreen;

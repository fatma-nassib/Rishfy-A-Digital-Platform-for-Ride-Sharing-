// import { useMobileNav } from '../../hooks/use-mobile';

// export function BookingConfirmScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Booking confirmed</h1>
//       <p className="screen-subtitle">Your driver is on the way.</p>
//       <div className="form">
//         <button className="primary-button" onClick={() => setScreen('active-trip')}>
//           View active trip
//         </button>
//         <button className="link-button" onClick={() => setScreen('passenger-home')}>
//           Back to home
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTrip } from "@/context/trip";

interface Props { onNavigate: (s: Screen) => void; }

const BookingConfirmScreen: React.FC<Props> = ({ onNavigate }) => {
  const { trip, startSearching } = useTrip();
  const d = trip.selectedDriver;

  const total = d ? d.priceTzs * trip.requestedSeats : 0;

  return (
    <div className="pt-12 px-5 animate-fade-in">
    <button onClick={() => onNavigate("route-details")} className="mb-4">
      <ArrowLeft size={20} className="text-foreground" />
    </button>

    <h1 className="text-xl font-bold text-foreground mb-6">Confirm Booking</h1>

    <div className="bg-secondary rounded-xl p-3 mb-6 text-center">
      <p className="text-xs text-primary font-medium">Free cancellation up to 2 hours before departure</p>
    </div>

    <div className="mb-6">
      <h3 className="font-semibold text-foreground mb-3">Booking summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Driver</span><span className="text-foreground font-medium">{d?.name || "—"}</span></div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Route</span>
          <span className="flex items-center gap-1 text-foreground font-medium">{trip.search.from || "Pickup"} <ArrowRight size={10} /> {trip.search.to || "Destination"}</span>
        </div>
        <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="text-foreground font-medium">{trip.search.dateLabel}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Departure</span><span className="text-foreground font-medium">{trip.search.time}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Seats</span><span className="text-foreground font-medium">{trip.requestedSeats}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="text-foreground font-medium">{d ? `TZS ${d.priceTzs}` : "—"}</span></div>
        <div className="flex justify-between border-t border-border pt-2 mt-2">
          <span className="font-semibold text-foreground">TOTAL</span>
          <span className="font-bold text-primary">{d ? `TZS ${total}` : "—"}</span>
        </div>
      </div>
    </div>

    <button onClick={() => onNavigate("payment")} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base mb-2">
      Confirm and pay
    </button>
    <button
      type="button"
      onClick={() => {
        startSearching();
        onNavigate("ride-searching");
      }}
      className="w-full py-3 rounded-xl border border-input text-foreground font-semibold text-sm mb-2"
    >
      Request driver now
    </button>
    <button onClick={() => onNavigate("route-details")} className="w-full py-3 rounded-xl border border-destructive text-destructive font-semibold text-sm">
      Cancel
    </button>
    </div>
  );
};

export default BookingConfirmScreen;

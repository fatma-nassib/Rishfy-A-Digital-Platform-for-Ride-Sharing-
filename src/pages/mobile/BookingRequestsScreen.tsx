// import { useMobileNav } from '../../hooks/use-mobile';

// export function BookingRequestsScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Booking requests</h1>
//       <p className="screen-subtitle">Incoming rides waiting for a driver.</p>
//       <div className="form">
//         <button className="primary-button" onClick={() => setScreen('active-trip')}>
//           Accept sample request
//         </button>
//         <button className="link-button" onClick={() => setScreen('driver-home')}>
//           Back to driver home
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useMemo, useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, MapPin, Check, X } from "lucide-react";

interface Props { onNavigate: (s: Screen) => void; }

type Req = { id: number; name: string; seats: number; note: string; initial: string; accepted: boolean };

const seedRequests: Req[] = [
  { id: 1, name: "Chababuuu Lamiru", seats: 2, note: "Destination: Ubungo", initial: "CL", accepted: false },
  { id: 2, name: "Godfrey Marco", seats: 1, note: "Destination: Kariakoo", initial: "GM", accepted: false },
  { id: 3, name: "Amina Juma", seats: 1, note: "Destination: City CBD", initial: "AJ", accepted: true },
];

const BookingRequestsScreen: React.FC<Props> = ({ onNavigate }) => {
  const [requests, setRequests] = useState<Req[]>(seedRequests);

  const unread = useMemo(() => requests.filter((r) => !r.accepted).length, [requests]);
  const acceptedCount = useMemo(() => requests.filter((r) => r.accepted).length, [requests]);

  const accept = (id: number) => setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, accepted: true } : r)));
  const decline = (id: number) => setRequests((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="pt-12 px-5 animate-fade-in pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => onNavigate("driver-home")}>
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">Booking Requests</h1>
          <p className="text-xs text-muted-foreground">Route: Kimara to Kariakoo</p>
        </div>
        <div className="w-7 h-7 rounded-full bg-destructive flex items-center justify-center">
          <span className="text-[11px] font-extrabold text-destructive-foreground">{unread}</span>
        </div>
      </div>

      <div className="space-y-3">
        {requests.map((r) => (
          <div key={r.id} className="border border-input rounded-xl p-4 bg-background">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-primary font-extrabold text-xs">
                {r.initial}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.seats} seat{r.seats > 1 ? "s" : ""} requested</p>
              </div>
              {r.accepted && (
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  Accepted
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <MapPin size={12} className="text-primary" />
              <span>{r.note}</span>
            </div>

            {!r.accepted && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => accept(r.id)}
                  className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Check size={14} />
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => decline(r.id)}
                  className="flex-1 py-2.5 rounded-lg border border-destructive text-destructive text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <X size={14} />
                  Decline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(320px-40px)]">
        <button
          type="button"
          disabled={acceptedCount === 0}
          onClick={() => onNavigate("active-trip")}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-60"
        >
          Start trip
        </button>
      </div>
    </div>
  );
};

export default BookingRequestsScreen;

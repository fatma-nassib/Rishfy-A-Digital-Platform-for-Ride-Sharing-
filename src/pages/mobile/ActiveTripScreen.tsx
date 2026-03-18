// import { useMobileNav } from '../../hooks/use-mobile';

// export function ActiveTripScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">On trip</h1>
//       <p className="screen-subtitle">Live trip in progress.</p>
//       <div className="form">
//         <button className="primary-button" onClick={() => setScreen('trip-details')}>
//           View trip details
//         </button>
//         <button className="link-button" onClick={() => setScreen('rating')}>
//           Complete and rate
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";
import type { Screen } from "@/components/MobileApp";
import { MapPin, ArrowRight } from "lucide-react";

interface Props { onNavigate: (s: Screen) => void; }

const ActiveTripScreen: React.FC<Props> = ({ onNavigate }) => (
  <div className="animate-fade-in">
    {/* Map placeholder */}
    <div className="w-full h-64 bg-muted flex items-center justify-center relative">
      <MapPin size={40} className="text-primary" />
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background shadow flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[8px]">EM</div>
      </div>
    </div>

    <div className="px-5 pt-4">
      <h2 className="font-bold text-foreground mb-1">Active Trip</h2>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <span className="text-foreground font-medium">Kimara</span>
        <ArrowRight size={12} />
        <span className="text-foreground font-medium">Kariakoo</span>
      </div>

      <h3 className="text-xs font-bold text-foreground mb-3">PASSENGERS</h3>
      <div className="space-y-3 mb-6">
        {[
          { name: "Godbless Lema", dest: "Destination: Mwenge", status: "Boarded" },
          { name: "Godfrey Memo", dest: "Destination: Kariakoo", status: "Boarded" },
        ].map((p, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-input">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xs">{p.name[0]}</div>
              <div>
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.dest}</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-primary font-medium">{p.status}</span>
          </div>
        ))}
      </div>

      <button onClick={() => onNavigate("rating")}
        className="w-full py-3 rounded-xl border border-foreground text-foreground font-semibold text-sm">
        END TRIP
      </button>
    </div>
  </div>
);

export default ActiveTripScreen;

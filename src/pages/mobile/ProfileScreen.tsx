// import { useMobileNav } from '../../hooks/use-mobile';

// export function ProfileScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Profile</h1>
//       <p className="screen-subtitle">Your details and preferences.</p>
//       <div className="form">
//         <label className="field">
//           <span>Name</span>
//           <input placeholder="Rishfy passenger" />
//         </label>
//         <label className="field">
//           <span>Phone</span>
//           <input placeholder="+216 20 000 000" />
//         </label>
//         <button className="primary-button" onClick={() => setScreen('passenger-home')}>
//           Save changes
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, Star, Settings, LogOut, ChevronRight, Shield, Bell, HelpCircle, HeartPulse, WalletCards } from "lucide-react";

interface Props { onNavigate: (s: Screen) => void; role: "driver" | "passenger"; }

const ProfileScreen: React.FC<Props> = ({ onNavigate, role }) => (
  <div className="pt-12 px-5 animate-fade-in">
    <h1 className="text-lg font-bold text-foreground mb-6">Profile</h1>

    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl">
        {role === "driver" ? "EM" : "FN"}
      </div>
      <div>
        <p className="font-bold text-foreground">{role === "driver" ? "Ezekiel Mazwa" : "Fatma Naseeb"}</p>
        <p className="text-sm text-muted-foreground capitalize">{role}</p>
        <div className="flex items-center gap-1 mt-0.5">
          {[...Array(4)].map((_, i) => <Star key={i} size={10} className="text-rishfy-star fill-rishfy-star" />)}
          <Star size={10} className="text-muted" />
          <span className="text-xs text-muted-foreground ml-1">4.5</span>
        </div>
      </div>
    </div>

    <div className="space-y-1">
      {[
        { icon: Settings, label: "Account Settings", action: undefined },
        { icon: Shield, label: "Verification Status", action: undefined },
        { icon: Bell, label: "Notifications", action: () => onNavigate("notifications") },
        { icon: WalletCards, label: "Driver earnings", action: () => role === "driver" && onNavigate("driver-earnings") },
        { icon: HeartPulse, label: "Emergency contacts", action: () => onNavigate("emergency-contacts") },
        { icon: HelpCircle, label: "Help & Support", action: undefined },
      ].map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={item.action}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors"
        >
          <div className="flex items-center gap-3">
            <item.icon size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{item.label}</span>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      ))}
      <button onClick={() => onNavigate("splash")} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
        <LogOut size={18} className="text-destructive" />
        <span className="text-sm font-medium text-destructive">Log Out</span>
      </button>
    </div>
  </div>
);

export default ProfileScreen;

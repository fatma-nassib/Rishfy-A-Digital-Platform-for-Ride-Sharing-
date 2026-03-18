// import { ReactNode } from 'react';
// import { cn } from '../../lib/utils';

// type PhoneFrameProps = {
//   children: ReactNode;
//   className?: string;
// };

// export function PhoneFrame({ children, className }: PhoneFrameProps) {
//   return (
//     <div className="app-shell">
//       <div className="app-shell-phone">
//         <div className="phone-notch" />
//         <div className={cn('phone-screen', className)}>{children}</div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Smartphone, Monitor } from "lucide-react";
import MobileApp from "./MobileApp";
import AdminDashboard from "./AdminDashboard";
import rishfyLogo from "@/assets/rishfy-logo.png";

export const PhoneFrame: React.FC = () => {
  const [view, setView] = useState<"mobile" | "admin">("mobile");

  return (
    <div className="min-h-screen bg-rishfy-dark flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <img src={rishfyLogo} alt="Rishfy" className="w-8 h-8 rounded-lg" />
          <span className="text-primary-foreground font-bold text-lg">Rishfy</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("mobile")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              view === "mobile"
                ? "bg-primary text-primary-foreground"
                : "bg-sidebar-accent text-sidebar-foreground"
            }`}
          >
            <Smartphone size={14} />
            Mobile
          </button>
          <button
            onClick={() => setView("admin")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              view === "admin"
                ? "bg-primary text-primary-foreground"
                : "bg-sidebar-accent text-sidebar-foreground"
            }`}
          >
            <Monitor size={14} />
            Admin
          </button>
        </div>
      </div>

      {/* Content */}
      {view === "mobile" ? (
        <div className="flex-1 flex items-center justify-center pb-8">
          <div className="phone-frame bg-background">
            <div className="phone-notch" />
            <div className="screen-content">
              <MobileApp />
            </div>
          </div>
        </div>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default PhoneFrame;

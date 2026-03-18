// import { MobileScreen, useMobileNav } from '../../hooks/use-mobile';

// const primaryTabs: { id: MobileScreen; label: string }[] = [
//   { id: 'passenger-home', label: 'Home' },
//   { id: 'search-results', label: 'Search' },
//   { id: 'rides-history', label: 'History' },
//   { id: 'profile', label: 'Profile' },
// ];

// export function BottomNav() {
//   const { screen, setScreen } = useMobileNav();

//   return (
//     <nav className="bottom-nav">
//       {primaryTabs.map((tab) => (
//         <button
//           key={tab.id}
//           className={screen === tab.id ? 'bottom-nav-item active' : 'bottom-nav-item'}
//           onClick={() => setScreen(tab.id)}
//         >
//           <span>{tab.label}</span>
//         </button>
//       ))}
//     </nav>
//   );
// }

import React from "react";
import { Home, CarFront, User } from "lucide-react";

interface BottomNavProps {
  active: "home" | "rides" | "profile";
  onNavigate: (tab: "home" | "rides" | "profile") => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ active, onNavigate }) => {
  const items = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "rides" as const, label: "Rides", icon: CarFront },
    { id: "profile" as const, label: "Profile", icon: User },
  ];

  return (
    <div className="bottom-nav">
      <div className="flex justify-around items-center">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col items-center gap-0.5"
          >
            <item.icon
              size={22}
              className={active === item.id ? "text-primary" : "text-muted-foreground"}
            />
            <span
              className={`text-[10px] font-medium ${
                active === item.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;

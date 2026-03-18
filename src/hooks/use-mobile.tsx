// import { createContext, ReactNode, useContext, useState } from 'react';

// export type MobileScreen =
//   | 'splash'
//   | 'login'
//   | 'signup'
//   | 'forgot-password'
//   | 'otp'
//   | 'reset-password'
//   | 'passenger-home'
//   | 'driver-home'
//   | 'search-results'
//   | 'route-selection'
//   | 'route-creation'
//   | 'route-details'
//   | 'booking-requests'
//   | 'booking-confirm'
//   | 'active-trip'
//   | 'trip-details'
//   | 'rides-history'
//   | 'rating'
//   | 'profile';

// type MobileNavContextValue = {
//   screen: MobileScreen;
//   setScreen: (screen: MobileScreen) => void;
// };

// const MobileNavContext = createContext<MobileNavContextValue | undefined>(undefined);

// export function MobileNavProvider({ children }: { children: ReactNode }) {
//   const [screen, setScreen] = useState<MobileScreen>('splash');

//   return (
//     <MobileNavContext.Provider value={{ screen, setScreen }}>
//       {children}
//     </MobileNavContext.Provider>
//   );
// }

// export function useMobileNav() {
//   const ctx = useContext(MobileNavContext);
//   if (!ctx) {
//     throw new Error('useMobileNav must be used within a MobileNavProvider');
//   }
//   return ctx;
// }

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

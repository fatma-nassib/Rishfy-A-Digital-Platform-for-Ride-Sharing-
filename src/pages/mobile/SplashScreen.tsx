// import logo from '../../assets/rishfy-logo.png';
// import { useMobileNav } from '../../hooks/use-mobile';

// export function SplashScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen screen-centered">
//       <img src={logo} alt="Rishfy" className="splash-logo" />
//       <p className="screen-subtitle">Urban rides, simplified.</p>
//       <button className="primary-button" onClick={() => setScreen('login')}>
//         Get started
//       </button>
//     </div>
//   );
// }

import React from "react";
import type { Screen } from "@/components/MobileApp";
import rishfyLogo from "@/assets/rishfy-logo.png";

interface Props {
  onNavigate: (s: Screen) => void;
  onChoose?: (intent: "signup" | "login") => void;
}

const SplashScreen: React.FC<Props> = ({ onNavigate, onChoose }) => (
  <div className="h-full min-h-[750px] flex flex-col items-center justify-center px-8 relative overflow-hidden">
    <div className="green-blob w-64 h-64 -top-20 -right-20 absolute" />
    <div className="green-blob w-48 h-48 -bottom-10 -left-10 absolute" />
    
    <img src={rishfyLogo} alt="Rishfy" className="w-28 h-28 mb-4 z-10" />
    <h1 className="text-3xl font-bold text-foreground z-10"></h1>
    <p className="text-muted-foreground text-center mt-2 mb-12 z-10">
      Let's get started with your<br/>successful journey
    </p>

    <button
      onClick={() => (onChoose ? onChoose("signup") : onNavigate("signup"))}
      className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base z-10 mb-3"
    >
      Get Started
    </button>
    <button
      onClick={() => (onChoose ? onChoose("login") : onNavigate("login"))}
      className="w-full py-3.5 rounded-xl border border-primary text-primary font-semibold text-base z-10"
    >
      I already have an account
    </button>

    <div className="flex gap-2 mt-8 z-10">
      <div className="w-6 h-1.5 rounded-full bg-primary" />
      <div className="w-6 h-1.5 rounded-full bg-muted" />
      <div className="w-6 h-1.5 rounded-full bg-muted" />
    </div>
  </div>
);

export default SplashScreen;

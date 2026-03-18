// import { useMobileNav } from '../../hooks/use-mobile';

// export function OTPScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Enter code</h1>
//       <p className="screen-subtitle">We sent a 4-digit code to your phone.</p>
//       <form
//         className="form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           setScreen('passenger-home');
//         }}
//       >
//         <label className="field">
//           <span>Verification code</span>
//           <input placeholder="· · · ·" />
//         </label>
//         <button className="primary-button" type="submit">
//           Verify
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import type { Screen } from "@/components/MobileApp";

interface Props { onNavigate: (s: Screen) => void; }

const OTPScreen: React.FC<Props> = ({ onNavigate }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (i: number, v: string) => {
    if (v.length > 1) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
  };

  return (
    <div className="pt-16 px-6 animate-fade-in">
      <h1 className="text-xl font-bold text-foreground">Enter Your OTP</h1>
      <p className="text-muted-foreground text-sm mt-1 mb-8">
        Please enter the OTP we sent to you via your email for verification
      </p>

      <div className="flex gap-2 justify-center mb-4">
        {otp.map((d, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            className="w-11 h-12 text-center text-lg font-bold border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground mb-8">
        Resend code in <span className="text-primary font-medium">165sec</span>
      </p>

      <button
        onClick={() => onNavigate("reset-password")}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base"
      >
        Verify now
      </button>
    </div>
  );
};

export default OTPScreen;

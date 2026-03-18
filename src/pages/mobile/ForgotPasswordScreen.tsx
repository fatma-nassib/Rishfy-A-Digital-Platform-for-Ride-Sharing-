// import { useMobileNav } from '../../hooks/use-mobile';

// export function ForgotPasswordScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Forgot password</h1>
//       <p className="screen-subtitle">We will send a reset link to your phone.</p>
//       <form
//         className="form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           setScreen('reset-password');
//         }}
//       >
//         <label className="field">
//           <span>Phone number</span>
//           <input placeholder="+216 20 000 000" />
//         </label>
//         <button type="submit" className="primary-button">
//           Send link
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import type { Screen } from "@/components/MobileApp";

interface Props { onNavigate: (s: Screen) => void; }

const ForgotPasswordScreen: React.FC<Props> = ({ onNavigate }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="pt-16 px-6 animate-fade-in">
      <h1 className="text-xl font-bold text-foreground">Forgot Password</h1>
      <p className="text-muted-foreground text-sm mt-1 mb-8">
        Please enter your email so we may send a verification code
      </p>

      <input
        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="moawezekle@gmail.com"
        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />

      <button
        onClick={() => onNavigate("otp")}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base mt-6"
      >
        Send Code
      </button>
    </div>
  );
};

export default ForgotPasswordScreen;

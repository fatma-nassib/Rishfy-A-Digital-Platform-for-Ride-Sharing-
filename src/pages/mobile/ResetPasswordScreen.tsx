// import { useMobileNav } from '../../hooks/use-mobile';

// export function ResetPasswordScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Reset password</h1>
//       <p className="screen-subtitle">Choose a new password for your account.</p>
//       <form
//         className="form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           setScreen('login');
//         }}
//       >
//         <label className="field">
//           <span>New password</span>
//           <input type="password" placeholder="••••••••" />
//         </label>
//         <label className="field">
//           <span>Confirm password</span>
//           <input type="password" placeholder="••••••••" />
//         </label>
//         <button className="primary-button" type="submit">
//           Save password
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { Eye, EyeOff } from "lucide-react";

interface Props { onNavigate: (s: Screen) => void; }

const ResetPasswordScreen: React.FC<Props> = ({ onNavigate }) => {
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <div className="pt-16 px-6 animate-fade-in">
      <h1 className="text-xl font-bold text-foreground">Reset your Password</h1>
      <p className="text-muted-foreground text-sm mt-1 mb-8">Please enter your new password</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">password</label>
          <div className="relative">
            <input type={show1 ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-10" />
            <button onClick={() => setShow1(!show1)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {show1 ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Confirm password</label>
          <div className="relative">
            <input type={show2 ? "text" : "password"} value={cpw} onChange={(e) => setCpw(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-10" />
            <button onClick={() => setShow2(!show2)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {show2 ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <button onClick={() => onNavigate("login")}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base mt-8">
        Reset
      </button>
    </div>
  );
};

export default ResetPasswordScreen;

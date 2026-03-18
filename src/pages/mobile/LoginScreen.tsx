// import { useMobileNav } from '../../hooks/use-mobile';

// export function LoginScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Welcome back</h1>
//       <p className="screen-subtitle">Sign in to continue with Rishfy.</p>
//       <form
//         className="form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           setScreen('otp');
//         }}
//       >
//         <label className="field">
//           <span>Phone number</span>
//           <input placeholder="+216 20 000 000" />
//         </label>
//         <button type="submit" className="primary-button">
//           Continue
//         </button>
//       </form>
//       <button className="link-button" onClick={() => setScreen('signup')}>
//         Create a new account
//       </button>
//       <button className="link-button" onClick={() => setScreen('forgot-password')}>
//         Forgot password?
//       </button>
//     </div>
//   );
// }

import React, { useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  onNavigate: (s: Screen) => void;
  onDone?: () => void;
}

const LoginScreen: React.FC<Props> = ({ onNavigate, onDone }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="pt-16 px-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-center text-foreground">Welcome Back Again</h1>
      <p className="text-muted-foreground text-center text-sm mb-10">Lets hit the road once more</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-10"
            />
            <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => (onDone ? onDone() : onNavigate("role-selection"))}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base mt-8"
      >
        Login
      </button>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Don't have an account?{" "}
        <button onClick={() => onNavigate("signup")} className="text-primary font-medium">SignUp</button>
      </p>
      <p className="text-center mt-2">
        <button onClick={() => onNavigate("forgot-password")} className="text-sm text-primary font-medium">Forgot Password?</button>
      </p>
    </div>
  );
};

export default LoginScreen;

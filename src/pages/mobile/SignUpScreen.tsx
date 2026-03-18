// import { useMobileNav } from '../../hooks/use-mobile';

// export function SignUpScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Create account</h1>
//       <p className="screen-subtitle">Join Rishfy in a couple of taps.</p>
//       <form
//         className="form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           setScreen('otp');
//         }}
//       >
//         <label className="field">
//           <span>Full name</span>
//           <input placeholder="Your name" />
//         </label>
//         <label className="field">
//           <span>Phone number</span>
//           <input placeholder="+216 20 000 000" />
//         </label>
//         <button type="submit" className="primary-button">
//           Continue
//         </button>
//       </form>
//       <button className="link-button" onClick={() => setScreen('login')}>
//         Already have an account? Sign in
//       </button>
//     </div>
//   );
// }

import React, { useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { User, Eye, EyeOff } from "lucide-react";

interface Props {
  onNavigate: (s: Screen) => void;
  onDone?: () => void;
}

const SignUpScreen: React.FC<Props> = ({ onNavigate, onDone }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="pt-12 px-6 animate-fade-in">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <User size={28} className="text-muted-foreground" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center text-foreground">Welcome to Rishfy</h1>
      <p className="text-muted-foreground text-center text-sm mb-8">Lets get started with our wonderful journey</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Phone number</label>
          <input
            type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
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
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Confirm password</label>
          <input
            type={showPass ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <button
        disabled={!phone || !email || !password || password !== confirm}
        onClick={() => (onDone ? onDone() : onNavigate("role-selection"))}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base mt-8 disabled:opacity-60"
      >
        SignUp
      </button>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <button onClick={() => onNavigate("login")} className="text-primary font-medium">Login</button>
      </p>
    </div>
  );
};

export default SignUpScreen;

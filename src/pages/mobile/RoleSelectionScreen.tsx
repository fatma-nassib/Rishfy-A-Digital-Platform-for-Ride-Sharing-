import React, { useMemo, useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { CarFront, Users } from "lucide-react";

interface Props {
  onNavigate: (s: Screen) => void;
  onSelectRole: (role: "driver" | "passenger") => void;
  intent?: "signup" | "login";
  onContinue?: (role: "driver" | "passenger") => void;
}

const RoleSelectionScreen: React.FC<Props> = ({ onSelectRole, onNavigate, intent = "signup", onContinue }) => {
  const [selected, setSelected] = useState<"driver" | "passenger" | null>(null);

  const canContinue = useMemo(() => Boolean(selected), [selected]);

  return (
    <div className="pt-16 px-6 animate-fade-in">
      <h1 className="text-xl font-bold text-foreground">How will you use Rishfy?</h1>
      <p className="text-muted-foreground text-sm mt-1 mb-8">Please choose your role to get started</p>

      <div className="space-y-4">
        <button
          type="button"
          onClick={() => {
            setSelected("driver");
            onSelectRole("driver");
          }}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors text-left ${
            selected === "driver" ? "border-primary bg-primary/5" : "border-input hover:border-primary"
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
            <CarFront size={24} className="text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">I'm a driver</p>
            <p className="text-sm text-muted-foreground">Share your route earn money on every trip</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelected("passenger");
            onSelectRole("passenger");
          }}
          className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors text-left ${
            selected === "passenger" ? "border-primary bg-primary/5" : "border-input hover:border-primary"
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
            <Users size={24} className="text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">I'm a Passenger</p>
            <p className="text-sm text-muted-foreground">Find affordable rides to your destination</p>
          </div>
        </button>
      </div>

      <button
        type="button"
        disabled={!canContinue}
        onClick={() => {
          if (!selected) return;
          if (onContinue) onContinue(selected);
          else onNavigate(intent);
        }}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base mt-10 disabled:opacity-60"
      >
        Continue
      </button>
    </div>
  );
};

export default RoleSelectionScreen;

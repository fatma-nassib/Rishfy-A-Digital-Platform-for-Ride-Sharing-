import React, { useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, CarFront, CheckCircle2 } from "lucide-react";

interface Props {
  onNavigate: (s: Screen) => void;
}

const VehicleRegistrationScreen: React.FC<Props> = ({ onNavigate }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [seats, setSeats] = useState(4);
  const [docs, setDocs] = useState({
    license: false,
    insurance: false,
    registration: false,
  });

  const canContinue = make && model && plate && year && color;
  const allDocs = docs.license && docs.insurance && docs.registration;

  const toggleDoc = (key: keyof typeof docs) => {
    setDocs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="pt-12 px-5 animate-fade-in">
      <button onClick={() => (step === 1 ? onNavigate("driver-home") : setStep(1))} className="mb-4">
        <ArrowLeft size={20} className="text-foreground" />
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <CarFront className="text-primary" size={22} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">Vehicle registration</h1>
          <p className="text-xs text-muted-foreground">
            Step {step} of 2 • {step === 1 ? "Vehicle details" : "Upload documents"}
          </p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full ${
              step >= s ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {step === 1 ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Make</label>
              <input
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="Toyota"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Model</label>
              <input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Corolla"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <label className="block text-xs font-medium text-muted-foreground mb-1">Registration plate</label>
          <input
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            placeholder="T 234 CAZ"
            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Year</label>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2020"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Colour</label>
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Silver"
                className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="mt-1">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Passenger capacity</p>
            <div className="flex gap-2">
              {[2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSeats(n)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold border ${
                    seats === n
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-input"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={!canContinue}
            onClick={() => setStep(2)}
            className="w-full mt-4 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-60"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Upload clear photos or scans of the required documents. All must be valid and in your
            name.
          </p>

          {[
            { key: "license" as const, label: "Driver licence", helper: "Front and back" },
            { key: "insurance" as const, label: "Insurance certificate", helper: "Comprehensive or third-party" },
            { key: "registration" as const, label: "Vehicle registration", helper: "TRA registration card" },
          ].map((doc) => {
            const active = docs[doc.key];
            return (
              <button
                key={doc.key}
                type="button"
                onClick={() => toggleDoc(doc.key)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl border text-left ${
                  active ? "border-primary bg-primary/5" : "border-input bg-background"
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{doc.label}</p>
                  <p className="text-[11px] text-muted-foreground">{doc.helper}</p>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center border ${
                    active ? "bg-primary border-primary" : "border-input bg-background"
                  }`}
                >
                  {active && <CheckCircle2 size={16} className="text-primary-foreground" />}
                </div>
              </button>
            );
          })}

          <p className="text-[11px] text-muted-foreground">
            Verification usually takes less than 24 hours. You will receive a notification once your
            vehicle is approved.
          </p>

          <button
            type="button"
            disabled={!allDocs}
            onClick={() => onNavigate("driver-home")}
            className="w-full mt-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-60"
          >
            Submit for review
          </button>
        </div>
      )}
    </div>
  );
};

export default VehicleRegistrationScreen;


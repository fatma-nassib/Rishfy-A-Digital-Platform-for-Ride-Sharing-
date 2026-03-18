import React, { useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, Smartphone, WalletCards, BadgeCheck, Loader2 } from "lucide-react";
import { useTrip } from "@/context/trip";

interface Props {
  onNavigate: (s: Screen) => void;
}

type Method = "mpesa" | "airtel" | "tigopesa" | "cash";

const methods: { id: Method; label: string; description: string; Icon: React.ElementType }[] = [
  { id: "mpesa", label: "M-Pesa", description: "Vodacom Tanzania", Icon: Smartphone },
  { id: "airtel", label: "Airtel Money", description: "Airtel Tanzania", Icon: Smartphone },
  { id: "tigopesa", label: "Tigo Pesa", description: "MIC Tanzania", Icon: Smartphone },
  { id: "cash", label: "Cash on trip", description: "Pay driver directly", Icon: WalletCards },
];

const PaymentScreen: React.FC<Props> = ({ onNavigate }) => {
  const { trip, startSearching } = useTrip();
  const [method, setMethod] = useState<Method>("mpesa");
  const [phone, setPhone] = useState("+255 ");
  const [isPaying, setIsPaying] = useState(false);
  const [done, setDone] = useState(false);

  const handlePay = () => {
    if (isPaying) return;
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setDone(true);
      startSearching();
      setTimeout(() => onNavigate("ride-searching"), 900);
    }, 1500);
  };

  if (done) {
    return (
      <div className="pt-20 px-6 animate-fade-in flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <BadgeCheck className="text-primary" size={32} />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-1">Payment confirmed</h1>
        <p className="text-sm text-muted-foreground mb-4">Your seat is booked. Driver details are on the next screen.</p>
      </div>
    );
  }

  return (
    <div className="pt-12 px-5 animate-fade-in">
      <button onClick={() => onNavigate("booking-confirm")} className="mb-4">
        <ArrowLeft size={20} className="text-foreground" />
      </button>

      <h1 className="text-xl font-bold text-foreground mb-2">Payment</h1>
      <p className="text-sm text-muted-foreground mb-4">Finish payment to confirm your booking.</p>

      <div className="bg-primary rounded-2xl p-4 text-center text-primary-foreground mb-6">
        <p className="text-xs font-medium tracking-wide mb-1">AMOUNT TO PAY</p>
        <p className="text-3xl font-extrabold mb-1">
          TZS {trip.selectedDriver ? trip.selectedDriver.priceTzs * trip.requestedSeats : 0}
        </p>
        <p className="text-[11px] text-primary-foreground/80">
          {trip.search.from || "Pickup"} to {trip.search.to || "Destination"} • {trip.requestedSeats} seat
        </p>
      </div>

      <p className="text-xs font-semibold text-muted-foreground mb-3">Choose payment method</p>

      <div className="space-y-2 mb-5">
        {methods.map(({ id, label, description, Icon }) => {
          const active = method === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setMethod(id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl border text-left transition-colors ${
                active
                  ? "border-primary bg-primary/5"
                  : "border-input bg-background hover:bg-muted"
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="text-primary" size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-[11px] text-muted-foreground">{description}</p>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  active ? "border-primary bg-primary" : "border-border"
                }`}
              />
            </button>
          );
        })}
      </div>

      {method !== "cash" && (
        <div className="mb-6">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Mobile number
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+255 7XX XXX XXX"
            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-[11px] text-muted-foreground mt-1.5">
            You will receive a confirmation prompt on your phone.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handlePay}
        disabled={isPaying}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isPaying && <Loader2 size={18} className="animate-spin" />}
        {isPaying ? "Processing..." : "Pay now"}
      </button>
    </div>
  );
};

export default PaymentScreen;


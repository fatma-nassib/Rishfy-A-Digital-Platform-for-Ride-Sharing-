import React, { useMemo, useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, Bell, CheckCircle2, CreditCard, ShieldAlert, Star } from "lucide-react";
import { useTrip } from "@/context/trip";

interface Props {
  onNavigate: (s: Screen) => void;
}

type Notif = {
  id: number;
  title: string;
  body: string;
  time: string;
  read: boolean;
  kind: "booking" | "trip" | "payment" | "safety" | "rating";
  action?: () => void;
};

const iconFor = (kind: Notif["kind"]) => {
  if (kind === "booking") return CheckCircle2;
  if (kind === "trip") return Bell;
  if (kind === "payment") return CreditCard;
  if (kind === "safety") return ShieldAlert;
  return Star;
};

const NotificationsScreen: React.FC<Props> = ({ onNavigate }) => {
  const { trip } = useTrip();
  const [items, setItems] = useState<Notif[]>([
    {
      id: 1,
      kind: "booking",
      title: "Booking confirmed",
      body: "Your request is confirmed. Track the driver from the trip screen.",
      time: "2 min ago",
      read: false,
      action: () => onNavigate("passenger-tracking"),
    },
    {
      id: 2,
      kind: "payment",
      title: "Payment received",
      body: `Reference ${trip.reference} • Your seat is booked.`,
      time: "12 min ago",
      read: false,
      action: () => onNavigate("receipt"),
    },
    {
      id: 3,
      kind: "safety",
      title: "Safety reminder",
      body: `Share your pickup PIN (${trip.tripPin}) only when the driver arrives.`,
      time: "1 h ago",
      read: true,
      action: () => onNavigate("emergency-contacts"),
    },
  ]);

  const unread = useMemo(() => items.filter((n) => !n.read).length, [items]);

  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div className="pt-12 px-5 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <button type="button" onClick={() => onNavigate("profile")}>
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">Notifications</h1>
          <p className="text-xs text-muted-foreground">{unread > 0 ? `${unread} unread` : "All caught up"}</p>
        </div>
        {unread > 0 && (
          <button type="button" onClick={markAll} className="text-xs font-semibold text-primary">
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {items.map((n) => {
          const Icon = iconFor(n.kind);
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => {
                setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
                n.action?.();
              }}
              className={`w-full text-left rounded-2xl border p-4 transition-colors ${
                n.read ? "bg-background border-border" : "bg-primary/5 border-primary/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${n.read ? "bg-muted" : "bg-primary/10"}`}>
                  <Icon size={18} className={n.read ? "text-muted-foreground" : "text-primary"} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-bold text-foreground">{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-primary mt-1" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.body}</p>
                  <p className="text-[11px] text-muted-foreground mt-2">{n.time}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsScreen;


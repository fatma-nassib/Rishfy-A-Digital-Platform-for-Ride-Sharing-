import React from "react";
import type { Screen } from "@/components/MobileApp";
import { ArrowLeft, FileText, MapPin, Clock, CarFront, BadgeCheck } from "lucide-react";

interface Props {
  onNavigate: (s: Screen) => void;
}

const TripReceiptScreen: React.FC<Props> = ({ onNavigate }) => {
  const reference = "TXN-2026-4521";

  return (
    <div className="pt-12 px-5 animate-fade-in">
      <button onClick={() => onNavigate("rides-history")} className="mb-4">
        <ArrowLeft size={20} className="text-foreground" />
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <FileText className="text-primary" size={22} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">Trip receipt</h1>
          <p className="text-xs text-muted-foreground">Digital summary of your completed trip.</p>
        </div>
      </div>

      <div className="rounded-xl border border-input mb-4 overflow-hidden">
        <div className="px-4 py-3 bg-muted flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Reference
            </p>
            <p className="text-xs font-semibold text-foreground">{reference}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
            <BadgeCheck size={12} />
            Paid
          </span>
        </div>

        <div className="px-4 py-3 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Trip</span>
            <span className="flex items-center gap-1 text-foreground font-medium">
              Kimara
              <MapPin size={12} className="text-muted-foreground" />
              Kariakoo
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Date</span>
            <span className="text-foreground font-medium">Feb 22, 2026</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Time</span>
            <span className="flex items-center gap-1 text-foreground font-medium">
              <Clock size={12} className="text-muted-foreground" />
              07:00AM – 07:35AM
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Driver</span>
            <span className="text-foreground font-medium">Khadija Omary</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Vehicle</span>
            <span className="flex items-center gap-1 text-foreground font-medium">
              <CarFront size={12} className="text-muted-foreground" />
              Toyota Corolla • T34 CAZ
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Seats</span>
            <span className="text-foreground font-medium">1</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2 mt-1">
            <span className="text-muted-foreground">Fare</span>
            <span className="text-foreground font-medium">TZS 5000</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Platform fee (5%)</span>
            <span className="text-foreground font-medium">TZS 250</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-xs font-semibold text-foreground">Total paid</span>
            <span className="text-base font-extrabold text-primary">TZS 5250</span>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground mb-4">
        This trip was recorded under the LATRA ride-sharing framework. Trip data may be used for
        regulatory reporting.
      </p>

      <button
        type="button"
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm mb-2"
        onClick={() => onNavigate("rating")}
      >
        Rate driver
      </button>
      <button
        type="button"
        className="w-full py-3 rounded-xl border border-input text-foreground font-medium text-sm"
        onClick={() => onNavigate("rides-history")}
      >
        Back to history
      </button>
    </div>
  );
};

export default TripReceiptScreen;


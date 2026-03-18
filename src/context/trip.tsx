import React, { createContext, useContext, useMemo, useState } from "react";

export type RideStatus =
  | "idle"
  | "searching"
  | "matched"
  | "arriving"
  | "in_trip"
  | "completed"
  | "cancelled";

export type RideIntent = "rides" | "schedule";

export interface PassengerSearch {
  from: string;
  to: string;
  intent: RideIntent;
  dateLabel: string; // "Today" | "Tomorrow" | ...
  time: string; // "HH:mm"
}

export interface DriverOption {
  id: string;
  name: string;
  rating: number;
  car: string;
  plate: string;
  seatsAvailable: number;
  priceTzs: number;
  etaMin: number;
  verified: boolean;
}

export interface TripData {
  search: PassengerSearch;
  selectedDriver: DriverOption | null;
  requestedSeats: number;
  status: RideStatus;
  tripPin: string;
  reference: string;
}

type TripContextValue = {
  trip: TripData;
  setSearch: (next: Partial<PassengerSearch>) => void;
  selectDriver: (d: DriverOption) => void;
  setRequestedSeats: (n: number) => void;
  startSearching: () => void;
  markMatched: () => void;
  markArriving: () => void;
  startTrip: () => void;
  completeTrip: () => void;
  cancelTrip: () => void;
  reset: () => void;
};

const TripContext = createContext<TripContextValue | null>(null);

const randPin = () => String(Math.floor(1000 + Math.random() * 9000));
const randRef = () => `TXN-2026-${Math.floor(1000 + Math.random() * 9000)}`;

const defaultTrip = (): TripData => ({
  search: {
    from: "",
    to: "",
    intent: "rides",
    dateLabel: "Today",
    time: "07:00",
  },
  selectedDriver: null,
  requestedSeats: 1,
  status: "idle",
  tripPin: randPin(),
  reference: randRef(),
});

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trip, setTrip] = useState<TripData>(() => defaultTrip());

  const api = useMemo<TripContextValue>(() => {
    return {
      trip,
      setSearch: (next) =>
        setTrip((prev) => ({
          ...prev,
          search: { ...prev.search, ...next },
        })),
      selectDriver: (d) => setTrip((prev) => ({ ...prev, selectedDriver: d })),
      setRequestedSeats: (n) => setTrip((prev) => ({ ...prev, requestedSeats: n })),
      startSearching: () =>
        setTrip((prev) => ({
          ...prev,
          status: "searching",
          tripPin: prev.tripPin || randPin(),
          reference: prev.reference || randRef(),
        })),
      markMatched: () => setTrip((prev) => ({ ...prev, status: "matched" })),
      markArriving: () => setTrip((prev) => ({ ...prev, status: "arriving" })),
      startTrip: () => setTrip((prev) => ({ ...prev, status: "in_trip" })),
      completeTrip: () => setTrip((prev) => ({ ...prev, status: "completed" })),
      cancelTrip: () => setTrip((prev) => ({ ...prev, status: "cancelled" })),
      reset: () => setTrip(defaultTrip()),
    };
  }, [trip]);

  return <TripContext.Provider value={api}>{children}</TripContext.Provider>;
};

export const useTrip = () => {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used within TripProvider");
  return ctx;
};


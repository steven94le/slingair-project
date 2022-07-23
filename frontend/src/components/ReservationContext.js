import React, { useState, createContext } from "react";

export const ReservationContext = createContext(null);

export const ReservationProvider = ({ children }) => {
  const [reservation, setReservation] = useState("");

  return (
    <ReservationContext.Provider value={{ reservation, setReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

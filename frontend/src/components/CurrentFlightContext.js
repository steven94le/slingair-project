import React, { useState, createContext } from "react";

export const CurrentFlightContext = createContext(null);

export const CurrentFlightProvider = ({ children }) => {
  const [currentFlight, setCurrentFlight] = useState("");

  return (
    <CurrentFlightContext.Provider value={{ currentFlight, setCurrentFlight }}>
      {children}
    </CurrentFlightContext.Provider>
  );
};

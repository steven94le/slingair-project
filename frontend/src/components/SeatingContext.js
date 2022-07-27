import React, { useState, createContext } from "react";

export const SeatingContext = createContext(null);

export const SeatingProvider = ({ children }) => {
  const [seating, setSeating] = useState("");

  return (
    <SeatingContext.Provider value={{ seating, setSeating }}>
      {children}
    </SeatingContext.Provider>
  );
};

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { CurrentFlightProvider } from "./components/CurrentFlightContext";
import { ReservationProvider } from "./components/ReservationContext";

ReactDOM.render(
  <React.StrictMode>
    <ReservationProvider>
      <CurrentFlightProvider>
        <App />
      </CurrentFlightProvider>
    </ReservationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

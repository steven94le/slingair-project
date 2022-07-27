import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { CurrentFlightProvider } from "./components/CurrentFlightContext";
import { SeatingProvider } from "./components/SeatingContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentFlightProvider>
      <SeatingProvider>
        <App />
      </SeatingProvider>
    </CurrentFlightProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { CurrentFlightProvider } from "./components/CurrentFlightContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentFlightProvider>
      <App />
    </CurrentFlightProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

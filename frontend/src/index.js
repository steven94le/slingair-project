import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { CurrentFlightProvider } from "./components/CurrentFlightContext";
import { SeatingProvider } from "./components/SeatingContext";
import { FormProvider } from "./components/FormContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentFlightProvider>
      <SeatingProvider>
        <FormProvider>
          <App />
        </FormProvider>
      </SeatingProvider>
    </CurrentFlightProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

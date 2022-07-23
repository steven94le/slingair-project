import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { CurrentFlightContext } from "./CurrentFlightContext";

const FlightSelect = ({ handleFormChange }) => {
  const [flights, setFlights] = useState([]);
  const { setCurrentFlight } = useContext(CurrentFlightContext);
  const handleSelectFlight = (e) => {
    setCurrentFlight(e.target.value);
    handleFormChange(e.target.value, "flight");
  };

  useEffect(() => {
    fetch("/api/get-flights")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFlights(data.data);
      });
  }, []);

  return (
    <Wrapper>
      <h2>Flight Number :</h2>

      <form>
        <select onChange={(e) => handleSelectFlight(e)}>
          <option value="">Choose your flight</option>
          {flights && flights.length > 0
            ? flights.map((elem, index) => {
                return (
                  <option key={`flight-${index + 1}`}>{elem.flight}</option>
                );
              })
            : null}
        </select>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  color: white;
  background: var(--color-cadmium-red);
  font-family: var(--font-heading);
  height: 80px;
  padding: var(--padding-page) 18px;
`;

export default FlightSelect;
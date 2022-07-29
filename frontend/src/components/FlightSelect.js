import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { CurrentFlightContext } from "./CurrentFlightContext";
import { SeatingContext } from "./SeatingContext";
import { FormContext } from "./FormContext";

const API_GET_FLIGHTS = "/api/get-flights";
const API_GET_FLIGHT = "/api/get-flight/";

const FlightSelect = () => {
  const { handleFormChange } = useContext(FormContext);
  const { currentFlight, setCurrentFlight } = useContext(CurrentFlightContext);
  const { setSeating } = useContext(SeatingContext);
  const [flights, setFlights] = useState([]);
  const [flightsPending, setFlightsPending] = useState("");
  const isMounted = useRef(false);

  const handleSelectFlight = (ev) => {
    setCurrentFlight(ev.target.value);
    handleFormChange(ev.target.value, "flight");
  };

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await fetch(API_GET_FLIGHTS);
        const data = await res.json();

        if (!res.ok) {
          setFlightsPending("error");
          throw Error(`${res.status} ${res.statusText}`);
        }
        setFlightsPending("received");
        setFlights(data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFlights();
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const fetchFlight = async () => {
        try {
          const res = await fetch(API_GET_FLIGHT + currentFlight);
          const data = await res.json();

          if (!res.ok) {
            throw Error(`${res.status} ${res.statusText}`);
          }
          setSeating(data?.data?.seats);
        } catch (err) {
          console.log(err);
        }
      };
      fetchFlight();
    } else {
      isMounted.current = true;
    }
  }, [currentFlight, setSeating]);

  return (
    <Wrapper>
      <h2>Flight Number :</h2>
      <StyledForm>
        <select onChange={handleSelectFlight}>
          <option value="">Choose your flight</option>
          {flightsPending === "received" ? (
            <>
              {flights && flights.length > 0
                ? flights.map((flight, index) => {
                    return (
                      <option key={`flight-${index + 1}`} value={flight.flight}>
                        {flight.flight}
                      </option>
                    );
                  })
                : null}
            </>
          ) : null}
        </select>
      </StyledForm>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  color: white;
  background: var(--color-cadmium-red);
  font-family: var(--font-heading);
  padding-left: 25px;
`;

const StyledForm = styled.form`
  margin: 8px 8px 8px 20px;
`;

export default FlightSelect;

import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { CurrentFlightContext } from "./CurrentFlightContext";

const FlightSelect = ({ handleFormChange }) => {
  const { setCurrentFlight } = useContext(CurrentFlightContext);
  const [flights, setFlights] = useState([]);
  const [flightsPending, setFlightsPending] = useState("");

  const handleSelectFlight = (e) => {
    setCurrentFlight(e.target.value);
    handleFormChange(e.target.value, "flight");
  };

  useEffect(() => {
    let isMounted = true;

    const fetchFlights = async () => {
      try {
        const fetchFlightsResponse = await fetch("/api/get-flights");
        const data = await fetchFlightsResponse.json();

        if (isMounted) {
          if (data.status === 200) {
            setFlightsPending("received");
            setFlights(data?.data);
          } else if (data.status !== 200) {
            setFlightsPending("error");
          }
        }
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchFlights();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Wrapper>
      <h2>Flight Number :</h2>
      <StyledForm>
        <select onChange={(e) => handleSelectFlight(e)}>
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

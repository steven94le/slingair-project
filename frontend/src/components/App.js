import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import GlobalStyles from "./GlobalStyles";
import FlightSelect from "./FlightSelect";
import Reservation from "./Reservation";
import { ReservationContext } from "./ReservationContext";

const App = () => {
  const reservationId = window.localStorage.getItem("reservationId");
  const { reservation, setReservation } = useContext(ReservationContext);

  const [formData, setFormData] = useState({
    flight: "",
    seat: "",
    givenName: "",
    surname: "",
    email: "",
  });

  const handleFormChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const fetchReservationResponse = await fetch(
          `/api/get-reservation/${reservationId}`
        );
        const data = await fetchReservationResponse.json();
        setReservation(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReservation();
  }, [reservationId, setReservation]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header reservationId={reservationId} />
      <Main>
        <Switch>
          <Route exact path="/">
            <FlightSelect handleFormChange={handleFormChange} />
            <SeatSelect
              formData={formData}
              handleFormChange={handleFormChange}
              reservationId={reservationId}
            />
          </Route>
          <Route exact path="/confirmed">
            <Confirmation reservation={reservation} />
          </Route>
          <Route exact path="/reservation">
            <Reservation reservation={reservation} />
          </Route>
          <Route path="/error">404: Oops!</Route>
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: var(--color-orange);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;

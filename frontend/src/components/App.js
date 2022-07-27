import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import GlobalStyles from "./GlobalStyles";
import FlightSelect from "./FlightSelect";
import Reservation from "./Reservation";

const reservationIdFromLocalStorage =
  window.localStorage.getItem("reservationId") || "";

const App = () => {
  const [reservationId, setReservationId] = useState(
    reservationIdFromLocalStorage
  );

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
    window.localStorage.setItem("reservationId", reservationId);
  }, [reservationId]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header reservationId={reservationId} setFormData={setFormData} />
      <Main>
        <Switch>
          <Route exact path="/">
            <FlightSelect handleFormChange={handleFormChange} />
            <SeatSelect
              formData={formData}
              handleFormChange={handleFormChange}
              setReservationId={setReservationId}
            />
          </Route>
          <Route exact path="/confirmed">
            <Confirmation reservationId={reservationId} formData={formData} />
          </Route>
          <Route exact path="/reservation">
            <Reservation
              reservationId={reservationId}
              setReservationId={setReservationId}
              setFormData={setFormData}
            />
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

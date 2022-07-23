import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import GlobalStyles from "./GlobalStyles";
import FlightSelect from "./FlightSelect";
import React, { useState, useEffect, useContext } from "react";
import Reservation from "./Reservation";

import { ReservationContext } from "./ReservationContext";

const App = () => {
  const reservationId = window.localStorage.getItem("reservationId");
  const { setReservation } = useContext(ReservationContext);

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
    fetch(`/api/get-reservation/${reservationId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReservation(data.data);
      });
  }, [reservationId, setReservation]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <FlightSelect handleFormChange={handleFormChange} />
            <SeatSelect
              formData={formData}
              handleFormChange={handleFormChange}
            />
          </Route>
          <Route exact path="/confirmed">
            <Confirmation />
          </Route>
          <Route exact path="/reservation">
            <Reservation />
          </Route>
          <Route path="">404: Oops!</Route>
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

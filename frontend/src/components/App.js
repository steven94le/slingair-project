import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import GlobalStyles from "./GlobalStyles";
import FlightSelect from "./FlightSelect";
import React, { useState } from "react";

const App = () => {
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

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <FlightSelect handleFormChange={handleFormChange} />
      <Main>
        <Switch>
          <Route exact path="/">
            <SeatSelect
              formData={formData}
              handleFormChange={handleFormChange}
            />
          </Route>
          <Route exact path="/confirmed">
            <Confirmation />
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

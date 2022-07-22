import Plane from "./Plane";
import styled from "styled-components";
import React, { useState } from "react";

import { Redirect } from "react-router-dom";

const SeatSelect = ({ formData, handleFormChange }) => {
  const [reservation, setReservation] = useState("");

  const handleFormSubmit = (ev) => {
    ev.preventDefault();

    fetch("/api/add-reservation", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data", data.data);
        setReservation(data.data);
      });
  };

  return (
    <>
      <h2>Select your seat and Provide your information!</h2>
      <Wrapper>
        <Plane handleFormChange={handleFormChange} />
        <StyledForm>
          <input
            type="text"
            name="givenName"
            placeholder="First Name"
            onChange={(e) => handleFormChange(e.target.value, "givenName")}
          />
          <input
            type="text"
            name="surname"
            placeholder="Last Name"
            onChange={(e) => handleFormChange(e.target.value, "surname")}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => handleFormChange(e.target.value, "email")}
          />
          <StyledButton type="submit" onClick={handleFormSubmit}>
            Confirm
          </StyledButton>
          {reservation ? <Redirect to="/confirmed" /> : null}
        </StyledForm>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledButton = styled.button`
  background-color: darkorange;
  color: white;
  font-family: var(--font-heading);
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export default SeatSelect;

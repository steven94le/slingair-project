import Plane from "./Plane";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import { ReservationContext } from "../ReservationContext";

const SeatSelect = ({ formData, handleFormChange }) => {
  const history = useHistory();
  const { setReservation } = useContext(ReservationContext);
  const [disabled, setDisabled] = useState(true);

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
        setReservation(data?.data);
        window.localStorage.setItem("reservationId", data?.data.id);
      });

    history.push("/confirmed");
  };

  useEffect(() => {
    Object.values(formData).includes("")
      ? setDisabled(true)
      : setDisabled(false);
  }, [formData, setDisabled]);

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

          <StyledButton
            type="submit"
            onClick={handleFormSubmit}
            disabled={disabled}
          >
            Confirm
          </StyledButton>
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
  height: 250px;
  padding: 5px 25px;
  border: 2px var(--color-alabama-crimson) solid;
  margin-top: 150px;
`;

const StyledButton = styled.button`
  background-color: var(--color-alabama-crimson);
  color: white;
  font-family: var(--font-heading);
  border: none;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default SeatSelect;

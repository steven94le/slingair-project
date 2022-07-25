import Plane from "./Plane";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../ReservationContext";

const SeatSelect = ({ formData, handleFormChange }) => {
  const { setReservation } = useContext(ReservationContext);
  const [disabled, setDisabled] = useState(true);
  const [formStatusPending, setFormStatusPending] = useState("");
  const [formError, setFormError] = useState("");

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    const settings = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const addReservationResponse = await fetch(
        "/api/add-reservation",
        settings
      );
      const data = await addReservationResponse.json();

      if (data.status === 200) {
        setFormStatusPending("confirmed");
        setReservation(data?.data);
        window.localStorage.setItem("reservationId", data?.data.id);
      } else if (data.status !== 200) {
        setFormStatusPending("error");
        setFormError(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Object.values(formData).includes("")
      ? setDisabled(true)
      : setDisabled(false);
  }, [formData, setDisabled]);

  return (
    <>
      {formStatusPending !== "confirmed" ? (
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
              {formStatusPending === "error" && (
                <ErrorMsg>{formError}</ErrorMsg>
              )}
            </StyledForm>
          </Wrapper>
        </>
      ) : (
        <Redirect to="/confirmed" />
      )}
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

const ErrorMsg = styled.div`
  color: red;
  padding-top: 10px;
  text-align: center;
  font-family: var(--font-body);
`;

export default SeatSelect;

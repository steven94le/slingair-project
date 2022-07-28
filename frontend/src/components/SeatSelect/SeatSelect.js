import Plane from "./Plane";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";

const SeatSelect = ({ formData, handleFormChange, setReservationId }) => {
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
      const res = await fetch("/api/add-reservation", settings);
      const data = await res.json();

      if (!res.ok) {
        setFormStatusPending("error");
        setFormError(data.error);
        throw Error(`${res.status} ${res.statusText}`);
      }
      setFormStatusPending("confirmed");
      setReservationId(data?.data?.id);
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
          <StyledHeader>
            Select your seat and Provide your information!
          </StyledHeader>
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

const StyledHeader = styled.h2`
  margin: 10px 0 -10px 0;
`;

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
  color: var(--color-cadmium-red);
  padding-top: 10px;
  text-align: center;
  font-family: var(--font-body);
`;

export default SeatSelect;

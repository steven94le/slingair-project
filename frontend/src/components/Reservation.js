import styled from "styled-components";
import tombstone from "../assets/tombstone.png";
import React, { useContext } from "react";

import { ReservationContext } from "./ReservationContext";

const Reservation = () => {
  const { reservation } = useContext(ReservationContext);

  return (
    <Wrapper>
      <StyledBooking>
        <div>Your reservation:</div>
        <div>Reservation #: {reservation.id}</div>
        <div>Flight #: {reservation.flight}</div>
        <div>Seat #: {reservation.seat}</div>
        <div>
          Name: {reservation.givenName} {reservation.surname}
        </div>
        <div>Email: {reservation.email}</div>
      </StyledBooking>
      <img src={tombstone} height="50%" width="20%" alt="tombstone" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledBooking = styled.div`
  font-family: var(--font-body);
  border: 2px var(--color-alabama-crimson) solid;
  width: 50%;
  height: 50%;
  margin: 50px 0 50px 0;
`;

export default Reservation;

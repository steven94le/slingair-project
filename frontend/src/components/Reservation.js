import styled from "styled-components";
import tombstone from "../assets/tombstone.png";
import React, { useState, useEffect } from "react";
import Loading from "./Loading";

const Reservation = ({ reservationId }) => {
  const [reservation, setReservation] = useState("");
  const [reservationPending, setReservaitonPending] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchReservation = async () => {
      try {
        const fetchReservationResponse = await fetch(
          `/api/get-reservation/${reservationId}`
        );
        const data = await fetchReservationResponse.json();

        if (isMounted) {
          if (data.status === 200) {
            setReservaitonPending("loaded");
            setReservation(data?.data);
          } else if (data.status !== 200) {
            setReservaitonPending("loading");
          }
        }
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchReservation();

    return () => {
      isMounted = false;
    };
  }, [reservationId, setReservation]);

  return (
    <>
      {reservationPending === "loaded" ? (
        <Wrapper>
          <StyledBooking>
            <StyledHeader>Your reservation:</StyledHeader>
            <hr />
            <div>
              <StyledField>Reservation #:</StyledField> {reservationId}
            </div>
            <div>
              <StyledField>Flight #:</StyledField> {reservation.flight}
            </div>
            <div>
              <StyledField>Seat #:</StyledField> {reservation.seat}
            </div>
            <div>
              <StyledField>Name:</StyledField> {reservation.givenName}{" "}
              {reservation.surname}
            </div>
            <div>
              <StyledField>Email:</StyledField> {reservation.email}
            </div>
          </StyledBooking>
          <img src={tombstone} height="50%" width="20%" alt="tombstone" />
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
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
  margin: 50px 0 25px 0;
  padding: 20px;

  div:not(:first-child):not(:last-child) {
    margin-bottom: 25px;
  }
`;

const StyledHeader = styled.div`
  color: var(--color-alabama-crimson);
  font-size: 20px;
`;

const StyledField = styled.span`
  font-weight: bolder;
`;

export default Reservation;

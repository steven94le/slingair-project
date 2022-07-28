import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "./Loading";

const Admin = () => {
  const [reservations, setReseravtions] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch("/api/get-reservations");
        const data = await res.json();

        if (!res.ok) {
          throw Error(`${res.status} ${res.statusText}`);
        }
        setReseravtions(data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReservations();
  }, []);

  return (
    <Wrapper>
      {reservations && reservations.length > 0 ? (
        reservations.map((reservation, index) => (
          <StyledBooking key={index + 1}>
            <div>
              <StyledField>Reservation #:</StyledField> {reservation.id}
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
        ))
      ) : (
        <Loading />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 25px 10px;
`;

const StyledBooking = styled.div`
  font-family: var(--font-body);
  border: 2px var(--color-alabama-crimson) solid;
  width: 20%;
  padding: 10px;
  margin: 18px;
  font-size: 18px;

  div:not(:first-child) {
    margin-bottom: 20px;
  }
`;

const StyledField = styled.span`
  font-weight: bolder;
  color: var(--color-alabama-crimson);
`;

export default Admin;

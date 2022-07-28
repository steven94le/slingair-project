import styled from "styled-components";
import tombstone from "../assets/tombstone.png";
import React, { useState, useEffect, useContext } from "react";
import Loading from "./Loading";
import { Redirect } from "react-router-dom";
import { CurrentFlightContext } from "./CurrentFlightContext";
import { SeatingContext } from "./SeatingContext";

const Reservation = ({
  reservationId,
  setReservationId,
  setFormData,
  initialForm,
}) => {
  const { setCurrentFlight } = useContext(CurrentFlightContext);
  const { setSeating } = useContext(SeatingContext);
  const [reservation, setReservation] = useState("");
  const [reservationStatus, setReservationStatus] = useState("");

  const handleDeleteReservation = async (ev) => {
    ev.preventDefault();

    try {
      const res = await fetch(`/api/delete-reservation/${reservationId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      setFormData(initialForm);
      setCurrentFlight("");
      setSeating("");
      setReservation("");
      setReservationId("");
      setReservationStatus("deleted");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let isMounted = false;
    const fetchReservation = async () => {
      try {
        const res = await fetch(`/api/get-reservation/${reservationId}`);
        const data = await res.json();
        if (!isMounted) {
          if (!res.ok) {
            setReservationStatus("loading");
            throw Error(`${res.status} ${res.statusText}`);
          }
          setReservationStatus("loaded");
          setReservation(data?.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchReservation();

    return () => {
      isMounted = true;
    };
  }, [reservationId, setReservation]);

  return (
    <>
      {reservationStatus === "loaded" ? (
        <Wrapper>
          <StyledBooking>
            <StyledHeader>
              Your reservation:
              <CancelButton onClick={handleDeleteReservation}>X</CancelButton>
            </StyledHeader>
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
            <div></div>
          </StyledBooking>
          <img src={tombstone} height="30%" width="20%" alt="tombstone" />
        </Wrapper>
      ) : (
        <Loading />
      )}
      {reservationStatus === "deleted" && <Redirect to="/" />}
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
  width: 40%;
  height: 50%;
  margin-bottom: 20px;
  padding: 25px;

  div:not(:first-child) {
    margin-bottom: 20px;
  }
`;

const StyledHeader = styled.div`
  color: var(--color-alabama-crimson);
  font-size: 20px;
  font-weight: bolder;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledField = styled.span`
  font-weight: bolder;
  color: var(--color-alabama-crimson);
`;

const CancelButton = styled.button`
  background: var(--color-alabama-crimson);
  color: var(--color-selective-yellow);
  border-color: var(--color-selective-yellow);
  border: 1px solid transparent;
  border-radius: 4px;
  font-family: var(--font-heading);
  font-size: 18px;
  height: 26px;
  text-decoration: none;
  transition: all ease 400ms;

  &:hover {
    background: var(--color-selective-yellow);
    color: var(--color-alabama-crimson);
    border-color: var(--color-alabama-crimson);
    cursor: pointer;
  }
`;

export default Reservation;

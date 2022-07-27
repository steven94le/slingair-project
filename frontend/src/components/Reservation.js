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
      const deleteRes = await fetch(
        `/api/delete-reservation/${reservationId}`,
        {
          method: "DELETE",
        }
      );

      if (deleteRes.ok) {
        setFormData(initialForm);
        setCurrentFlight("");
        setSeating("");
        setReservation("");
        setReservationId("");
        setReservationStatus("deleted");
        console.log("Delete request successful");
      } else {
        console.log("Delete request unsuccessful");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

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
            setReservationStatus("loaded");
            setReservation(data?.data);
          } else if (data.status !== 200) {
            setReservationStatus("loading");
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
      {reservationStatus === "loaded" ? (
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
            <div>
              <CancelButton onClick={handleDeleteReservation}>
                Cancel Reservation
              </CancelButton>
            </div>
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
  margin-bottom: 25px;
  padding: 20px;

  div:not(:first-child) {
    margin-bottom: 20px;
  }
`;

const StyledHeader = styled.div`
  color: var(--color-alabama-crimson);
  font-size: 20px;
  font-weight: bolder;
`;

const StyledField = styled.span`
  font-weight: bolder;
  color: var(--color-alabama-crimson);
`;

const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 100%;

  &:hover {
    background: var(--color-selective-yellow);
    color: var(--color-alabama-crimson);
    border-color: var(--color-alabama-crimson);
    cursor: pointer;
  }
`;

export default Reservation;

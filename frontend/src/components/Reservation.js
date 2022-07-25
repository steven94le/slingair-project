import styled from "styled-components";
import tombstone from "../assets/tombstone.png";

const Reservation = ({ reservation }) => {
  return (
    <>
      <Wrapper>
        <StyledBooking>
          <StyledHeader>Your reservation:</StyledHeader>
          <hr />
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
        <img src={tombstone} height="50%" width="20%" alt="tombstone" />
      </Wrapper>
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
  margin: 50px 0 50px 0;
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

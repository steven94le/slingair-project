import styled from "styled-components";
import tombstone from "../assets/tombstone.png";

const Confirmation = ({ reservationId, formData }) => {
  return (
    <Wrapper>
      <StyledBooking>
        <StyledHeader>Your flight is confirmed!</StyledHeader>
        <hr />
        <div>
          <StyledField>Reservation #:</StyledField> {reservationId}
        </div>
        <div>
          <StyledField>Flight #:</StyledField> {formData.flight}
        </div>
        <div>
          <StyledField>Seat #:</StyledField> {formData.seat}
        </div>
        <div>
          <StyledField>Name:</StyledField> {formData.givenName}{" "}
          {formData.surname}
        </div>
        <div>
          <StyledField>Email:</StyledField> {formData.email}
        </div>
      </StyledBooking>
      <img src={tombstone} height="40%" width="20%" alt="tombstone" />
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

export default Confirmation;

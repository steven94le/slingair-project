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
      <img src={tombstone} height="30%" width="20%" alt="tombstone" />
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

export default Confirmation;

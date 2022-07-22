import styled from "styled-components";

import tombstone from "../assets/tombstone.png";

const Confirmation = () => {
  return (
    <Wrapper>
      <StyledBooking>
        <div>Your flight is confirmed!</div>
        <div>Reservation #: </div>
        <div>Flight #: </div>
        <div>Seat #: </div>
        <div>Name: </div>
        <div>Email: </div>
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

export default Confirmation;

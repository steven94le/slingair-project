import Plane from "./Plane";
import styled from "styled-components";

const SeatSelect = () => {
  return (
    <>
      <h2>Select your seat and Provide your information!</h2>
      <Wrapper>
        <Plane />
        <StyledForm>
          <input type="text" name="givenName" placeholder="First Name" />
          <input type="text" name="surname" placeholder="Last Name" />
          <input type="text" name="email" placeholder="Email" />
          <StyledButton type>Confirm</StyledButton>
        </StyledForm>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledButton = styled.button`
  background-color: darkorange;
  color: white;
  font-family: var(--font-heading);
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export default SeatSelect;

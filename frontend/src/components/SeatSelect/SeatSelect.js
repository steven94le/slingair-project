import Plane from "./Plane";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const SeatSelect = ({ formData, handleFormChange }) => {
  const history = useHistory();

  const handleFormSubmit = () => {
    fetch("/api/add-reservation", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    history.push("/confirmed");
  };

  return (
    <>
      <h2>Select your seat and Provide your information!</h2>
      <Wrapper>
        <Plane handleFormChange={handleFormChange} />
        <StyledForm>
          <input
            type="text"
            name="givenName"
            placeholder="First Name"
            onChange={(e) => handleFormChange(e.target.value, "givenName")}
          />
          <input
            type="text"
            name="surname"
            placeholder="Last Name"
            onChange={(e) => handleFormChange(e.target.value, "surname")}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => handleFormChange(e.target.value, "email")}
          />
          <StyledButton type="button" onClick={handleFormSubmit}>
            Confirm
          </StyledButton>
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

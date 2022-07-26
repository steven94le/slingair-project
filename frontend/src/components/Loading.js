import styled from "styled-components";
import slingairLogo from "../assets/air-sling.png";

const Loading = () => (
  <Wrapper>
    <Logo src={slingairLogo} />
    <Text>Loading...</Text>
    <Logo src={slingairLogo} />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  margin: auto auto 24px;
  height: 60px;
`;
const Logo = styled.img`
  height: 100%;
`;

const Text = styled.p`
  color: var(--color-alabama-crimson);
  font-family: var(--font-heading);
  font-size: 36px;
  text-align: center;
  margin: 12px 0 0 24px;
`;

export default Loading;

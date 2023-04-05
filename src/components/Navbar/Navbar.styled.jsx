import styled from "styled-components";

const SCNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 632px;

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

export default SCNavbar;

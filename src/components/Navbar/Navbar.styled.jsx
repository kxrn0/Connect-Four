import styled from "styled-components";

const SCNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 632px;
  position: relative;

  img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  @media screen and (max-width: 500px) {
    width: 100%;

    img {
      width: 40px;
      height: 40px;
    }

    button {
      width: 108px;
    }
  }
`;

export default SCNavbar;

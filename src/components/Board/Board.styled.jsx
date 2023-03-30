import styled from "styled-components";

const SCBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 10px;

  span {
    color: azure;
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    border-radius: 100%;
    position: relative;

    &.empty {
      background: rebeccapurple;
    }

    &.red {
      background: red;
    }

    &.yellow {
      background: #dddd08;
      color: blueviolet;
    }

    &.winner::after {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border: 5px solid azure;
      top: 50%;
      left: 50%;
      border-radius: 100%;
      transform: translate(-50%, -50%);
    }
  }
`;

export default SCBoard;

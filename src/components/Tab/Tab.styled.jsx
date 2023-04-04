import styled from "styled-components";
import redTurn from "../../assets/images/turn-background-red.svg";
import yellowTurn from "../../assets/images/turn-background-yellow.svg";

const SCTab = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  z-index: 1;

  .red,
  .yellow {
    background-size: cover;
    width: 197px;
    height: 165px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .red {
    background-image: url(${redTurn});
    color: white;
  }

  .yellow {
    background-image: url(${yellowTurn});
  }

  h1 {
    display: flex;

    .digit {
      width: 33px;
      display: block;
      text-align: center;
    }
  }

  .win {
    background: white;
    border-radius: 20px;
    width: 285px;
    height: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default SCTab;

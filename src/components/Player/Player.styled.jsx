import styled from "styled-components";
import playerOne from "../../assets/images/player-one.svg";
import playerTwo from "../../assets/images/player-two.svg";
import human from "../../assets/images/you.svg";
import ai from "../../assets/images/cpu.svg";

const SCPlayer = styled.div`
  background: white;
  width: 140px;
  height: 160px;
  display: flex;
  flex-direction: column;
  padding-top: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: relative;

  .pic {
    width: 54px;
    height: 59px;
    display: block;
    position: absolute;
    bottom: 100%;
    transform: translateY(24px);
  }

  &.ai {
    &:first-child {
      .pic {
        background-image: url(${human});
      }
    }

    &:last-child {
      .pic {
        background-image: url(${ai});
      }
    }
  }

  &.player {
    &:first-child {
      .pic {
        background-image: url(${playerOne});
      }
    }

    &:last-child {
      .pic {
        background-image: url(${playerTwo});
      }
    }
  }

  @media screen and (max-width: 1200px) {
    flex-direction: row;
    padding: 0;
    width: 270px;
    height: 100px;
    gap: 20px;

    .pic {
      bottom: 20px;
    }

    h1 {
      min-width: 100px;
      text-align: center;
    }

    &:first-child {
      padding-left: 45px;

      .pic {
        left: 0;
        transform: translateX(-50%);
      }
    }

    &:last-child {
      padding-right: 44px;
      /* background: red; */

      .pic {
        right: 0;
        transform: translateX(50%);
      }

      h1 {
        order: -1;
      }
    }
  }
`;

export default SCPlayer;

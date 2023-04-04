import styled from "styled-components";
import ai from "../../assets/images/player-vs-cpu.svg";
import player from "../../assets/images/player-vs-player.svg";

const SCStart = styled.div`
  background: var(--blue);
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  padding: 70px 40px;
  padding-bottom: 60px;

  .logo {
    width: 52px;
    height: 52px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .imagined {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 17px;
    padding-left: 20px;

    &.ai {
      background: var(--pink);

      .image {
        background-image: url(${ai});
      }
    }

    &.player {
      background: var(--yellow);

      .image {
        background-image: url(${player});
      }
    }

    .start {
      background: white;
    }

    .image {
      width: 82px;
      height: 46px;
    }
  }

  @media screen and (max-width: 500px) {
    background: transparent;
    width: 100vw;
    border: none;
    box-shadow: none;
    padding: 20px;

    .buttons {
      width: 100%;
    }
  }
`;

export default SCStart;

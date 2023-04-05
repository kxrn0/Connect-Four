import styled from "styled-components";

const SCGame = styled.div`
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    border-radius: 60px 60px 0 0;

    &.neutral {
      background: var(--purple);
    }

    &.red {
      background: var(--pink);
    }

    &.yellow {
      background: var(--yellow);
    }

    @media screen and (max-width: 500px) {
      height: 235px;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    margin-bottom: 100px;

    @media screen and (max-width: 1000px) {
      margin-bottom: 185px;
    }

    @media screen and (max-width: 500px) {
      margin-bottom: 150px;
    }
  }

  .game-bits {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: auto;
    gap: 60px;
    align-items: center;
  }

  .board-container {
    position: relative;
  }

  @media screen and (max-width: 1000px) {
    .game-bits {
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
      justify-content: center;
      column-gap: 40px;
      row-gap: 32px;

      .player:first-child {
        justify-self: end;
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }

      .player:last-child {
        justify-self: start;
        grid-column: 2 / 3;
        grid-row: 1 / 2;
      }

      .board-container {
        grid-column: 1 / 3;
        grid-row: 2 / 3;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .game-bits {
      column-gap: 20px;
      row-gap: 50px;
    }
  }
`;

export default SCGame;

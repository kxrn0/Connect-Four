import styled from "styled-components";

const SCGame = styled.div`
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
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
    margin-bottom: 160px;
  }

  @media screen and (max-width: 1000px) {
    .game-bits {
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
      justify-content: center;
      column-gap: 40px;
      row-gap: 32px;

      .player:first-child {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }

      .player:last-child {
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

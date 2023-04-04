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
      /* column-gap: 10px; */
      /* row-gap: 100px; */

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
`;

export default SCGame;

import styled from "styled-components";

const SCPause = styled.div`
  background: var(--blue);
  border-radius: 40px;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 44px;

  h1 {
    color: white;
  }

  .buttons-container {
    display: flex;
    flex-direction: column;
    gap: 30px;

    button {
      background: white;
      color: black;

      :last-child {
        color: white;
        background: var(--pink);
      }
    }
  }

  @media screen and (max-width: 500px) {
    padding: 30px 20px;
    padding-bottom: 30px;
    gap: 30px;

    .buttong {
      text-align: center;
    }
  }
`;

export default SCPause;

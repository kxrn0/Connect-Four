import styled from "styled-components";

const SCRules = styled.div`
  background: white;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 30px 34px;
  padding-bottom: 54px;
  position: relative;

  div {
    width: 412px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .heading-s {
      color: var(--blue);
    }

    .body {
      mix-blend-mode: normal;
      opacity: 0.66;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 11px;

      li {
        display: flex;
        gap: 20px;
      }
    }

    @media screen and (max-width: 500px) {
      width: 295px;
    }
  }

  button {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 75px;
    border-radius: 100%;
    border: none;

    @media (hover: hover) {
      &:hover {
        svg {
          circle {
            transition: fill 0.33s;
          }
        }
      }

      &:hover {
        svg {
          circle:not(:last-of-type) {
            fill: var(--purple);
          }
        }
      }
    }
  }
`;

export default SCRules;

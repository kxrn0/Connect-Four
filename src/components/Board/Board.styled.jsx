import styled from "styled-components";
import redLarge from "../../assets/images/counter-red-large.svg";
import yellowLarge from "../../assets/images/counter-yellow-large.svg";
import redSmall from "../../assets/images/counter-red-small.svg";
import yellowSmall from "../../assets/images/counter-yellow-small.svg";

const SCBoard = styled.div`
  --max-width: 500px;
  --x: 0;
  --y: 0;
  --diameter: 64px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 24px;
  padding: 20px;
  position: relative;

  .layer {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;

    &.top {
      z-index: 1;
    }
  }

  span {
    background-size: cover;
    width: var(--diameter);
    height: var(--diameter);
    display: grid;
    place-items: center;
    border-radius: 100%;
    position: relative;

    &.empty {
      background: transparent;
    }

    &.red,
    &.yellow {
      /* 
        ---anime---
      */
      animation: fade-in 0.3s forwards;
    }

    &.red {
      background-image: url(${redLarge});

      @media screen and (max-width: var(--max-width)) {
        background-image: url(${redSmall});
      }
    }

    &.yellow {
      background-image: url(${yellowLarge});

      @media screen and (max-width: var(--max-width)) {
        background-image: url(${yellowSmall});
      }
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

    &.marker {
      background: transparent;
      width: 38px;
      height: 36px;
      position: absolute;
      bottom: calc(100% + 2px);
      left: calc(var(--diameter) / 2 - 19px);
      opacity: 0;
      transition: transform 0.33s, opacity 0.33s;

      &.red {
        svg {
          #main-path {
            fill: var(--pink);
          }
        }
      }

      &.yellow {
        svg {
          #main-path {
            fill: var(--yellow);
          }
        }
      }
    }

    &.counter {
      position: absolute;
      top: calc(- var(--diameter));
      left: 0;
      opacity: 0;

      &.red {
        background-image: url(${redLarge});

        @media screen and (max-width: var(--max-width)) {
          background-image: url(${redSmall});
        }
      }

      &.yellow {
        background-image: url(${yellowLarge});

        @media screen and (max-width: var(--max-width)) {
          background-image: url(${yellowSmall});
        }
      }

      &.active {
        opacity: 1;
        /* 
          ---anime---
        */
        animation: anime 0.33s forwards;
      }

      @keyframes anime {
        from {
          transform: translate(var(--x), 0);
        }

        to {
          transform: translate(var(--x), var(--y));
        }
      }
    }

    &.lock {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 0;
      z-index: 1;
    }

    @keyframes fade-in {
      from {
        background: transparent;
      }

      99% {
        background: transparent;
      }

      to {
        background: auto;
      }
    }

    @media (hover: hover) {
      &:hover ~ .marker {
        opacity: 1;
      }
    }
  }
`;

export default SCBoard;

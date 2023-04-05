import SCBoard from "./Board.styled";
import check_for_win from "../../utilities/win";
import get_empty from "../../utilities/empty_index";
import ai from "../../utilities/ai";
import random from "../../utilities/random";
import { ReactComponent as Marker } from "../../assets/images/marker.svg";
import { useEffect, useRef, useState } from "react";

export default function Board({ turn, change_turn, locked, mode, set_tie }) {
  const width = 7;
  const height = 6;
  const [state, setState] = useState(new Array(width * height).fill("empty"));
  const [active, sestActive] = useState(false);
  const [selfLocked, setSelfLocked] = useState(false);
  const markerRef = useRef(null);
  const counterColor = locked ? turn : turn === "red" ? "yellow" : "red";

  function handle_change(index, state, turn) {
    const emptyIndex = get_empty(index, state, width, height);
    let updated, win;

    if (emptyIndex !== undefined) {
      move_counter(emptyIndex);

      updated = state.map((item, itemIndex) =>
        itemIndex === emptyIndex ? turn : item
      );
      win = check_for_win(updated, width, height, 4, "empty");

      if (win)
        updated = updated.map((item, itemIndex) =>
          win.some((cell) => cell.x + cell.y * width === itemIndex)
            ? `${item} winner`
            : item
        );

      setState(updated);
      change_turn(win ? turn : null);

      if (!win && updated.every((item) => item !== "empty")) set_tie();
    }
  }

  function handle_click(event) {
    const index = Number(event.target.dataset.index);

    handle_change(index, state, turn);
  }

  function move_marker(event) {
    if (!window.matchMedia("(hover: hover)".match)) return;

    const span = event.target;
    const parent = span.parentElement;
    const spanBox = span.getBoundingClientRect();
    const parentBox = parent.getBoundingClientRect();
    const offset = spanBox.left - parentBox.left;

    markerRef.current.style.transform = `translateX(${offset}px)`;
  }

  function move_counter(index) {
    const span = document.querySelector(`[data-index='${index}']`);
    const parent = span.parentElement;
    const spanBox = span.getBoundingClientRect();
    const parentBox = parent.getBoundingClientRect();
    const xOffset = spanBox.left - parentBox.left;
    const yOffset = spanBox.top - parentBox.top;

    sestActive(true);
    setSelfLocked(true);
    setTimeout(() => {
      sestActive(false);
      setSelfLocked(false);
    }, 330);

    parent.style.setProperty("--x", `${xOffset}px`);
    parent.style.setProperty("--y", `${yOffset}px`);
  }

  useEffect(() => {
    if (turn === "yellow" && mode === "ai") {
      const index = ai(state);
      const time = random(500, 1000);
      const id = setTimeout(() => {
        handle_change(index, state, turn);
      }, time);

      setSelfLocked(true);

      return () => clearTimeout(id);
    }
  }, [turn]);

  return (
    <SCBoard>
      <img
        className="layer"
        srcSet="/Connect-Four/board-layer-black-large.svg 632w, /Connect-Four/board-layer-black-small.svg 335w"
        sizes="(max-width: 500px) 335px, 632px"
        src="/Connect-Four/board-layer-black-small.svg"
        alt="board layer"
      />
      {state.map((item, index) => (
        <span
          key={index}
          className={item}
          data-index={index}
          onClick={locked ? null : handle_click}
          onMouseEnter={move_marker}
        ></span>
      ))}
      <img
        className="layer top"
        srcSet="/Connect-Four/board-layer-white-large.svg 632w, /Connect-Four/board-layer-white-small.svg 335w"
        sizes="(max-width: 500px) 335px, 632px"
        src="/Connect-Four/board-layer-black-small.svg"
        alt="board layer"
      />
      <span ref={markerRef} className={`marker ${turn}`}>
        <Marker />
      </span>
      <span
        className={`counter ${active ? "active" : ""} ${counterColor}`}
      ></span>
      {selfLocked ? <span className="lock"></span> : null}
    </SCBoard>
  );
}

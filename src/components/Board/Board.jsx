import SCBoard from "./Board.styled";
import check_for_win from "../../utilities/win";
import get_empty from "../../utilities/empty_index";
import ai from "../../utilities/ai";
import { useEffect, useRef, useState } from "react";
import random from "../../utilities/random";

export default function Board({ turn, change_turn, locked, mode }) {
  const width = 7;
  const height = 6;
  const [state, setState] = useState(new Array(width * height).fill("empty"));
  const [active, sestActive] = useState(false);
  const [selfLocked, setSelfLocked] = useState(false);
  const markerRef = useRef(null);

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
    }
  }

  function handle_click(event) {
    const index = Number(event.target.dataset.index);

    handle_change(index, state, turn);
  }

  function move_marker(event) {
    if (window.innerWidth < 900) return;

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
    setTimeout(() => sestActive(false), 330);

    parent.style.setProperty("--x", `${xOffset}px`);
    parent.style.setProperty("--y", `${yOffset}px`);
  }

  useEffect(() => {
    if (turn === "yellow" && mode === "ai") {
      const index = ai(state);
      const time = random(1000, 5000);
      const id = setTimeout(() => {
        handle_change(index, state, turn);
        setSelfLocked(false);
      }, time);

      setSelfLocked(true);

      return () => clearTimeout(id);
    }
  }, [turn]);

  return (
    <SCBoard>
      {selfLocked ? <div className="byme"></div> : null}
      {state.map((item, index) => (
        <span
          key={index}
          className={item}
          data-index={index}
          onClick={locked || selfLocked ? null : handle_click}
          onMouseEnter={move_marker}
        ></span>
      ))}
      <span ref={markerRef} className="marker"></span>
      <span
        className={`counter ${active ? "active" : ""} ${
          turn === "red" ? "yellow" : "red"
        }`}
      ></span>
    </SCBoard>
  );
}

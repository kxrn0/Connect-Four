import SCBoard from "./Board.styled";
import check_for_win from "../../utilities/win";
import get_empty from "../../utilities/empty_index";
import ai from "../../utilities/ai";
import random from "../../utilities/random";
import { useRef, useState } from "react";

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
      move_counter(empty);

      updated = state.map((item, itemIndex) =>
        itemIndex === emptyIndex ? turn : item
      );
      win = check_for_win(updated, width, height, 4, "empty");

      if (win)
        updated = updated.map((item, itemIndex) =>
          win.some((cell) =>
            cell.x + cell.y * width === itemIndex ? `${item} winner` : item
          )
        );

      setState(updated);
      change_turn(win ? turn : null);
    }
  }

  function handle_click(event) {
    const index = Number(event.target.dataset.index);
    const empty = get_empty(index, state, width, height);
    let updated, win;

    if (empty !== undefined) {
      move_counter(empty);
      updated = state.map((item, itemIndex) =>
        itemIndex === empty ? turn : item
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

      // console.log(`mode: ${mode}, turn: ${turn}`);

      // if (mode === "ai" && turn === "red") {
      //   const aiMove = ai(updated);
      //   const aiCell = get_empty(aiMove, updated, width, height);
      //   const timeout = random(1000, 2000);

      //   setSelfLocked(true);

      //   setTimeout(() => {
      //     updated = updated.map((item, itemIndex) =>
      //       itemIndex === aiCell ? "yellow" : item
      //     );
      //     win = check_for_win(updated, width, height, 4, "empty");

      //     if (win)
      //       updated = updated.map((item, itemIndex) =>
      //         win.some((cell) => cell.x + cell.y * width === itemIndex)
      //           ? `${item} winner`
      //           : item
      //       );

      //     move_counter(aiCell);

      //     setSelfLocked(false);
      //     setState(updated);
      //     change_turn(win ? "yellow" : null);
      //   }, timeout);
      // }
    }
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

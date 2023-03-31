import SCBoard from "./Board.styled";
import check_for_win from "../../utilities/win";
import get_empty from "../../utilities/empty_index";
import { useRef, useState } from "react";

export default function Board({ turn, change_turn, locked }) {
  const width = 7;
  const height = 6;
  const [state, setState] = useState(new Array(width * height).fill("empty"));
  const markerRef = useRef(null);

  function handle_click(event) {
    const index = Number(event.target.dataset.index);
    const empty = get_empty(index, state, width, height);
    let updated, win;

    if (empty !== undefined) {
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

  return (
    <SCBoard>
      {state.map((item, index) => (
        <span
          key={index}
          className={item}
          data-index={index}
          onClick={locked ? null : handle_click}
          onMouseEnter={move_marker}
        ></span>
      ))}
      <span ref={markerRef} className="marker"></span>
    </SCBoard>
  );
}

import SCRules from "./Rules.styled";
import { ReactComponent as Check } from "../../assets/images/icon-check.svg";

export default function Rules({ close }) {
  return (
    <SCRules className="bordered">
      <h1 className="heading-l">RULES</h1>
      <div>
        <h3 className="heading-s">OBJECTIVE</h3>
        <p className="body">
          Be the first player to connect 4 of the same colored discs in a row
          (either vertically, horizontally, or diagonally).
        </p>
      </div>
      <div>
        <h3 className="heading-s">HOW TO PLAY</h3>
        <ul>
          <li>
            <span className="heading-xs">1</span>
            <p className="body">Red goes first in the first game.</p>
          </li>
          <li>
            <span className="heading-xs">2</span>
            <p className="body">
              Players must alternate turns, and only one disc can be dropped in
              each turn.
            </p>
          </li>
          <li>
            <span className="heading-xs">3</span>
            <p className="body">
              The game ends when there is a 4-in-a-row or a stalemate.
            </p>
          </li>
          <li>
            <span className="heading-xs">4</span>
            <p className="body">
              The starter of the previous game goes second on the next game.
            </p>
          </li>
        </ul>
      </div>
      <button aria-label="close-rules" onClick={close}>
        <Check />
      </button>
    </SCRules>
  );
}

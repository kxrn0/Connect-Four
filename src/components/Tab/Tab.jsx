import SCTab from "./Tab.styled";

export default function Tab({ gameOver, tie, turn, timeLeft, new_game, mode }) {
  const currentTurn =
    mode === "ai"
      ? turn === "red"
        ? "YOUR TURN"
        : "CPU'S TURN"
      : turn === "red"
      ? "PLAYER 1's TURN"
      : "PLAYER 2'S TURN ";
  const winner =
    mode === "ai"
      ? turn === "red"
        ? "YOU"
        : "CPU"
      : turn === "red"
      ? "PLAYER 1"
      : "PLAYER 2";
  const win = mode === "ai" && turn === "red" ? "WIN" : "WINS";

  return (
    <SCTab>
      {gameOver ? (
        <div className="win bordered">
          <p className="heading-xs">{tie ? "NOBODY WINS!" : winner}</p>
          <h1 className="heading-l">{tie ? "TIE" : win}</h1>
          <button className="heading-xs game-button" onClick={new_game}>
            PLAY AGAIN
          </button>
        </div>
      ) : (
        <div className={`${turn}`}>
          <p className="heading-xs">{currentTurn}</p>
          <h1 className="heading-l">
            {String(timeLeft)
              .split("")
              .map((n, i) => (
                <span key={i} className="digit">
                  {n}
                </span>
              ))}
            <span className="digit">s</span>
          </h1>
        </div>
      )}
    </SCTab>
  );
}

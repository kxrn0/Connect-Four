import SCTab from "./Tab.styled";

export default function Tab({ gameOver, tie, turn, timeLeft, new_game }) {
  return (
    <SCTab>
      {gameOver ? (
        <div className="win">
          <p className="heading-xs">{tie ? "NOBODY WINS!" : turn}</p>
          <h1 className="heading-l">{tie ? "TIE" : "WINS"}</h1>
          <button className="heading-xs" onClick={new_game}>
            PLAY AGAIN
          </button>
        </div>
      ) : (
        <div className="turn">
          <p className="heading-xs">{turn}'s turn</p>
          <h1 className="heading-l">{timeLeft}s</h1>
        </div>
      )}
    </SCTab>
  );
}

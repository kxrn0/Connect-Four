import SCTab from "./Tab.styled";

export default function Tab({ state }) {
  return (
    <SCTab>
      {state.gameOver ? (
        <div className="win">
          <p className="heading-xs">{state.turn}</p>
          <h1 className="heading-l">WINS</h1>
          <button
            className="heading-xs"
            onClick={() => console.log("play again")}
          >
            PLAY AGAIN
          </button>
        </div>
      ) : (
        <div className="turn">
          <p className="heading-xs">{state.turn}'s turn</p>
          <h1 className="heading-l">{state.timeLeft}s</h1>
        </div>
      )}
    </SCTab>
  );
}

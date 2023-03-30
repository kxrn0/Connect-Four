import SCPause from "./Pause.styled";

export default function Pause({ continue_game, restart_game, quit_game }) {
  return (
    <SCPause>
      <h1 className="heading-l">PAUSE</h1>
      <button className="heading-m" onClick={continue_game}>
        CONTINUE GAME
      </button>
      <button className="heading-m" onClick={restart_game}>
        RESTART
      </button>
      <button className="heading-m" onClick={quit_game}>
        QUIT GAME
      </button>
    </SCPause>
  );
}
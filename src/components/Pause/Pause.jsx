import SCPause from "./Pause.styled";

export default function Pause({ resume_game, restart_game, quit_game }) {
  return (
    <SCPause className="bordered">
      <h1 className="heading-l">PAUSE</h1>
      <div className="buttons-container">
        <button className="buttong bordered heading-m" onClick={resume_game}>
          CONTINUE GAME
        </button>
        <button className="buttong bordered heading-m" onClick={restart_game}>
          RESTART
        </button>
        <button className="buttong bordered heading-m" onClick={quit_game}>
          QUIT GAME
        </button>
      </div>
    </SCPause>
  );
}

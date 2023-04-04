import SCStart from "./Start.styled";
import logo from "../../assets/images/logo.svg";

export default function Start({ show_rules, set_game }) {
  return (
    <SCStart className="bordered">
      <img src={logo} className="logo" alt="company logo" />
      <div className="buttons">
        <button
          className="buttong bordered heading-m imagined ai"
          onClick={() => set_game("ai")}
        >
          <span>PLAY VS CPU</span>
          <span className="image"></span>
        </button>
        <button
          className="buttong bordered heading-m imagined player"
          onClick={() => set_game("player")}
        >
          <span>PLAY VS PLAYER</span>
          <span className="image"></span>
        </button>
        <button
          className="buttong bordered heading-m start"
          onClick={show_rules}
        >
          GAME RULES
        </button>
      </div>
    </SCStart>
  );
}

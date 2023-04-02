import SCStart from "./Start.styled";
import logo from "../../assets/images/logo.svg";

export default function Start({ show_rules, set_game }) {
  return (
    <SCStart>
      <img src={logo} alt="company logo" />
      <button className="button heading-m" onClick={() => set_game("ai")}>
        PLAY VS CPU
      </button>
      <button className="button heading-m" onClick={() => set_game("player")}>
        PLAY VS PLAYER
      </button>
      <button className="button heading-m" onClick={show_rules}>
        GAME RULES
      </button>
    </SCStart>
  );
}

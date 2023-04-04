import SCNavbar from "./Navbar.styled";
import logo from "../../assets/images/logo.svg";

export default function Navbar({ pause_game, restart_game, locked }) {
  return (
    <SCNavbar>
      <button
        className="heading-xs game-button"
        onClick={pause_game}
        disabled={locked}
      >
        MENU
      </button>
      <img src={logo} alt="company logo" />
      <button
        className="heading-xs game-button"
        onClick={restart_game}
        disabled={locked}
      >
        RESTART
      </button>
    </SCNavbar>
  );
}

import SCNavbar from "./Navbar.styled";
import logo from "../../assets/images/logo.svg";

export default function Nabvar({ pause_game, restart_game }) {
  return (
    <SCNavbar>
      <button onClick={pause_game}>MENU</button>
      <img src={logo} alt="company logo" />
      <button onClick={restart_game}>RESTART</button>
    </SCNavbar>
  );
}

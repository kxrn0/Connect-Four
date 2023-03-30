import Start from "../Start/Start";
import Dialog from "../Dialog/Dialog";
import Rules from "../Rules/Rules";
import Pause from "../Pause/Pause";
import Navbar from "../Navbar/Navbar";
import Player from "../Player/Player";
import Board from "../Board/Board";
import Tab from "../Tab/Tab";
import SCGame from "./Game.styled";
import { useState } from "react";

export default function Game() {
  const TURN_TIME = 5;

  const [start, setStart] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [paused, setPaused] = useState(false);
  const [redPlayer, setRedPlayer] = useState(null);
  const [yellowPlayer, setYellowPlayer] = useState(null);

  const [games, setGames] = useState(0);
  const [turn, setTurn] = useState(!(games % 2) ? "red" : "yellow");
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TURN_TIME);
  const [intervalId, setintervalId] = useState(null);

  function new_game() {
    setTurn(() => (!((games + 1) % 2) ? "red" : "yellows"));
    setGames((prevGames) => prevGames + 1);
  }

  function set_game(mode) {
    console.log(mode);
    setStart(false);
    setRedPlayer({ name: mode === "player" ? "player 1" : "you", score: 0 });
    setYellowPlayer({ name: mode === "player" ? "player 2" : "cpu", score: 0 });
    intervene();
  }

  function continue_game() {
    console.log("continue");
    setPaused(false);
  }

  function restart_game() {
    console.log("restart");
  }

  function quit_game() {
    console.log("quit");
  }

  function pause_game() {
    console.log("paused");
    setPaused(true);
  }

  function intervene() {
    setTimeLeft(TURN_TIME);
    setintervalId(
      setInterval(() => {
        console.log(`in interval ${Math.random()}`);
        // if (timeLeft < 0) change_turn(null);
        // else setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        setTimeLeft((prevTime) => {
          console.log(`time: ${prevTime}`);

          // if (prevTime < 0) return prevTime - 1;
          if (prevTime < 0) {
            // setTurn((prevTurn) => (prevTurn === "red" ? "yellow" : "red"));
            // return TURN_TIME;
            // intervene();
            change_turn(null);
          }

          // return TURN_TIME;
          return prevTime - 1;
        });
      }, 1000)
    );
  }

  function change_turn(winner) {
    clearInterval(intervalId);
    if (winner) {
      setGameOver(true);
      if (winner === "red")
        setRedPlayer((prevState) => ({
          ...prevState,
          score: prevState.score + 1,
        }));
    } else {
      setTurn((prevTurn) => (prevTurn === "red" ? "yellow" : "red"));
      intervene();
    }
  }

  return (
    <SCGame>
      <Dialog
        shown={start || paused}
        close={!start ? () => setPaused(false) : null}
        tint={start}
      >
        {start ? (
          <Start show_rules={() => setShowRules(true)} set_game={set_game} />
        ) : (
          <Pause
            continue_game={continue_game}
            restart_game={restart_game}
            quit_game={quit_game}
          />
        )}
      </Dialog>

      {!start ? (
        <main>
          <Navbar pause_game={pause_game} restart_game={restart_game} />
          <section>
            <Player name={redPlayer.name} score={redPlayer.score} />
            <Board turn={turn} change_turn={change_turn} locked={gameOver} />
            <Player name={yellowPlayer.name} score={yellowPlayer.score} />
            <Tab state={{ gameOver, turn, timeLeft }} />
          </section>
        </main>
      ) : (
        <p>Game is being set up, please wait warmly</p>
      )}

      <Dialog shown={showRules} close={() => setShowRules(false)} tint={true}>
        <Rules close={() => setShowRules(false)} />
      </Dialog>
    </SCGame>
  );
}

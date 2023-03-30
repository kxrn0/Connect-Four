import Start from "../Start/Start";
import Dialog from "../Dialog/Dialog";
import Rules from "../Rules/Rules";
import Pause from "../Pause/Pause";
import Nabvar from "../Navbar/Navbar";
import Player from "../Player/Player";
import Board from "../Board/Board";
import SCGame from "./Game.styled";
import { useState } from "react";

export default function Game() {
  const [start, setStart] = useState(true);
  const [showRules, setShowRules] = useState(false);
  // const [gameOn, setGameOn] = useState(false);
  const [paused, setPaused] = useState(false);
  const [redPlayer, setRedPlayer] = useState(null);
  const [yellowPlayer, setYellowPlayer] = useState(null);

  const [games, setGames] = useState(0);
  const [turn, setTurn] = useState(!(games % 2) ? "red" : "yellow");
  const [gameOver, setGameOver] = useState(false);

  function new_game() {
    setTurn(() => (!((games + 1) % 2) ? "red" : "yellows"));
    setGames((prevGames) => prevGames + 1);
  }

  function set_game(mode) {
    console.log(mode);
    setStart(false);
    // setGameOn(true);
    setRedPlayer({ name: "byme", score: 0 });
    setYellowPlayer({ name: "anon", score: 0 });
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

  function change_turn(winner) {
    if (winner) setGameOver(true);
    else setTurn((prevTurn) => (prevTurn === "red" ? "yellow" : "red"));
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
          <Nabvar pause_game={pause_game} restart_game={restart_game} />
          <section>
            <Player name={redPlayer.name} score={redPlayer.score} />
            <Board turn={turn} change_turn={change_turn} locked={gameOver} />
            <Player name={yellowPlayer.name} score={yellowPlayer.score} />
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

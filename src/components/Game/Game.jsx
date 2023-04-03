import Start from "../Start/Start";
import Dialog from "../Dialog/Dialog";
import Rules from "../Rules/Rules";
import Pause from "../Pause/Pause";
import Navbar from "../Navbar/Navbar";
import Player from "../Player/Player";
import Board from "../Board/Board";
import Tab from "../Tab/Tab";
import SCGame from "./Game.styled";
import { useState, useRef } from "react";

export default function Game() {
  const TURN_TIME = 30;
  const YELLOW = "yellow";
  const RED = "red";
  const AI = "ai";
  const PLAYER = "player";

  const [start, setStart] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [paused, setPaused] = useState(false);
  const [redPlayer, setRedPlayer] = useState(null);
  const [yellowPlayer, setYellowPlayer] = useState(null);

  const [games, setGames] = useState(0);
  const [restarts, setRestarts] = useState(0);
  const [turn, setTurn] = useState(!(games % 2) ? RED : YELLOW);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TURN_TIME);
  const [prevWinner, setPrevWinner] = useState(null);
  const [mode, setMode] = useState("player");
  const intervalIdRef = useRef(null);
  const lockNavbar = mode === "ai" && turn === "yellow" && !gameOver;

  function new_game() {
    setTurn(() => (!((games + 1) % 2) ? RED : YELLOW));
    setGames((prevGames) => prevGames + 1);
    setGameOver(false);
    if (mode === "ai" && turn === "red") return;
    intervene(TURN_TIME);
  }

  function set_game(mode) {
    setMode(mode);
    setStart(false);
    setRedPlayer({ name: mode === PLAYER ? "player 1" : "you", score: 0 });
    setYellowPlayer({ name: mode === PLAYER ? "player 2" : "cpu", score: 0 });
    intervene(TURN_TIME);
  }

  function resume_game() {
    setPaused(false);
    if (!gameOver) intervene(timeLeft);
  }

  function restart_game() {
    if (gameOver && prevWinner) {
      if (prevWinner === "red")
        setRedPlayer((prevState) => ({
          ...prevState,
          score: prevState.score - 1,
        }));
      else
        setYellowPlayer((prevState) => ({
          ...prevState,
          score: prevState.score - 1,
        }));
    }

    clearInterval(intervalIdRef.current);
    setGameOver(false);
    setPaused(false);
    setTurn(() => (!(games % 2) ? RED : YELLOW));
    intervene(TURN_TIME);
    setRestarts((prevRestarts) => prevRestarts + 1);
  }

  function quit_game() {
    clearInterval(intervalIdRef.current);
    setGames(0);
    setGameOver(false);
    setPaused(false);
    setTimeout(() => {
      setStart(true);
    }, 330);
  }

  function pause_game() {
    clearInterval(intervalIdRef.current);
    setPaused(true);
  }

  function intervene(time) {
    setTimeLeft(time);
    intervalIdRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) change_turn(null);

        return prevTime - 1;
      });
    }, 1000);
  }

  function change_turn(winner) {
    clearInterval(intervalIdRef.current);
    if (winner) {
      setPrevWinner(winner);
      setGameOver(true);

      if (winner === RED)
        setRedPlayer((prevState) => ({
          ...prevState,
          score: prevState.score + 1,
        }));
      else
        setYellowPlayer((prevState) => ({
          ...prevState,
          score: prevState.score + 1,
        }));
    } else {
      setTurn((prevTurn) => (prevTurn === RED ? YELLOW : RED));
      intervene(TURN_TIME);
    }
  }

  return (
    <SCGame>
      <Dialog
        shown={start || paused}
        close={!start ? resume_game : null}
        tint={start}
      >
        {start ? (
          <Start show_rules={() => setShowRules(true)} set_game={set_game} />
        ) : (
          <Pause
            resume_game={resume_game}
            restart_game={restart_game}
            quit_game={quit_game}
          />
        )}
      </Dialog>
      {!start ? (
        <main>
          <Navbar
            pause_game={pause_game}
            restart_game={restart_game}
            locked={lockNavbar}
          />
          <section>
            <Player name={redPlayer.name} score={redPlayer.score} />
            <Board
              key={`${games}-${restarts}`}
              turn={turn}
              change_turn={change_turn}
              locked={gameOver}
              mode={mode}
            />
            <Player name={yellowPlayer.name} score={yellowPlayer.score} />
            <Tab
              gameOver={gameOver}
              turn={turn}
              timeLeft={timeLeft}
              new_game={new_game}
            />
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

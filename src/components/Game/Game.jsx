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
  const [start, setStart] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [paused, setPaused] = useState(false);
  const [redPlayer, setRedPlayer] = useState(null);
  const [yellowPlayer, setYellowPlayer] = useState(null);
  const [games, setGames] = useState(0);
  const [restarts, setRestarts] = useState(0);
  const [turn, setTurn] = useState(!(games % 2) ? "red" : "yellow");
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TURN_TIME);
  const [prevWinner, setPrevWinner] = useState(null);
  const [mode, setMode] = useState("player");
  const [tie, setTie] = useState(false);
  const intervalIdRef = useRef(null);
  const lockNavbar = mode === "ai" && turn === "yellow" && !gameOver;

  function new_game() {
    setTurn(() => (!((games + 1) % 2) ? "red" : "yellow"));
    setGames((prevGames) => prevGames + 1);
    setGameOver(false);
    setTie(false);
    if (mode === "ai" && turn === "red") return;
    intervene(TURN_TIME);
  }

  function set_game(mode) {
    setMode(mode);
    setStart(false);
    setGames(0);
    setTurn("red");
    setRedPlayer({ name: mode === "player" ? "PLAYER 1" : "YOU", score: 0 });
    setYellowPlayer({ name: mode === "player" ? "PLAYER 2" : "CPU", score: 0 });
    intervene(TURN_TIME);
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
    setTie(false);
    setTurn(() => (!(games % 2) ? "red" : "yellow"));
    setRestarts((prevRestarts) => prevRestarts + 1);
    intervene(TURN_TIME);
  }

  function quit_game() {
    clearInterval(intervalIdRef.current);
    setGames(0);
    setGameOver(false);
    setPaused(false);
    setTie(false);
    setTimeout(() => {
      setStart(true);
    }, 330);
  }

  function set_tie() {
    clearInterval(intervalIdRef.current);
    setGameOver(true);
    setTie(true);
  }

  function resume_game() {
    setPaused(false);
    if (!gameOver) intervene(timeLeft);
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

      if (winner === "red")
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
      setTurn((prevTurn) => (prevTurn === "red" ? "yellow" : "red"));
      intervene(TURN_TIME);
    }
  }

  return (
    <SCGame>
      <div className={`bottom ${gameOver ? turn : "neutral"}`}></div>
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
          <section className="game-bits">
            <Player name={redPlayer.name} score={redPlayer.score} mode={mode} />
            <div className="board-container">
              <Board
                key={`${games}-${restarts}`}
                turn={turn}
                change_turn={change_turn}
                locked={gameOver}
                mode={mode}
                set_tie={set_tie}
              />
              <Tab
                gameOver={gameOver}
                tie={tie}
                turn={turn}
                timeLeft={timeLeft}
                new_game={new_game}
                mode={mode}
              />
            </div>
            <Player
              name={yellowPlayer.name}
              score={yellowPlayer.score}
              mode={mode}
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

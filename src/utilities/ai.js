import random from "./random";

export default function ai(board) {
  while (true) {
    const index = random(0, board.length);

    if (board[index] === "empty") return index;
  }
}

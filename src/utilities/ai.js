export default function ai(board) {
  while (true) {
    const index = ~~(Math.random() * board.length);

    if (board[index] === "empty") return index;
  }
}

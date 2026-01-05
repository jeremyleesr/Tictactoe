let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const statusDisplay = document.getElementById('status');
const boardElement = document.getElementById('board');

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const cells = [];
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('click', () => handleCellClick(i));
  boardElement.appendChild(cell);
  cells.push(cell);
}

function handleCellClick(index) {
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusDisplay.textContent = `Player ${board[a]} wins! 🎉`;
      gameActive = false;
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
      return;
    }
  }
  if (board.every(cell => cell !== '')) {
    statusDisplay.textContent = "It's a tie! 🤝";
    gameActive = false;
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusDisplay.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('win');
  });
}

resetGame();

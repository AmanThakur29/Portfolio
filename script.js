const X_CLASS = 'X';
const O_CLASS = 'O';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const statusMessage = document.getElementById('statusMessage');
const cells = document.querySelectorAll('.cell');
let currentPlayer;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    currentPlayer = X_CLASS;
    cells.forEach(cell => {
        cell.innerText = ''; // Clear text content
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    statusMessage.innerText = `${currentPlayer}'s turn`;
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = currentPlayer === X_CLASS ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        statusMessage.innerText = 'Draw!';
        showModal('It\'s a draw!');
    } else {
        statusMessage.innerText = `${currentPlayer} wins!`;
        showModal(`${currentPlayer} wins!`);
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}


function swapTurns() {
    currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
    statusMessage.innerText = `${currentPlayer}'s turn`;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    board.classList.add(currentPlayer);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}
function placeMark(cell, currentClass) {
    cell.innerText = currentClass;
    cell.classList.add(currentClass);
}

function showModal(message) {
    const modal = document.getElementById("myModal");
    const modalText = document.getElementById("modalText");
    modalText.innerText = message;
    modal.style.display = "block";

    const span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
        startGame();
    }

    window.onclick = function (event) {
        const modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
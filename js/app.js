//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');
// console.log(squareEls);
// console.log(messageEl);

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    messageEl.textContent = 'Click to start!';
    for (let i = 0; i < board.length; i++) {
        squareEls[i].textContent = board[i];
    };
}
init();

const updateBoard = () => {
    board.forEach((sqr) => {
        if (sqr.textContent === '') {
            sqr.textContent = turn;
        }
    });
    for (let i = 0; i < board.length; i++) {
        squareEls[i].textContent = board[i];
    };
}

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.textContent = `${turn}'s turn!`;
    } else if (winner === false && tie === true) {
        messageEl.textContent = "It's a tie!";
    } else {
        messageEl.textContent = "We have a winner!";
    }
}

const render = () => {
    updateBoard();
    updateMessage();
}

const handleClick = (event) => {
    const squareIndex = event.target.id;
    if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {
        return;
    }
    if (winner === true) {
        return;
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

const placePiece = (index) => {
    board[index] = turn;
    // console.log(board);
}

 const checkForWinner = () => {
    if ((board[0] !== '' && board[0] === board[1] && board[1] === board[2]) || (board[3] !== '' && board[3] === board[4] && board[4] === board[5]) || (board[6] !== '' && board[6] === board[7] && board[7] === board[8]) || (board[0] !== '' && board[0] === board[3] && board[3] === board[6]) || (board[1] !== '' && board[1] === board[4] && board[4] === board[7]) || (board[2] !== '' && board[2] === board[5] && board[5] === board[8]) || (board[0] !== '' && board[0] === board[4] && board[4] === board[8]) || (board[2] !== '' && board[2] === board[4] && board[4] === board[6])) {
        winner = true;
    }
    // console.log('winner:', winner)
 }

 const checkForTie = () => {
    if (winner === true) {
        return;
    }
    if (board.includes('')) {
        tie = false;
    } else {
        tie = true;
    }
    // console.log('tie:', tie);
 }

 const switchPlayerTurn = () => {
    if (winner === true) {
        return;
    } else {
        if (turn === 'X') {
            turn = 'O'
        } else {
            turn = 'X'
        }
    }
    // console.log('turn:', turn);
 }

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((sqr) => {
    sqr.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);
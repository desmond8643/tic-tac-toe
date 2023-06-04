/* define variables */
const symbol = {
    'Player 1': 'O',
    'Player 2': 'X'
}

const description = document.querySelector('.js-description');

const board = {
    grid1: document.getElementById('js-grid-1'),
    grid2: document.getElementById('js-grid-2'),
    grid3: document.getElementById('js-grid-3'),
    grid4: document.getElementById('js-grid-4'),
    grid5: document.getElementById('js-grid-5'),
    grid6: document.getElementById('js-grid-6'),
    grid7: document.getElementById('js-grid-7'),
    grid8: document.getElementById('js-grid-8'),
    grid9: document.getElementById('js-grid-9')
}

let playerTurn = 'Player 1';
    
/* activate event listeners and update description at the beginning*/
startGame(); 

function startGame() {
    for (const grid in board) {
        updateBoard(board[grid]);
    }
    
    updateDescription();
}

function updateBoard(grid) {
    const listener = () => {
        if (grid.value === '') {
            if (playerTurn === 'Player 1') {
                grid.value = symbol[playerTurn];
                if (!checkWin(symbol[playerTurn])) {
                    playerTurn = 'Player 2';
                    updateDescription();
                }    
            } else if (playerTurn === 'Player 2') {
                grid.value = symbol[playerTurn];
                if (!checkWin(symbol[playerTurn])) {
                    playerTurn = 'Player 1';
                    updateDescription();
                }    
            }
        }
    };
    
    grid.addEventListener('click', listener);
}

function updateDescription() {
    description.innerHTML = `${playerTurn}'s turn (<b>${symbol[playerTurn]}</b>)`;
}

function checkWin(player) {
    if (board.grid1.value === player && board.grid2.value === player && board.grid3.value === player) { /* horizontal wins */
        playerWin();
        return true;
    } 
    if (board.grid4.value === player && board.grid5.value === player && board.grid6.value === player) {
        playerWin();
        return true;
    } 
    if (board.grid7.value === player && board.grid8.value === player && board.grid9.value === player) {
        playerWin();
        return true;
    } 
    if (board.grid1.value === player && board.grid4.value === player && board.grid7.value === player) { /* vertical wins */
        playerWin();
        return true;
    } 
    if (board.grid2.value === player && board.grid5.value === player && board.grid8.value === player) { 
        playerWin();
        return true;
    } 
    if (board.grid3.value === player && board.grid6.value === player && board.grid9.value === player) { 
        playerWin();
        return true;
    } 
    if (board.grid1.value === player && board.grid5.value === player && board.grid9.value === player) { /* diagonal wins */
        playerWin();
        return true;
    } 
    if (board.grid3.value === player && board.grid5.value === player && board.grid7.value === player) { 
        playerWin();
        return true;
    }
    
    if (checkTie()) {
        playerTie();
        return true;

    } else {
        return false; 
    }
    
}

function playerWin() {
    description.innerHTML = `${playerTurn} wins!
    <button class="js-play-again-button play-again-button">Play again</button>`;
    for (const grid in board) {
        disableBoard(board[grid]);
    }

    document.querySelector('.js-play-again-button').addEventListener('click', () => {
        for (const grid in board) {
            resetBoard(board[grid]);
        }
        updateDescription();
    });
  }

function playerTie() {
    description.innerHTML = `It's a tie match!
    <button class="js-play-again-button play-again-button">Play again</button>`;
    for (const grid in board) {
        disableBoard(board[grid]);
    }

    document.querySelector('.js-play-again-button').addEventListener('click', () => {
        for (const grid in board) {
            resetBoard(board[grid]);
        }
        updateDescription();
    });
}

  function disableBoard(grid) {
    grid.disabled = true;
  }

  function resetBoard(grid) {
    grid.value = '';
    grid.disabled = false;
  }

  function checkTie() {
    for (const grid in board) {
        if (board[grid].value === '') {
            return false;
        }
    }
    return true;

  }
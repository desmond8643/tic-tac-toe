/* define variables */
const symbol = {
    'Player 1': 'O',
    'Player 2': 'X'
}

const description = document.querySelector('.js-description');

//use array to store the dom 
const board = 
[
    document.getElementById('js-grid-1'),
    document.getElementById('js-grid-2'),
    document.getElementById('js-grid-3'),
    document.getElementById('js-grid-4'),
    document.getElementById('js-grid-5'),
    document.getElementById('js-grid-6'),
    document.getElementById('js-grid-7'),
    document.getElementById('js-grid-8'),
    document.getElementById('js-grid-9')
]

let playerTurn = 'Player 1';
let currentGrid = [];

/* activate event listeners and update description at the beginning*/
startGame(); 

function startGame() {
    board.forEach(grid => {
        updateBoard(grid)
    })

    updateDescription();
}

function updateBoard(grid) {
    const listener = () => {
        if (grid.value === '') {
            if (playerTurn === 'Player 1') {
                grid.value = symbol[playerTurn];
                getCurrentGrid();

                if (!checkWin(symbol[playerTurn])) {
                    playerTurn = 'Player 2';
                    updateDescription();
                    //add computer move here
                    computerMove();
                }
            }    
        }
    };
    
    grid.addEventListener('click', listener);
}

function getCurrentGrid() {
    currentGrid = [];
    board.forEach(grid => {
        currentGrid.push(grid.value);
    })
    console.log(currentGrid)
}

function computerMove() {
    let blankGrid = [];

    board.forEach(grid => {
        if (grid.value === '') {
            blankGrid.push(grid)
        }
    })

    if (board[4].value === '') {
        board[4].value = symbol[playerTurn];
    } else {
        randomGenerateComputerMove(blankGrid)
    }

    getCurrentGrid();

    if (!checkWin(symbol[playerTurn])) {
        playerTurn = 'Player 1';
        updateDescription();
    }
}

function randomGenerateComputerMove(blankGrid) {
    //random generate a number range from the array size
    let getRandomMove = Math.floor(Math.random() * blankGrid.length);
    //get computer move by using that random generated number
        blankGrid[getRandomMove].value = symbol[playerTurn];
}

function updateDescription() {
    description.innerHTML = `${playerTurn}'s turn (<b>${symbol[playerTurn]}</b>)`;
}

function checkWin(player) {
    if (winCombinations(0, 1, 2, player) || winCombinations(3, 4, 5, player) || winCombinations(6, 7, 8, player) || 
        winCombinations(0, 3, 6, player) || winCombinations(1, 4, 7, player) || winCombinations(2, 5, 8, player) ||
        winCombinations(0, 4, 8, player) || winCombinations(2, 4, 6, player)) {
            playerWin()
            return true;
    }

    if (checkTie()) {
        playerTie();
        return true;
    } else {
        return false;
    }
}

function winCombinations(one, two, three, player) {
    return currentGrid[one] === player && currentGrid[two] === player && currentGrid[three] === player 
}

function playerWin() {
    description.innerHTML = `${playerTurn} wins!
    <button class="js-play-again-button play-again-button">Play again</button>`;
    board.forEach(grid => {
        disableBoard(grid)
    })

    document.querySelector('.js-play-again-button').addEventListener('click', () => {
        board.forEach(grid => {
            resetBoard(grid)
        })
        updateDescription();
        if (playerTurn === 'Player 2') {
            computerMove();
        }
    });
}

function playerTie() {
    description.innerHTML = `It's a tie match!
    <button class="js-play-again-button play-again-button">Play again</button>`;
    board2.forEach(grid => {
        disableBoard(grid)
    })

    document.querySelector('.js-play-again-button').addEventListener('click', () => {
        board.forEach(grid => {
            resetBoard(grid)
        })
        updateDescription();
        if (playerTurn === 'Player 2') {
            computerMove();
        }
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
    for (let i = 0; i < board.length; i++) {
        if (board[i].value === '') {
            return false;
        }
    }
    return true;
}

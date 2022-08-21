const startGame = (function () {
    let user = {};

    const resetFirst = function () {
        user = {};
        const playAgain = document.querySelector('.play-again');
        const chooseContainer = document.querySelector('.choose-container');
        const narrator = document.querySelector('.narrator');

        playAgain.style.display = 'none';
        gameBoard.resetBoard();
        chooseContainer.style.display = 'flex'; 
        narrator.innerText = '';
        chooseScreen();
    }

    const chooseScreen = function () {
        const playX = document.querySelector('.play-x');
        const playO = document.querySelector('.play-o');

        
        playX.addEventListener('click', _setUserX);
        playO.addEventListener('click', _setUserO);
    }

    const _setUserX = function () {
        const chooseContainer = document.querySelector('.choose-container');
        user['user'] = 'X';
        chooseContainer.style.display = 'none';
        gameBoard.displayBoard(gameBoard.newBoard);
        runGame.mainGame();
    }

    const _setUserO = function () {
        const chooseContainer = document.querySelector('.choose-container');
        user['user'] = 'O';
        chooseContainer.style.display = 'none';
        gameBoard.displayBoard(gameBoard.newBoard);    
        runGame.mainGame();
    }

    return {chooseScreen, resetFirst, user};
})();

const gameBoard = (function () {
    'use strict';

    const gridContainer = document.querySelector('.grid-container');

    const newBoard = [[null, null, null],
                   [null, null, null],
                   [null, null, null]];

    const displayBoard = function (board) {
        let count = 0;

        const tempContainer = document.createElement('div');
        tempContainer.classList.add('temp');
        
        for (let row of board) {
            const captureRow = document.createElement('div');
            captureRow.classList.add('row');

            for (let val of row) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-value', count);
                cell.innerText = val;

                count++;

                if (val === 'X') {
                    cell.style.backgroundColor = '#E5D1FA';
                } else if (val === 'O') {
                    cell.style.backgroundColor = '#FAE5D1';
                }

                captureRow.appendChild(cell);
            }
            tempContainer.appendChild(captureRow);
        }
        gridContainer.appendChild(tempContainer);
    }

    const resetBoard = function () {
        const tempContainer = document.querySelector('.temp');
        tempContainer.remove();
    }

    const result = function (board, action) {
        // returns the board that results from making move (i, j) on the board.
        const copyBoard = JSON.parse(JSON.stringify(board));
        // console.log(gameBoard.newBoard);
        // console.log(action);
        if (copyBoard[action[0]][action[1]] !== null) {
            // ERROR
            console.log("ERROR MESSAGE HERE");
            
        }
        copyBoard[action[0]][action[1]] = player.whichPlayer(board);
        return copyBoard;
    }

    const winner = function (board) {
        for (let row = 0; row < board.length; row++) {
            if (board[row][0] === board[row][1] && board[row][0]=== board[row][2]) {
                if (board[row][0] === 'X' || board[row][1] === 'X' || board[row][2] === 'X') {
                    return 'X';
                } else if (board[row][0] === 'O' || board[row][1] === 'O' || board[row][2] === 'O') {
                    return 'O';
                }
            }
        }

        const row = 0;
        if (board[row][0] == board[row+1][0] && board[row][0] == board[row+2][0]) {
            if (board[row][0] == 'X' || board[row+1][0] == 'X' || board[row+2][0] == 'X') {
                return 'X';
            } else if (board[row][0] == 'O' || board[row+1][0] == 'O' || board[row+2][0] == 'O') {
                return 'O';
            }
        }
        if (board[row][1] == board[row+1][1] && board[row][1] == board[row+2][1]) {
            if (board[row][1] == 'X' || board[row+1][1] == 'X' || board[row+2][1] == 'X') {
                return 'X';
            } else if (board[row][1] == 'O' || board[row+1][1] == 'O' || board[row+2][1] == 'O') {
                return 'O';
            }
        }
        if (board[row][2] == board[row+1][2] && board[row][2] == board[row+2][2]) {
            if (board[row][2] == 'X' || board[row+1][2] == 'X' || board[row+2][2] == 'X') {
                return 'X';
            } else if (board[row][2] == 'O' || board[row+1][2] == 'O' || board[row+2][2] == 'O') {
                return 'O';
            }
        }
        if (board[row][0] == board[row+1][1] && board[row][0] == board[row+2][2]) {
            if (board[row][0] == 'X' || board[row+1][1] == 'X' || board[row+2][2] == 'X') {
                return 'X';
            } else if (board[row][0] == 'O' || board[row+1][1] == 'O' || board[row+2][2] == 'O') {
                return 'O';
            }
        }
        if (board[row][2] == board[row+1][1] && board[row][2] == board[row+2][0]) {
            if (board[row][2] == 'X' || board[row+1][1] == 'X' || board[row+2][0] == 'X') {
                return 'X';
            } else if (board[row][2] == 'O' || board[row+1][1] == 'O' || board[row+2][0] == 'O') { 
                return 'O';
            }
        }
        return;
    }

    const terminal = function (board) {
        // returns true if game over, false otherwise

        if (winner(board) !== undefined) {
            return true;
        }

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board.length; col++) {
                if (board[row][col] === null) {
                    return false;
                }
            }
        }
        return true;
    }

    return {displayBoard, resetBoard, result, winner, terminal, newBoard};

})();

const algo = (function () {
    'use strict';
    
    const _utility = function (board) {
        // return 1 if X won, -1 if O won, 0 otherwise
        if (gameBoard.winner(board) === 'X') {
            return 1;
        } else if (gameBoard.winner(board) === 'O') {
            return -1;
        } else {
            return 0;
        }
    }

    const minimax = function (board) {
        const maxObj = {};
        const minObj = {};

        if (player.whichPlayer(board) === 'X') {
            for (let action of player.actions(board)) {
                maxObj[action] = _minValue(gameBoard.result(board, action));
            }
            const allValues = Object.values(maxObj);
            const maxValue = Math.max(...allValues);

            const arrayOfKeys = [];
            for (let item of Object.entries(maxObj)) {
                if (item[1] === maxValue) {
                    arrayOfKeys.push(item[0])
                }
            }
            const maxKey = Math.floor(Math.random() * arrayOfKeys.length);
            return arrayOfKeys[maxKey];
        } else {
            for (let action of player.actions(board)) {
                minObj[action] = _maxValue(gameBoard.result(board, action));
            }
            const allValues = Object.values(minObj);
            const minValue = Math.min(...allValues);
            const arrayOfKeys = [];
            for (let item of Object.entries(minObj)) {
                if (item[1] === minValue) {
                    arrayOfKeys.push(item[0])
                }
            }
            const minKey = Math.floor(Math.random() * arrayOfKeys.length);
            return arrayOfKeys[minKey];
        }
    }

    const _minValue = function (board) {
        // returns best possible value for O
        if (gameBoard.terminal(board)) {
            return _utility(board);
        }
        let v = Number.POSITIVE_INFINITY;
        for (let action of player.actions(board)) {
            v = Math.min(v, _maxValue(gameBoard.result(board, action)))
        }
        return v;
    }

    const _maxValue = function (board) {
        // returns best possible value for X
        if (gameBoard.terminal(board)) {
            return _utility(board);
        }
        let v = Number.NEGATIVE_INFINITY;
        for (let action of player.actions(board)) {
            v = Math.max(v, _minValue(gameBoard.result(board, action)))
        }
        return v;
    }

    return {minimax};
})();

const player = (function () {

    const whichPlayer = function (board) {
        let numX = 0;
        let numO = 0;
    
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board.length; col++) {
                if (board[row][col] === 'X') {
                    numX++;
                } else if (board[row][col] === 'O') {
                    numO++;
                }
            }
        }
    
        if (numX === numO) {
            return 'X';
        } else if (numX > numO) {
            return 'O';
        }
    }

    const actions = function (board) {
        const allActions = [];

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board.length; col++) {
                if (board[row][col] === null) {
                    const oneAction = [row, col];
                    allActions.push(oneAction);
                }
            }
        }
        return allActions;
    }

    return {whichPlayer, actions};
})();

const runGame = (function () {
    startGame.chooseScreen();
    
    const mainGame = function () {
        let aiTurn = true;
        const narrator = document.querySelector('.narrator');
        let board = gameBoard.newBoard;

        const userMove = function (e) {
            if (e.target.className === 'cell' && e.target.innerText === '') {
                document.removeEventListener('click', userMove);

                const gameOver = gameBoard.terminal(board);
                
                const cell = e.target.getAttribute('data-value');
                let count = 0;
                
                exit:
                for (let row = 0; row < board.length; row++) {
                    for (let col = 0; col < board.length; col++) {
                        if (cell == count) {
                            board = gameBoard.result(board, [row, col]);
                            gameBoard.resetBoard();
                            gameBoard.displayBoard(board);
                            break exit;
                        } else {
                            count++;
                        }
                    }
                }
                goGame();
            }
        }

        const goGame = function () {
            const gameOver = gameBoard.terminal(board);
            const currentPlayer = player.whichPlayer(board);

            if (gameOver) {
                const playAgain = document.querySelector('.play-again');
                const winner = gameBoard.winner(board);

                if (winner === undefined) {
                    narrator.innerText = 'Game Over: Tie';
                } else {
                    narrator.innerText = `Game Over: ${winner} wins.`;
                }

                playAgain.style.display = 'block';
                playAgain.addEventListener('click', startGame.resetFirst)

            } else if (startGame.user['user'] === currentPlayer) {
                narrator.innerText = `Play as ${startGame.user['user']}`;
                // user move
                document.addEventListener('click', userMove);

            } else {
                narrator.innerText = 'Computer thinking...';
                _sleep(500);

                // ai move
                if (startGame.user['user'] !== currentPlayer && !gameOver) {
                    if (aiTurn) {
                        let move = algo.minimax(board);
                        move = move.split(',');
                        board = gameBoard.result(board, move);
                        gameBoard.resetBoard();
                        gameBoard.displayBoard(board);
                        aiTurn = false;
                    } else {
                        aiTurn = true;
                    }
                }
                goGame();
            } 
        }
        
        goGame();
    }

    const _sleep = function (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }

    return {mainGame};
})();


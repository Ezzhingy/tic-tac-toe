const startGame = (function () {
    const chooseScreen = function () {
        const gridContainer = document.querySelector('.grid-container');
        const chooseContainer =

        gridContainer.style.display = 'none';


    }



})();

const gameBoard = (function () {
    'use strict';
    // const board = [[null, null, null],
    //                [null, null, null],
    //                [null, null, null]];

    const gridContainer = document.querySelector('.grid-container');

    const board = [['X', 'X', 'X'],
                   ['X', 'X', 'X'],
                   ['X', 'X', 'X']];

    const displayBoard = function () {
        for (let row of board) {
            const captureRow = document.createElement('div');
            captureRow.classList.add('row');

            for (let val of row) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.innerText = val;

                if (val === 'X') {
                    cell.style.backgroundColor = '#E5D1FA';
                } else if (val === 'O') {
                    cell.style.backgroundColor = '#FAE5D1';
                }

                captureRow.appendChild(cell);
            }

            gridContainer.appendChild(captureRow);
        }
    }

    const result = function (action) {
        // returns the board that results from making move (i, j) on the board.
        copyBoard = [...gameBoard.board];

        if (copyBoard[action[0]][action[1]] !== null) {
            // ERROR
            alert("ERROR MESSAGE HERE");
        }

        copyBoard[action[0]][action[1]] = player.whichPlayer();
        return copyBoard;
    }

    const winner = function () {
        for (let row = 0; row < gameBoard.board.length; row++) {
            if (gameBoard.board[row][0] === gameBoard.board[row][1] === gameBoard.board[row][2]) {
                if (board[row][0] === 'X' || board[row][1] === 'X' || board[row][2] === 'X') {
                    return 'X';
                } else if (gameBoard.board[row][0] === 'O' || gameBoard.board[row][1] === 'O' || gameBoard.board[row][2] === 'O') {
                    return 'O';
                }
            }
        }

        const row = 0;
        if (gameBoard.board[row][0] == gameBoard.board[row+1][0] == gameBoard.board[row+2][0]) {
            if (gameBoard.board[row][0] == 'X' || gameBoard.board[row+1][0] == 'X' || gameBoard.board[row+2][0] == 'X') {
                return 'X';
            } else if (gameBoard.board[row][0] == 'O' || gameBoard.board[row+1][0] == 'O' || gameBoard.board[row+2][0] == 'O') {
                return 'O';
            }
        }
        if (gameBoard.board[row][1] == gameBoard.board[row+1][1] == gameBoard.board[row+2][1]) {
            if (gameBoard.board[row][1] == 'X' || gameBoard.board[row+1][1] == 'X' || gameBoard.board[row+2][1] == 'X') {
                return 'X';
            } else if (gameBoard.board[row][1] == 'O' || gameBoard.board[row+1][1] == 'O' || gameBoard.board[row+2][1] == 'O') {
                return 'O';
            }
        }
        if (gameBoard.board[row][2] == gameBoard.board[row+1][2] == gameBoard.board[row+2][2]) {
            if (gameBoard.board[row][2] == 'X' || gameBoard.board[row+1][2] == 'X' || gameBoard.board[row+2][2] == 'X') {
                return 'X';
            } else if (gameBoard.board[row][2] == 'O' || gameBoard.board[row+1][2] == 'O' || gameBoard.board[row+2][2] == 'O') {
                return 'O';
            }
        }
        if (gameBoard.board[row][0] == gameBoard.board[row+1][1] == gameBoard.board[row+2][2]) {
            if (gameBoard.board[row][0] == 'X' || gameBoard.board[row+1][1] == 'X' || gameBoard.board[row+2][2] == 'X') {
                return 'X';
            } else if (gameBoard.board[row][0] == 'O' || gameBoard.board[row+1][1] == 'O' || gameBoard.board[row+2][2] == 'O') {
                return 'O';
            }
        }
        if (gameBoard.board[row][2] == gameBoard.board[row+1][1] == gameBoard.board[row+2][0]) {
            if (gameBoard.board[row][2] == 'X' || gameBoard.board[row+1][1] == 'X' || gameBoard.board[row+2][0] == 'X') {
                return 'X';
            } else if (gameBoard.board[row][2] == 'O' || gameBoard.board[row+1][1] == 'O' || gameBoard.board[row+2][0] == 'O') { 
                return 'O';
            }
        }
        return;
    }

    const terminal = function () {
        // returns true if game over, false otherwise

        if (winner() !== undefined) {
            return true;
        }

        for (let row = 0; row < gameBoard.board.length; row++) {
            for (let col = 0; col < gameBoard.board.length; col++) {
                if (gameBoard.baord[row][col] === null) {
                    return false;
                }
            }
        }
        return true;
    }

    return {displayBoard, result, winner, terminal};

})();

const algo = (function () {
    'use strict';
    
    const _utility = function () {
        // return 1 if X won, -1 if O won, 0 otherwise
        if (gameBoard.winner() === 'X') {
            return 1;
        } else if (gameBoard.winner() === 'O') {
            return -1;
        } else {
            return 0;
        }
    }

    const minimax = function () {
        const maxObj = {};
        const minObj = {};

        if (player.whichPlayer() === 'X') {
            for (let action of player.actions()) {
                maxObj[action] = _minValue(gameBoard.result(action));
            }
            const allValues = Object.values(maxObj);
            const maxValue = Math.max(allValues);
            arrayOfKeys = [];
            for (let item of Object.entries(maxObj)) {
                if (item[1] === maxValue) {
                    arrayOfKeys.push(item[0])
                }
            }
            const maxKey = Math.floor(Math.random() * arrayOfKeys.length);
            return maxKey;
        } else {
            for (let action of player.actions()) {
                minObj[action] = _maxValue(gameBoard.result(action));
            }
            const allValues = Object.values(minObj);
            const minValue = Math.min(allValues);
            arrayOfKeys = [];
            for (let item of Object.entries(minObj)) {
                if (item[1] === minValue) {
                    arrayOfKeys.push(item[0])
                }
            }
            const minKey = Math.floor(Math.random() * arrayOfKeys.length);
            return minKey;
        }
    }

    const _minValue = function () {
        // returns best possible value for O
        if (gameBoard.terminal()) {
            return _utility();
        }
        let v = Number.POSITIVE_INFINITY;
        for (let action of player.action()) {
            v = min(v, _maxValue(gameBoard.result(action)))
        }
        return v;
    }

    const _maxValue = function () {
        // returns best possible value for X
        if (gameBoard.terminal()) {
            return _utility();
        }
        let v = Number.NEGATIVE_INFINITY;
        for (let action of player.action()) {
            v = max(v, _minValue(gameBoard.result(action)))
        }
        return v;
    }

    return {minimax};
})();

const player = function () {

    const whichPlayer = function () {
        const numX = 0;
        const numO = 0;
    
        for (let row = 0; row < gameBoard.board.length; row++) {
            for (let col = 0; col < gameBoard.board.length; col++) {
                if (gameBoard.board[row][col] === 'X') {
                    numX++;
                } else if (gameBoard.board[row][col] === 'O') {
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

    const actions = function () {
        const allActions = new set();

        for (let row = 0; row < gameBoard.board.length; row++) {
            for (let col = 0; col < gameBoard.board.length; col++) {
                if (gameBoard.board[row][col] === null) {
                    const oneAction = (row, col);
                    allActions.add(oneAction);
                }
            }
        }
        return allActions;
    }

    return {whichPlayer, actions};
};

const runGame = (function () {
    // gameBoard.displayBoard();

})();
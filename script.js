const runGame = (function () {
    // run game through this module
})();

const gameBoard = (function () {
    // gameboard object
    'use strict';
    // const board = [[null, null, null],
    //                [null, null, null],
    //                [null, null, null]];

    const gameBoard = {
        board: [['X', 'X', 'X'],
                ['X', 'X', 'X'],
                ['X', 'X', 'X']],
        init: function () {
            this.cacheDOM();
            this.bindEvents();
            this.displayBoard();
        },
        cacheDOM: function () {
            // do query selectors here
            this.gridContainer = document.querySelector('.grid-container');
        },
        bindEvents: function () {
            // event listeners here
        },
        displayBoard: function () {
            // create elements and display here
            for (let row of this.board) {
                this.captureRow = document.createElement('div');
                this.captureRow.classList.add('row');

                for (let val of row) {
                    this.cell = document.createElement('div');
                    this.cell.classList.add('cell');
                    this.cell.innerText = val;
                    this.captureRow.appendChild(this.cell);
                }

                this.gridContainer.appendChild(this.captureRow);




            }
        }
    };
    gameBoard.init();

})();

const displayController = (function () {
    'use strict'
    // show who's turn it currently is
})();

const player = function () {
    // player
};
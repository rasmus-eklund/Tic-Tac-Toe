
const gameBoard = (() => {
    let _array = new Array(9);
    const possibleThrees = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const setMark = function (position, mark) {
        _array[position] = mark;
    };
    const getMark = function (position) {
        return _array[position]
    }
    const reset = () => _array = new Array(9);
    const available = (pos) => !(getMark(pos));

    const threeInRow = function (mark) {
        for (let i = 0; i < possibleThrees.length; i++) {
            if (possibleThrees[i].every(el => _array[el] === mark)) {
                return possibleThrees[i];
            }
        }
        return false;
    }
    return { setMark, getMark, available, reset, threeInRow }
})();

const players = (markType, name, human) => {
    const getName = () => name;
    const getMarkType = () => markType;
    const addMark = function (position) {
        let successfulPlacement;
        if (gameBoard.available(position)) {
            gameBoard.setMark(position, markType)
            successfulPlacement = true;
        } else { successfulPlacement = false }
        return successfulPlacement;
    }
    return { addMark, getMarkType, getName }
}

const displayController = (() => {
    const board = document.querySelector('.board');
    const resetButton = document.querySelector('button');
    const result = document.querySelector('.result');
    const startButton = document.querySelector('.start');

    startButton.onclick = start;

    for (let square = 0; square < 9; square++) {
        const div = document.createElement('div');
        div.id = square;
        const p = document.createElement('p');
        div.appendChild(p);
        board.appendChild(div);
    }

    function loopOverChildren(callback) {
        [...board.children].forEach(div => callback(div))
    }

    function addEvents() {
        loopOverChildren((div) => div.addEventListener('click', setMark));
        resetButton.onclick = reset;
    }

    function removeEvents() {
        loopOverChildren((div) => div.removeEventListener('click', setMark));
        resetButton.removeEventListener('click', reset);
    }

    function render() {
        let i = 0;
        loopOverChildren((div) => div.children[0].textContent = gameBoard.getMark(i++));
    };
    function setMark() {
        gameLogic.makeMove(this.id);
    }
    const highLightWin = function (arr, color) {
        let i = 0;
        loopOverChildren((div) => {
            if (arr.includes(i++)) {
                div.children[0].style.color = color;
            }
        });
    }
    function start(){
        resetButton.style.visibility = 'visible';
        board.style.visibility = 'visible';
        result.style.visibility = 'visible';
        addEvents();
        startButton.style.visibility = 'hidden';
    };
    const stop = () => {
        resetButton.style.visibility = 'hidden';
        board.style.visibility = 'hidden';
        result.style.visibility = 'hidden';
        removeEvents();
    }
    const showResult = (whoWon) => {
        result.textContent = whoWon;
    };
    const reset = () => {
        gameBoard.reset();
        gameLogic.reset();
        render();
        loopOverChildren((div) => div.children[0].style.color = 'black')
        showResult('')
    }
    return { render, highLightWin, start, stop, showResult, reset }
})();

const gameLogic = (() => {
    const allPlayers = [players('X', 'Emil', true), players('O', 'Computer', false)]
    let turn = 1;

    const makeMove = function (position) {
        currentPlayer = allPlayers[Math.abs((turn % 2) - 1)]
        if (currentPlayer.addMark(position)) {
            displayController.render();
            turn++
            if (turn > 5) {
                let row = gameBoard.threeInRow(currentPlayer.getMarkType());
                if (row) {
                    displayController.highLightWin(row, 'red');
                    displayController.showResult(`${currentPlayer.getName()} won!`)
                }
                if (turn == 10) {
                    displayController.highLightWin([...Array(9).keys()], 'blue')
                    displayController.showResult("It's a tie!")
                }
            }

        }
    }

    const reset = () => turn = 1;
    return { makeMove, reset }
})();

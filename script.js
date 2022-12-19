
const gameBoard = (() => {
    let _array = new Array(9);

    const setMark = function (position, mark) {
        _array[position] = mark;
    };

    const getMark = function (position) {
        return _array[position]
    }

    const available = (pos) => !(getMark(pos));

    return {
        setMark,
        getMark,
        available
    }
})();


const players = (markType, human) => {
    markType = markType;
    const addMark = function (position) {
        let successfulPlacement;
        if (gameBoard.available(position)) {
            gameBoard.setMark(position, markType)
            successfulPlacement = true;
        } else { successfulPlacement = false }
        return successfulPlacement;
    }
    return {
        addMark
    }
}

const gameLogic = (() => {
    const allPlayers = [players('X', true), players('O', false)]
    let whoTurn = 0;
    let successfulPlacement;
    const makeMove = function (position) {
        successfulPlacement = allPlayers[whoTurn].addMark(position);
        if (successfulPlacement) {
            displayController.render();
            whoTurn = Math.abs(whoTurn - 1);
        }
    }

    return { makeMove }
})();

const displayController = (() => {
    const board = document.querySelector('.board');
    for (let square = 0; square < 9; square++) {
        const div = document.createElement('div');
        div.id = square;
        const p = document.createElement('p');
        div.appendChild(p);
        board.appendChild(div);
    }

    [...board.children].forEach(div => div.addEventListener('click', setMark));

    const render = () => {
        let i = 0;
        [...board.children].forEach(div => {
            div.children[0].textContent = gameBoard.getMark(i++);
        });
    };

    function setMark() {
        gameLogic.makeMove(this.id);
    }

    return {
        render
    }
})();

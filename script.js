
const gameBoard = (() => {
    let _array = new Array(9);

    const setMark = function (position, mark) {
        if (!(_array[position])) {
            _array[position] = mark;
        }
    };

    const getMark = function (position) {
        return _array[position]
    }
    return {
        setMark,
        getMark
    }
})();


const displayController = (() => {
    const board = document.querySelector('.board');
    for (let square = 0; square < 9; square++) {
        const div = document.createElement('div');
        const p = document.createElement('p');
        div.appendChild(p)
        board.appendChild(div)
    }
    function render() {
        let i = 0;
        [...board.children].forEach(div => {
            if (gameBoard.getMark(i)) {
                div.children[0].textContent = gameBoard.getMark(i++);
            }
        });
    };
    return {
        render
    }
})();

const players = (markType, human) => {
    getMarkType = () => markType;
    getIsHuman = () => human;
    return {
        getMarkType,
        getIsHuman
    }
}

const gameLogic = (() => {

})();
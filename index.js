/**
 * UI ELEMENTS--------------------------------------------------------------------
 *
 */

const overlayEffect = document.querySelector(".overlay");
console.log("overlay", overlayEffect);

const settingsButton = document.querySelector(".settings-btn");
console.log("settings-btn", settingsButton);

const settingsContainer = document.querySelector(".settings-container");
console.log("settings-container", settingsContainer);

const closeButton = document.querySelector(".close");

const grids = document.querySelector("#grids");
console.log("grids", grids);

const connect = document.querySelector("#connect");
console.log("connect", connect);

const opponent = document.querySelector("#opponent");
console.log("opponent", opponent);

const sound = document.querySelector("#sound");
console.log("sound", sound);

const timeLimit = document.querySelector("#time-limit");
console.log("time limit s", timeLimit);

//table
const table = document.querySelector(".table");
console.log("table", table);

// end game popup
const endGame = document.querySelector('.end-game');
console.log('endgame', endGame);

//game result
const humanScores = document.querySelector(".human .scores");
const computerScores = document.querySelector(".opponent .scores");
const tieScores = document.querySelector(".tie .scores");
console.log(
    "humanScore, computerScore, tieScore",
    humanScores,
    computerScores,
    tieScores
);
/**
 * THE SETTINGS --------------------------------------------------------------
 *
 */

/**
 * On and off overlay effect
 */
const onOverlay = function () {
    overlayEffect.style.display = "block";
};

const offOverlay = function () {
    overlayEffect.style.display = "none";
};

/**
 * Open and close the settings
 */

// Open
const showSettings = function () {
    settingsContainer.style.display = "block";
    onOverlay();
};

settingsButton.addEventListener("click", showSettings);

// Close
const closeSettings = function () {
    settingsContainer.style.display = "none";
    offOverlay();
};

closeButton.addEventListener("click", closeSettings);

/**
 * Create square
 */

const createSquare = function (key, num) {
    //create a square div
    const square = document.createElement("div");
    // append it to the table
    table.append(square);
    // add the 'square' class to the div
    square.className = "square";
    // add the id to the div
    square.id = key;
    // set height and width according to the total number of squares
    switch (num) {
        case 9:
            square.style.width = "calc(90%/3)";
            square.style.paddingTop = "calc(90%/3)";
            break;
        case 25:
            square.style.width = "calc(90%/5)";
            square.style.paddingTop = "calc(90%/5)";
            break;
        case 49:
            square.style.width = "calc(90%/7)";
            square.style.paddingTop = "calc(90%/7)";
            break;
        case 81:
            square.style.width = "calc(90%/8.5)";
            square.style.paddingTop = "calc(90%/8.5)";
            break;
        case 121:
            square.style.width = "calc(90%/10.5)";
            square.style.paddingTop = "calc(90%/10.5)";
            break;
    }
    // console.log('square', square);
    // console.log('square side', square.style.height);
};

/**
 * Create the game table
 */

const createTable = function (num) {
    for (i = 0; i < num; i++) {
        createSquare(i, num);
    }
};
// by default, display the table 3 x 3
createTable(9);

/**
 * Set the connect
 */
const setConnect = function (num) {
    const option = document.createElement("option");
    option.value = `${num}`;
    option.innerText = `${num}`;

    connect.append(option);
    console.log("option", option);
};

/**
 * update the connect as the settings
 */
const changeConnect = function (event) {
    connect.value = event.target.value;
};

connect.addEventListener("change", changeConnect);

/**
 * create the grids (createTable) according to the setting
 */
let squaresNum = 9;
const changeGrids = function (event) {
    // assign gridsValue to the target value
    let gridsValue = event.target.value;
    // define the total number of square accordingly
    // let squaresNum = 0;
    switch (gridsValue) {
        case "three":
            squaresNum = 9;
            // clear the old
            connect.innerHTML = "";
            // create the new
            setConnect(3);
            break;
        case "five":
            squaresNum = 25;
            connect.innerHTML = "";
            for (let i = 3; i <= 5; i++) {
                setConnect(i);
            }
            break;
        case "seven":
            squaresNum = 49;
            connect.innerHTML = "";
            for (let i = 3; i <= 6; i++) {
                setConnect(i);
            }
            break;
        case "nine":
            squaresNum = 81;
            connect.innerHTML = "";
            for (let i = 3; i <= 8; i++) {
                setConnect(i);
            }
            break;
        case "eleven":
            squaresNum = 121;
            connect.innerHTML = "";
            for (let i = 3; i <= 10; i++) {
                setConnect(i);
            }
            break;
    }
    // console.log("number of squares", squaresNum);
    //remove the previous one
    table.innerHTML = "";
    // create the new one
    createTable(squaresNum);
    return squaresNum;
};

grids.addEventListener("change", changeGrids);

/**
 * finnish the game setup
 * --------------------------------------------------------------------------
 * the game starts
 */

/**
 * get the row number of a move
 */
const atRowIndex = function (move) {
    // row index starting from 0
    const rowIndex = Math.floor(move / Math.sqrt(squaresNum));
    return rowIndex;
};

/**
 * distance between connected moves
 */
const distance = function (side) {
    let distance = 0;
    console.log("squaresNum", squaresNum);
    switch (side) {
        case "right":
            distance = 1;
            break;
        case "left":
            distance = -1;
            break;
        case "below":
            distance = Math.sqrt(squaresNum);
            break;
        case "above":
            distance = -Math.sqrt(squaresNum);
            break;
        case "left-above":
            distance = Math.sqrt(squaresNum) + 1;
            break;
        case "right-below":
            distance = -(Math.sqrt(squaresNum) + 1);
            break;
        case "right-above":
            distance = Math.sqrt(squaresNum) - 1;
            break;
        case "left-below":
            distance = -(Math.sqrt(squaresNum) - 1);
            break;
    }

    console.log("distance", distance);
    return distance;
};

/**
 * scan connected moves
 */
const scan = function (side, takenMoves) {
    // connected moves
    let connectedMoves = [];
    // the distance between ids of two moves

    // the centre is the last element in the takeMoves array
    let centerMove = takenMoves[takenMoves.length - 1];
    // console.log("centre moves", centerMove);

    let i = 0;
    while (i < connect.value) {
        // a checkedMove which could be or not be one of the takenMoves
        let checkedMove = centerMove + distance(side);
        // console.log("checked move", checkedMove);

        if (!takenMoves.includes(checkedMove)) {
            break;
        } else {
            if (
                ((side === "left" || side === "right") &&
                    atRowIndex(checkedMove) !== atRowIndex(centerMove)) ||
                ((side === "left-below" || side === "right-above") &&
                    atRowIndex(checkedMove) === atRowIndex(centerMove)) ||
                ((side === "left-above" || side === "right-below") &&
                    atRowIndex(centerMove) === atRowIndex(checkedMove) + 2)
            ) {
                break;
            } else {
                connectedMoves.push(checkedMove);
                centerMove = checkedMove;
                i++;
            }
        }
    }

    // console.log("connect", connect.value);
    // if the takenMoves includes the connectedMove then add the checkedMove to connectedMoves

    // console.log("connected moves", connectedMoves);
    return connectedMoves;
};

/**
 * check winning
 *
 * if the current player have the number of connected moves that is equal or more than the connect,
 * they are the winner.
 */
const win = function (takenMoves) {
    const currentMove = takenMoves[takenMoves.length - 1];
    let isWin = false;
    // all connected moves of the same row
    const connectedMovesOfRow = scan("left", takenMoves).concat(
        scan("right", takenMoves),
        currentMove
    );

    // all connected moves of the same colum
    const connectedMovesOfCol = scan("above", takenMoves).concat(
        scan("below", takenMoves),
        currentMove
    );

    // all connected moves of the same diagonal
    const connectedMovesOfDiagonal1 = scan("left-above", takenMoves).concat(
        scan("right-below", takenMoves),
        currentMove
    );

    // all connected moves of the opposite diagonal
    const connectedMovesOfDiagonal2 = scan("right-above", takenMoves).concat(
        scan("left-below", takenMoves),
        currentMove
    );

    // console.log(
    //     "row col diagonal1 diagonal2",
    //     connectedMovesOfRow,
    //     connectedMovesOfCol,
    //     connectedMovesOfDiagonal1,
    //     connectedMovesOfDiagonal2
    // );
    // console.log("connect", connect.value);
    if (
        connectedMovesOfCol.length >= connect.value ||
        connectedMovesOfRow.length >= connect.value ||
        connectedMovesOfDiagonal1.length >= connect.value ||
        connectedMovesOfDiagonal2.length >= connect.value
    ) {
        isWin = true;
    }
    return isWin;
};

/**
 * show the result when the game ends
 */
const showResult = function (player) {
    endGame.innerHTML = `<p></p>`
    endGame.style.display = 'block';
    onOverlay();
};

/**
 * Set players
 */
const human = "x";
const computer = "o";

/**
 * computer takes a move
 */
const bestMove = function () {
}


// human will play first
let currentPlayer = human;


/**
 * toggle turn
 */
const toggleTurn = function () {
    if (currentPlayer === human) {
        currentPlayer = computer;
    } else {
        currentPlayer = human;
    }
    return currentPlayer;
};

/**
 * create an array of all moves taken (at the beginning, it is empty)
 */
let gameState = [
    {
        player: human,
        takenMoves: [],
        scores: 0,
    },
    {
        player: computer,
        takenMoves: [],
        scores: 0,
    },
    {
        rounds: 0,
        tie: 0
    }
];
console.log("game state", gameState);

const updateState = function (id, currentPlayer) {
    if (currentPlayer === human) {
        gameState[0].takenMoves.push(id);
    } else {
        gameState[1].takenMoves.push(id);
    }
    return gameState;
};

/**
 * Update game result on UI
 */
const updateScores = function (player, scores) {
    switch (player) {
        case human:
            humanScores.innerHTML = scores;
            break;
        case computer:
            computerScores.innerHTML = scores;
            break;
        case "tie":
            tieScores.innerHTML = scores;
            break;
    }
};

// humanScores.innerHTML = 3;

/**
 * add a move to the table
 */
const addMove = function (event) {
    //remove the event listener of settings button while playing
    settingsButton.removeEventListener('click', showSettings);

    // console.log(event.target);
    if (
        event.target.classList.contains("square") &&
        !event.target.classList.contains("filled")
    ) {
        if (currentPlayer === computer) {
            bestMove();
        }
        // write the token on the table
        event.target.innerHTML = `<span class='token'>${currentPlayer}</span>`;

        // update the square with filled class
        event.target.classList.add("filled");
        // console.log(event.target.classList);

        // update the current game state
        updateState(parseInt(event.target.id), currentPlayer);
        // console.log("moves", gameState);

        console.log("currentPlayer", currentPlayer);

        // get the player's takenMoves
        let takenMoves;
        let scores;
        if (currentPlayer === human) {
            takenMoves = gameState[0].takenMoves;
            scores = gameState[0].scores;
        } else {
            takenMoves = gameState[1].takenMoves;
            scores = gameState[1].scores;
        }
        // console.log("takenMoves", takenMoves);
        // console.log('scores', scores);

        if (takenMoves.length >= connect.value && win(takenMoves)) {
            showResult(currentPlayer);
            scores += 1;
            updateScores(currentPlayer, scores);
            // console.log("new gameState", gameState);
        }

        if (takenMoves.length === Math.floor(squaresNum / 2) + 1) {
            showResult("tie");

        }
        toggleTurn();
    }
};

table.addEventListener("click", addMove);

/**
 * --------------------------------------------------------------------
 * Some add-on features
 */

/**
 * Reset button to clear the current game, start a new one.
 */


/**
 *
 */

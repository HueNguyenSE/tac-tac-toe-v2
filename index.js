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

const opponent = document.querySelector("#opponentToken");
console.log("opponent", opponent);

const sound = document.querySelector("#sound");
console.log("sound", sound);

const timeLimit = document.querySelector("#time-limit");
console.log("time limit s", timeLimit);

//table
const table = document.querySelector(".table");
console.log("table", table);

// end game popup
const endGame = document.querySelector(".end-game");
console.log("endgame", endGame);

//game result
const humanScores = document.querySelector(".human .scores");
const opponentScores = document.querySelector(".opponent .scores");
const tieScores = document.querySelector(".tie .scores");
console.log(
  "humanTokenScore, opponentScore, tieScore",
  humanScores,
  opponentScores,
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

// settingsButton.addEventListener("click", showSettings);

// Close
const closeSettings = function () {
  settingsContainer.style.display = "none";
  offOverlay();
};

// closeButton.addEventListener("click", closeSettings);

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
      square.style.fontSize = "6em";
      break;
    case 25:
      square.style.width = "calc(90%/5)";
      square.style.paddingTop = "calc(90%/5)";
      square.style.fontSize = "5em";
      break;
    case 49:
      square.style.width = "calc(90%/7)";
      square.style.paddingTop = "calc(90%/7)";
      square.style.fontSize = "4em";
      break;
    case 81:
      square.style.width = "calc(90%/8.5)";
      square.style.paddingTop = "calc(90%/8.5)";
      square.style.fontSize = "3em";
      break;
    case 121:
      square.style.width = "calc(90%/10.5)";
      square.style.paddingTop = "calc(90%/10.5)";
      square.style.fontSize = "2em";
      break;
  }
  // console.log('square', square);
  // console.log('square side', square.style.height);
};
grids
/**
 * Create the game table
 */

const createTable = function (num) {
  for (i = 0; i < num; i++) {
    createSquare(i, num);
  }
};

// by default, display the table 3 x 3
window.addEventListener("load", (event) => {
  grids.value = 'three';
  setConnect(3);
  createTable(9);
});

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
  resetGame();
};

// connect.addEventListener("change", changeConnect);

/**
 * create the grids (createTable) according to the setting
 */
let squaresNum = 9; //default value of the total numbers of cells.
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

  // reset game
  resetGame();

  // console.log("number of squares", squaresNum);
  //remove the previous one
  table.innerHTML = "";
  // create the new one
  createTable(squaresNum);
  return squaresNum;
};

// grids.addEventListener("change", changeGrids);

/**
 * --------------------------------------------------------------------------
 * WINNER CHECK RELATED FUNCTIONS
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
 * WINNING FUNCTION
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
 * SHOW THE GAME RESULT
 */
const showResult = function (player) {
  if (player === "tie") {
    endGame.innerHTML = `
            <p>${player.toUpperCase()}</p>
            <button>Continue</button>
        `;
  } else {
    endGame.innerHTML = `
            <p>Congrat! ${player.toUpperCase()} wins.</p>
            <button>Continue</button>
        `;
  }
  onOverlay();
  endGame.style.display = "block";

  /**
   * handle click on continue button
   */
  const handleClick = () => {
    //hide the game result popup
    endGame.style.display = "none";
    offOverlay();
    //reset the game
    resetGame();
  };
  const button = document.querySelector(".end-game button");
  console.log("button", button);
  button.addEventListener("click", handleClick);
};

/**
 * INITIALIZE THE GAME STATE
 */

// initialise game state
let gameState = {
  human: {
    token: "X",
    takenMoves: [],
    scores: 0,
  },
  opponent: {
    token: "O",
    takenMoves: [],
    scores: 0,
  },
  game: {
    rounds: 0,
    ties: 0,
  },
};
// console.log("game state", gameState);

// Update game state
const updateState = function (id, currentPlayer) {
  if (currentPlayer === humanToken) {
    gameState.human.takenMoves.push(id);
  } else {
    gameState.opponent.takenMoves.push(id);
  }
  return gameState;
};

// token now will present its player.
const humanToken = gameState.human.token;
const opponentToken = gameState.opponent.token;
// human will play first
let currentPlayer = humanToken;

/**
 * TOGGLE TURN
 */
const toggleTurn = function () {
  if (currentPlayer === humanToken) {
    currentPlayer = opponentToken;
  } else {
    currentPlayer = humanToken;
  }
  return currentPlayer;
};

/**
 * UPDATE RESULT IN THE INTERFACE
 */
const updateScores = function (player) {
  switch (player) {
    case humanToken:
      gameState.human.scores += 1;
      humanScores.innerHTML = gameState.human.scores;
      break;
    case opponentToken:
      gameState.opponent.scores += 1;
      opponentScores.innerHTML = gameState.opponent.scores;
      break;
    case "tie":
      gameState.game.ties += 1;
      tieScores.innerHTML = gameState.game.ties;
      break;
  }
};

/**
 * PLAY AND CHECK WINNER
 */
const playing = function (event) {
  //remove the event listener of settings button while playing
  // settingsButton.removeEventListener("click", showSettings);

  // console.log(event.target);
  if (
    event.target.classList.contains("square") &&
    !event.target.classList.contains("filled")
  ) {
    // write the token on the table and // style the token size depending on the square side.
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
    if (currentPlayer === humanToken) {
      takenMoves = gameState.human.takenMoves;
    } else {
      takenMoves = gameState.opponent.takenMoves;
    }
    // console.log("takenMoves", takenMoves);
    // console.log('scores', scores);

    if (takenMoves.length >= connect.value && win(takenMoves)) {
      showResult(currentPlayer);
      updateScores(currentPlayer);
      // console.log("new gameState", gameState);
    }

    if (takenMoves.length === Math.floor(squaresNum / 2) + 1) {
      showResult("tie");
      updateScores("tie");
    }
    toggleTurn();
  }
};

// table.addEventListener("click", playing);

/**
 * RESET GAME
 */

const resetGame = () => {
  const filledSquares = document.querySelectorAll(".filled");
  // console.log(filledSquares);
  // clear all tokens on the screen
  for (let node of filledSquares) {
    node.innerHTML = "";
    node.classList.remove("filled");
  }
  currentPlayer = humanToken;
  // remove all moves from the takenMoves by each player
  gameState.human.takenMoves.length = 0;
  gameState.opponent.takenMoves.length = 0;
};

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", resetGame);

/**
 * -------------------------------------------------------------------------
 * START GAME
 */
const start = () => {
  console.log("playing");
  settingsButton.addEventListener("click", showSettings);
  closeButton.addEventListener("click", closeSettings);
  grids.addEventListener("change", changeGrids);
  connect.addEventListener("change", changeConnect);
  table.addEventListener("click", playing);
};

start();

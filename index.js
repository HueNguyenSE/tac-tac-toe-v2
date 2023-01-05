/**
 * Elements
 */

const overlayEffect = document.querySelector('#overlay');
console.log('overlay', overlayEffect);

const settingsButton = document.querySelector('.settings-btn');
console.log('settings-btn', settingsButton);

const settingsContainer = document.querySelector('.settings-container');
console.log('settings-container', settingsContainer);

const closeButton = document.querySelector('.close');

const grids = document.querySelector('#grids');
console.log('grids', grids);

const connect = document.querySelector('#connect');
console.log('connect', connect);

const opponent = document.querySelector('#opponent');
console.log('opponent', opponent);

const sound = document.querySelector('#sound');
console.log('sound', sound);

const timeLimit = document.querySelector('#time-limit');
console.log('time limit s', timeLimit);

//table
const table = document.querySelector('.table');
console.log('table', table);

/**
 * On and off overlay effect
 */
const onOverlay = function () {
    overlayEffect.style.display = 'block';
}

const offOverlay = function () {
    overlayEffect.style.display = 'none';
}


/**
 * Open and close the settings
 */

// Open
const showSettings = function () {
    settingsContainer.style.display = 'block';
    onOverlay();
}

settingsButton.addEventListener('click', showSettings);

// Close
const closeSettings = function () {
    settingsContainer.style.display = 'none';
    offOverlay();
}

closeButton.addEventListener('click', closeSettings);

/**
 * Create square
 */

const createSquare = function (key, num) {
    //create a square div
    const square = document.createElement('div');
    // append it to the table
    table.append(square);
    // add the 'square' class to the div
    square.className = 'square';
    // add the id to the div
    square.id = key;
    // set height and width according to the total number of squares
    switch (num) {
        case 9:
            square.style.width = 'calc(90%/3)';
            square.style.paddingTop = 'calc(90%/3)';
            break;
        case 25:
            square.style.width = 'calc(90%/5)';
            square.style.paddingTop = 'calc(90%/5)';
            break;
        case 49:
            square.style.width = 'calc(90%/7)';
            square.style.paddingTop = 'calc(90%/7)';
            break;
        case 81:
            square.style.width = 'calc(90%/8.5)';
            square.style.paddingTop = 'calc(90%/8.5)';
            break;
        case 121:
            square.style.width = 'calc(90%/10.5)';
            square.style.paddingTop = 'calc(90%/10.5)';
            break;
    }

    square.style.position = 'relative';

    console.log('square', square);
    console.log('square side', square.style.height);
}

/**
 * Create the game table
 */

const createTable = function (num) {

    for (i = 0; i < num; i++) {
        (createSquare(i, num));
    }
};
// by default, display the table 3 x 3
createTable(9);

/**
 * create the grids (createTable) according to the setting
 */
const changeGrids = function (event) {
    // assign gridsValue to the target value
    let gridsValue = event.target.value;
    // define the total number of square accordingly
    let squaresNum = 0;
    switch (gridsValue) {
        case "three":
            squaresNum = 9;
            break;
        case "five":
            squaresNum = 25;
            break;
        case "seven":
            squaresNum = 49;
            break;
        case "nine":
            squaresNum = 81;
            break;
        case "eleven":
            squaresNum = 121;
            break;
    };
    console.log('number of squares', squaresNum);
    //remove the previous one
    table.innerHTML = '';
    // create the new one
    createTable(squaresNum);
}

grids.addEventListener('change', changeGrids);

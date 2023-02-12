# Tic Tac Toe V2

**Variants of Tic Tic Toe for you to play with**

## [Enter the game!](https://huenguyense.github.io/tac-tac-toe-v2/)

## Techstack

- Javascript
- HTML
- CSS
- Git

## Features

1. Algorithm to check the game's winner in any combination of board size and winning conditions, instead of hardcoded scenarios.
2. Select grid size varying from 3x3 to 11x11.
3. Select connect varying from 3 to 11.
4. Responsive design which is friendly with mobile devices

## Challenges

Some of the challenges:

1. Finding winning conditions that works in any combination of columns, rows and connections.
2. Structuring code to be readable and understandable.
3. Refactoring the algorithm that checks the game's winner.

## For improvements

- [ ]  Set timer for each move.
- [ ] Find a better solution for displaying the game board grid in terms of customisable columns and rows. I have decided not handle this feature. In the current version, I have provided the fixed choices of grids for a better display.
- [ ] Build a smart bot for human players to play against
- [x] Reset game.
- [ ] Write test cases.

## Acknowledgements

This project was completed at the 3rd week of the Software Engineering Immersive at General Assembly (Sydney) led by Dido and Chris (CJ) who are great instructors.

## Learning journal

### Finding algorithm

**Two key things undeneath** my solution for the algorithm to determine the game's winner in any combinations of grids and connects are:

1. Assume that human players are rational. Every single move is aimed to win the game. The algorithm will start with the latest move they take.
2. The game will end when a player scores first.

**In general, winning condition will be determined as the following steps**:

1. For the current player, from the latest move, scannning any other moves in each dimension of column, row, diagonal, and opposite diagonal.
2. Calculate the number of moves in each dimension.
3. If the number of moves in at least one dimensiion is equal or greater than the connects, the current player wins.
4. Otherwise, the game continues till there is no available spot.

**Code**
```javascript
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
```

**Lessons learned**:

1. Start fresh and avoid seeking solutions from the Internet. Only seek for information that helps me understand the problem. I've learned through iteratively ideating, testing the ideas, failing and trying another approach.
2. Generalise. Start with simple inputs, looking patterns, test them with more complex and special input. Pay attention to edge test cases when working with the special inputs.
3. Test soon. Testing ideas as they come. People probably call it as "fail quickly". Quick failures pushed me forward to brainstorm other approaches.

### Refactoring
The present code is refactored code. The first version was hard to understand and follow, even for me. It also violates DRY principles, and it is hard to debug. The total lines of code is more than 1000.

The refactored code tries to be DRY and a clear structure. It is 500 less than the previous version.

**Lessons learned**
1. Keep revising the code.Keep it DRY and structured. I don't write code for myself, I write it for other people to read. Who wants to read a messy code?

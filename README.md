# Tic Tac Toe Variants

**Different variants of Tic Tic Toe for you to play with**

## [Enter the game!](https://huenguyense.github.io/tictactoe-variants/)

## Techstack

- Javascript
- HTML
- CSS
- Git

## Features

1. Develop an algorithm to determin the winner of a game based on any board size and winning condition, rather than replying on hardcoded scenarios
2. (UI) Support grid sizes ranging from 3x3 to 11x11 and connections ranging from 3 to 11.
3. Ensure the game has a responsive design that is mobile-friendly.

## Challenges

1. Creating universal winning conditions.
2. Struturing readable and understandable code.
3. Refactoring winner-checking algorithms

## For improvements

- [x] Implement game reset function.
- [ ] Set timer for each move.
- [ ] Improve custimisable grid display.
- [ ] Write test cases.
- [ ] Develop intelligent bot as a component.

## Acknowledgements

This project was completed during the 3rd week of the Software Engineering Immersive at General Assembly (Sydney) instructed by Dido and Chris (CJ), who are great instructors.

## Learning journal

### Finding algorithm

**Two key things undeneath** The algorithm to determine the game's winner in any board size and winning condition is based on:

1. An assumption that a human player are rational. Every single move is aimed to win the game.
2. The game will end when a player scores first.

**Winner-checking algorithm psuedo-code**:

1. Scan for other moves in each dimension of column, row, diagonal, and opposite diagonal starting from the latest move.
2. Calculate the total number of consecutive moves in each dimension.
3. If at leat one total is greater than or equal to the required number f connections, the current player wins.
4. If not, switch to the other player's turn and continues the game.
5. Repeat steps 1-4 until all spots are taken.
6. If all spots are taken, and no player won, the game is a tie.

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

**Lessons**:

1. I only look for information that aids my comprehension of the problem. I learn by iterating through ideas, testing them out, and adjusting if they fail.
2. I generalise by beginning with straightforward inputs, examining patterns, then testing them with more intricate inputs. I take note of edge cases.
3. I test ideas as they arise and am not afraid to "fail quickly". Swift failures spur me to brainstorm new approaches.

### Refactoring & structuring code

**Original**: The code was hard to understand and follow, even for me, the creator. It also violates DRY principles, and it is hard to debug. The total lines of code is more than 1000 (including comments and spacing between code blocks).

**Refactored**: Addressesing the above issues, the current code is 500 lines shorter and strives to be DRY with a clear structure.

**Lessons learned**

1. Ensure the code DRY and structured since it is not solely for personal use, but for others to comprehend. Messy code is unappealing to most readers.

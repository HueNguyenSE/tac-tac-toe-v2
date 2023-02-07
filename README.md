# Tic Tac Toe V2

**Variants of Tic Tic Toe for you to play with**

## [Enter the game now!](https://huenguyense.github.io/tac-tac-toe-v2/)

## Quick View

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

1. Finding winning conditions that works in any combination of columns, rows and connections. [Read more](###finding-algorithms)
2. Structuring code to be readable and understandable. [Read more](###restructuring-code)
3. Refactoring the algorithm that checks the game's winner. [Read more](###refactoring)

## Ideas for improvements

1. Set timer for each move.
2. Find a better solution for displaying the game board grid in terms of customisable columns and rows. I have decided not handle this feature. In the current version, I have provided the fixed choices of grids for a better display.
3. Build a smart bot for human players to play against.

## Acknowledgements

This project was completed at the 3rd week of the Software Engineering Immersive at General Assembly (Sydney) led by Dido and Chris (CJ) who are great instructors.

## Learning journal

### Finding algorithm

I challenged myself to find the algorithm that can determines the game's winner in any combinations of grids and connects. Two key things undeneath my solution are:

1. The game will end when a player score the first time.
2. Assume that human players are rational. Every single move they take is aimed to win the game. Therefore the above reasons, I focus the latest move they take.

Winning condition will be determined as the following steps:

1. From the latest move, scannning any previous moves in each dimension of column, row, diagonal, and opposite diagonal.
2. Calculate the number of moves in each dimension.
3. If the number of moves in at least one dimensiion is equal or greater than the connects, the current player wins.
4. Otherwise, the game continues till there is no available spot.

**Lessons learned**: I didn't google algorithm for this game when I started the project, which later I realised most of available solutions in the Internet are the same with the hardcoded set of winning combinations. And I am not proud of myself about that. Searching for solutions would not be a bad idea. However, thanks to keeping my mind away from seeking an answer from the magic Internet, I have learned lessons about problem solving and being innovative.

1. Start fresh. Only seek for information that helps me understand the problem.
2. Generalise. Work with small and particular cases and look for patterns that will work for other cases.
3. Test soon and quick. Testing ideas as they come. People probably call it as "fail quickly". Quick failures pushed me forward to brainstorm other approaches.

### Restructuring code

### Refactoring algorithm

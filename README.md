
# Game modules API

## Current usage

```bash
npm i
npm start
# Or:
node runner.js ttt
node runner.js guessNextNumber
node runner.js isPrime
#...
```

## Games

Each game module (currently) is located at /games/GAMENAME/main.js and exposes these methods:

###getSpec

returns the game spec as a string.

* What format should this be in?
* Should it return the content or its location?

###getNumOfPlayers

returns the exact amount of players needed for the game.

* Should games be playable with a variable number of players?

###getPlayer

returns the path to an executable file that is a game player.

* This should be modified to return several different players, mainly for testing.

###getInitBoard

returns the initial board to be used by the first player.

###verifyMove

receives a players id, input and output, and returns an object that analyses the move:

```js
function verifyMove(
    stdin,  /* the input the player got */
    stdout, /* the output the player provided */
    player  /* the id of the player */
  ) {

  /* ... */

  return {
    prevBoard: stdin,       // The board on which the move was played
    move: move,             // the move played
    valid: valid,           // boolean, was the move valid
    board: board,           // the resulting board after the move
    gameResult: gameResult  // object that contains a 'scores' array, if the game is over.
  }
}
```

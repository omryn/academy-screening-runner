
## Game modules API

Each game module (currently) is located at /games/GAMENAME/main.js and exposes these methods:

###getSpec

returns the game spec as a string.

###getNumOfPlayers

returns the exact amount of players needed for the game.

###getPlayer

returns the path to an executable file that is a game player.

###getInitBoard

returns the initial board to be used by the first player.

###verifyMove

receives a players id, input and output, and returns an object that analyzes the move:

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

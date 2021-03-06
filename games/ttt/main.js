'use strict';


var winnings = (function(){
  var winningDiag = [[1,5,9], [3,5,7]]
  var winningRows = [1,4,7].map(function(i){return [i, i+1, i+2]})
  var winningCols = [1,2,3].map(function(i){return [i, i+3, i+6]})
  var winnings = [].concat(winningDiag, winningRows, winningCols)
  return winnings
})()

function getSpec() {
  return [
    'Spec:',
    'Player 1 is X, player 2 is O.',
    'Input: board in format B#########.',
    'Output: cell played (1-9) and game state [win, tie, play].',
    'made for ' + getNumOfPlayers() + ' players.\n'].join('\n')
}

function getNumOfPlayers() {
  return 2
}

var gameResult
var scores = [2,2]

function getInitBoard() {
  return 'B#########'
}

function getPlayer() {
  return __dirname + '/player.js'
}

function verifyMove(stdin, stdout, player) {
  var output = stdout.split('\n')
  var play = output[0]
  var status = output[1]

  var playerSign = stdin.replace(/[BXO]/g,'').length%2 ? 'X' : 'O' //TODO: should get player from runner
  var boardArray = stdin.split('')
  boardArray[play] = playerSign

  var win = winnings.some(function(line) {
    return !line.some(function(index){ return boardArray[index] !== playerSign; })
  })
  var tie = boardArray.indexOf('#') === -1

  var correctStatus = tie ? 'tie' : (win ? 'win' : 'play')

  if (win || tie) {
    if (win) {
      scores[player]++ //3
      scores[1 - player]-- //1
    }
    gameResult = {
      scores: scores
    }
  }

  var statusValid = status === correctStatus
  var moveValid = true //TODO: varify move

  return {
    prevBoard: stdin,
    move: play,
    valid: statusValid && moveValid,
    board: boardArray.join(''),
    gameResult: gameResult
  }

}






module.exports = {
  getSpec: getSpec,
  getNumOfPlayers: getNumOfPlayers,
  getPlayer: getPlayer,
  getInitBoard: getInitBoard,
  verifyMove: verifyMove
}

'use strict';


var winnings = (function(){
  var winningDiag = [[1,5,9], [3,5,7]]
  var winningRows = [1,4,7].map(function(i){return [i, i+1, i+2]})
  var winningCols = [1,2,3].map(function(i){return [i, i+3, i+6]})
  var winnings = [].concat(winningDiag, winningRows, winningCols)
  return winnings
})()

function getSpec() {
  return 'this is the spec: player 1 is X, player 2 is O. Output cell played (1-9) and game state [win, tie, play]. go ahead...'
}

function getNumOfPlayers() {
  return 2
}

function getInitBoard() {
  return 'B#########'
}

function getPlayer() {
  return __dirname + '/tttPlayer.js'
}

function verifyMove(stdin, stdout, player) {
  var output = stdout.split('\n')
  var play = output[0]
  var status = output[1]

  player = stdin.replace(/[BXO]/g,'').length%2 ? 'X' : 'O' //TODO: should get player from runner
  var boardArray = stdin.split('')
  boardArray[play] = player

  var win = winnings.some(function(line) {
    return !line.some(function(index){ return boardArray[index] !== player; })
  })
  var tie = boardArray.indexOf('#') === -1

  var correctStatus = tie ? 'tie' : (win ? 'win' : 'play')

  //TODO: varify move, calculate result, and return:

  return {
    status: status,
    board: boardArray.join('')
  }
}






module.exports = {
  getSpec: getSpec,
  getNumOfPlayers: getNumOfPlayers,
  getPlayer: getPlayer,
  getInitBoard: getInitBoard,
  verifyMove: verifyMove
}

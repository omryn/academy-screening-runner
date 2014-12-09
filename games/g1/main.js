'use strict';


function getSpec() {
  return 'Pick the number played in the previous turn plus one to win. Pick the exact same number to tie.'
}

function getNumOfPlayers() {
  return 4
}

function getInitBoard() {
  return '0'
}

function getPlayer() {
  return __dirname + '/player.js'
}

function verifyMove(stdin, stdout, player) {
  var output = stdout.split('\n')
  var number = parseInt(stdin, 10)
  var play = parseInt(output[0], 10)
  var status = parseInt(output[1], 10)

  var status = (number === play) ? 'tie' : ((number + 1 === play) ? 'win' : 'play')

  //TODO: varify move, calculate result, and return:

  return {
    status: status,
    board: play
  }
}






module.exports = {
  getSpec: getSpec,
  getNumOfPlayers: getNumOfPlayers,
  getPlayer: getPlayer,
  getInitBoard: getInitBoard,
  verifyMove: verifyMove
}

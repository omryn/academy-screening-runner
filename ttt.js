'use strict';

function getSpec() {
  return 'this is the spec: player 1 is X, player 2 is O. Output cell played (1-9) and game state [win, tie, play]. go ahead...'
}

function getInitBoard() {
  return 'B#########'
}

function getPlayer() {
  return __dirname + '/tttPlayer.js'
}

function verifyMove(stdin, stdout, player) {

}






module.exports = {
  getSpec: getSpec,
  getPlayer: getPlayer,
  getInitBoard: getInitBoard,
  verifyMove: verifyMove
}

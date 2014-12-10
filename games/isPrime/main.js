'use strict';


function getRandNumber() {
  return String(Math.floor(2 + Math.random() * 1000))
}

function isPrime1(n) {
  if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false;
  var m=Math.sqrt(n);
  for (var i=2;i<=m;i++) if (n%i==0) return false;
  return true;
}

////////////////////////


function getSpec() {
  return 'Return "true" if the number is prime, "false" otherwise.'
}

function getNumOfPlayers() {
  return 3
}

function getInitBoard() {
  return getRandNumber()
}

function getPlayer() {
  return __dirname + '/player.js'
}

function verifyMove(stdin, stdout, player) {
  var output = stdout.split('\n')
  var number = parseInt(stdin, 10)
  var answer = output[0]

  var prime = isPrime1(number)
  var status = (String(prime) === answer) ? 'win' : 'lose'

  //TODO: varify move, calculate result, and return:

  return {
    prevBoard: stdin,
    move: answer,
    status: status,
    board: getRandNumber()
  }
}






module.exports = {
  getSpec: getSpec,
  getNumOfPlayers: getNumOfPlayers,
  getPlayer: getPlayer,
  getInitBoard: getInitBoard,
  verifyMove: verifyMove
}

'use strict';


function getRandNumber() {
  return String(Math.floor(2 + Math.random() * 10))
}

function isPrime1(n) {
  if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false;
  var m=Math.sqrt(n);
  for (var i=2;i<=m;i++) if (n%i==0) return false;
  return true;
}

var gameResult
var scores = Array.apply(null, {length: getNumOfPlayers() }).map(function(){return 0})

////////////////////////

function getSpec() {
  return [
    'Spec:',
    'Check if the number is prime or not, until someone gets it wrong.',
    'A correct answer is worth a point, an incorrect one costs 8 points',
    'Input: a number',
    'Output: "true" or "false"',
    'made for ' + getNumOfPlayers() + ' players.\n'].join('\n')
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


  if (String(prime) === answer) {
    scores[player] = (scores[player] || 0) + 1
  } else {
    scores[player] = Math.max(0, scores[player] - 8)
    gameResult = {
      scores: scores
    }
  }

  var valid = true

  //TODO: varify move, calculate result, and return:

  return {
    prevBoard: stdin,
    move: answer,
    valid: valid,
    board: getRandNumber(),
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

'use strict'

var Q = require('q')
var exec = require('child_process').exec

function getGame(name) {
  var gameModule = require('./games/' + name + '/main.js')
  var requiredMethods = ['getSpec', 'getNumOfPlayers', 'getPlayer', 'getInitBoard', 'verifyMove']
  var missingMethods = requiredMethods.filter(function(method) { return !gameModule[method] })
  if (missingMethods.length) throw new Error('Game module ""' + name + '"" is missing: ' + JSON.stringify(missingMethods))
  return gameModule
}


// var gameModule1 = getGame('ttt')
// var gameModule1 = getGame('guessNextNumber')
var gameModule1 = getGame('isPrime')

console.log(gameModule1.getSpec())

var numOfPlayers = gameModule1.getNumOfPlayers()
var players = Array.apply(null, {length: numOfPlayers}).map(gameModule1.getPlayer) //TODO: get from...


function runPlayer(input, turn) {
  var deferred = Q.defer();
  var play = exec(players[turn] + ' ' + input, function(error, stdout, stderr) {
    if (error || stderr) {
      deferred.reject(new Error(error || stderr))
    } else {
      deferred.resolve(stdout);
    }
  })
  setTimeout(function() {
    play.kill('SIGHUP')
    deferred.reject(new Error('play took too much time'))
  }, 1000)
  return deferred.promise;
}

function move(input, turn) {
  return runPlayer(input, turn)
    .then(function(output) {
      var res = gameModule1.verifyMove(input, output, turn)
      console.log(res)
      return res
    })
}

function game(board, turn) {
  return move(board, turn)
    .then(function(res) {
      if (res.gameResult) {
        console.log('game over.')
        return res.gameResult
      } else {
        return game(res.board, (turn + 1) % numOfPlayers)
      }
    })
}


game(gameModule1.getInitBoard(), 0)
  .then(console.log.bind(console))
  .catch(function(e) {console.log('caught error: ' + e)})

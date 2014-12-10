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

function runPlayer(input, player) {
  var deferred = Q.defer();
  var play = exec(player + ' ' + input, function(error, stdout, stderr) {
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

////////////////////////////////////////////////////////////////////////////////

var games = require('fs').readdirSync('games')
var gameName = process.argv[2] || 'ttt'

try {
  var gameModule = getGame(gameName)
} catch(e) {
  throw new Error('no such game: ' + gameName)
}

var numOfPlayers = gameModule.getNumOfPlayers()
var players = Array.apply(null, {length: numOfPlayers}).map(gameModule.getPlayer) //TODO: get from...


function move(input, turn) {
  var playerId = turn % numOfPlayers
  return runPlayer(input, players[playerId])
    .then(function(output) {
      var res = gameModule.verifyMove(input, output, playerId)
      console.log(res)
      return res
    })
}

function game(board, turn) {
  if (turn === 0) console.log(gameModule.getSpec())
  return move(board, turn)
    .then(function(res) {
      if (res.gameResult) {
        console.log('game over.')
        return res.gameResult
      } else {
        return game(res.board, turn + 1)
      }
    })
}

////////////////////////////////////////////////////////////////////////////////

game(gameModule.getInitBoard(), 0)
  .then(console.log.bind(console))
  .catch(function(e) {console.log('caught error: ' + e)})

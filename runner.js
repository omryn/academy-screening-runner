'use strict'

var Q = require('q')
var exec = require('child_process').exec

function getGame(name) {
  return require('./games/' + name + '/main.js')
}


// var gameModule1 = getGame('ttt')
// var gameModule1 = getGame('g1')
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
      var res = gameModule1.verifyMove(input, output)
      console.log(res)
      return res
    })
}

function game(board, turn) {
  return move(board, turn)
    .then(function(res) {
      if (res.status === 'win') {
        console.log('game over with win for player ' + turn + '.')
        return { winner: turn }
      } else if (res.status === 'tie') {
        console.log('game over: ' + res.board)
        return { winner: null }
      } else {
        return game(res.board, (turn + 1) % numOfPlayers)
      }
    })
}


game(gameModule1.getInitBoard(), 0)
  .then(console.log.bind(console))
  .catch(function(e) {console.log('caught error: ' + e)})

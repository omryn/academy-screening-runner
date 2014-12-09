'use strict'

var Q = require('q')
var exec = require('child_process').exec
var gameModule1 = require('./ttt.js')

console.log(gameModule1.getSpec())

var player = gameModule1.getPlayer()

function runPlayer(input) {

  var deferred = Q.defer();
  var play = exec(player + ' ' + input, function(error, stdout, stderr) {
    if (error !== null) {
      deferred.reject(new Error(error))
    } else if (stderr) {
      deferred.reject(new Error(stderr))
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

function move(input) {
  return runPlayer(input)
    .then(function(output) {
      var res = gameModule1.verifyMove(input, output)
      console.log(res)
      return res
    })
}

function game(board) {
  return move(board)
    .then(function(res) {
      if (res.status === 'win') {
        console.log('game over: ' + res.board)
      } else if (res.status === 'tie') {
        console.log('game over: ' + res.board)
      } else {
        return game(res.board)
      }
    })
}

game(gameModule1.getInitBoard())
  .then(console.log.bind(console))
  .catch(function(e) {console.log('caught error: ' + e)})

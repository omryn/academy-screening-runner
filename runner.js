'use strict'

var Q = require('q')
var exec = require('child_process').exec
var gameModule1 = require('./ttt.js')



console.log(gameModule1.getSpec())

var player = gameModule1.getPlayer()
var board = gameModule1.getInitBoard()


function move() {
  var deferred = Q.defer();
  var play = exec(player + ' ' + board, function(error, stdout, stderr) {
    if (error !== null) {
      deferred.reject(new Error(error))
    } else if (stderr) {
      deferred.reject(new Error(stderr))
    } else {
      board = stdout
      deferred.resolve(stdout);
    }
    // console.log('stdout: ' + stdout)
    // console.log('stderr: ' + stderr)
  })
  // play.kill('SIGHUP')
  return deferred.promise;
}


move()
  .then(move)
  .then(console.log.bind(console))
  .catch(function(e) {console.log(e)})

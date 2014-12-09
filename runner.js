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
    // console.log('stdout: ' + stdout)
    // console.log('stderr: ' + stderr)
  })
  // play.kill('SIGHUP')
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

Q(gameModule1.getInitBoard())
  .then(move)
  .then(move)
  .then(move)
  .then(move)
  .then(move)
  .then(move)
  .then(move)
  .then(move)
  .then(move)
  .then(console.log.bind(console))
  .catch(function(e) {console.log(e)})

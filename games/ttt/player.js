#!/usr/bin/env node

var board = process.argv[2]

var playerSign = board.replace(/[BXO]/g,'').length%2 ? 'X' : 'O'

var boardArray = board.split('')

var play
while (board[play] !== '#') { play = Math.floor(Math.random() * board.length) }
// var play = board.indexOf('#')

boardArray[play] = playerSign

var winningDiag = [[1,5,9], [3,5,7]]
var winningRows = [1,4,7].map(function(i){return [i, i+1, i+2]})
var winningCols = [1,2,3].map(function(i){return [i, i+3, i+6]})
var winnings = [].concat(winningDiag, winningRows, winningCols)

var win = winnings.some(function(line) {
  return !line.some(function(index){ return boardArray[index] !== playerSign; })
})

var tie = boardArray.indexOf('#') === -1

var status = tie ? 'tie' : (win ? 'win' : 'play')

console.log(play)
console.log(status)


// setTimeout(function(){}, 2000)

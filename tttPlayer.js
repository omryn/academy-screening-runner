#!/usr/bin/env node

var board = process.argv[2]

var player = board.replace(/[BXO]/g,'').length%2 ? 'X' : 'O'

var boardArray = board.split('')
boardArray[board.indexOf('#')] = player
board = boardArray.join('')

console.log(board)

// setTimeout(function(){}, 2000)

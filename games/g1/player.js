#!/usr/bin/env node

var board = process.argv[2]

var number = parseInt(board, 10)

var play = Math.floor(Math.random() * 20) + number

var status = (number === play) ? 'tie' : ((number + 1 === play) ? 'win' : 'play')

console.log(play)
console.log(status)

#!/usr/bin/env node

function isPrime1(n) {
  if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false;
  var m=Math.sqrt(n);
  for (var i=2;i<=m;i++) if (n%i==0) return false;
  return true;
}

var board = process.argv[2]
var number = parseInt(board, 10)
var play = (Math.random() > 0.2) ? isPrime1(number) : number%2 != 0

console.log(play)

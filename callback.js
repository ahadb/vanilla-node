'use strict'

var fs = require('fs')
var num = 0

function addTwo(callback) {
  fs.readFile('num.txt', 'utf8', function(err, numData) {
    if (!err && numData) {
      numData = parseInt(numData)
      num += numData
      callback()
    }
  })
}

function logNum() {
  console.log(num)
}

addTwo(logNum)
// => 3
addTwo(logNum)
// => 5

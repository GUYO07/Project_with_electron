const fs = require("fs");
var pos = require("./position");
var h = 100
var w = 150
var X = 75
var Y = 60
var x = pos.position(X , X + w, Y, Y + h, 100, 15 / 3);
console.log(x[0][x[0].length-1]);

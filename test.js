const math = require("mathjs");
/*const mA = math.matrix([[2, 0.3, 4, 0]]);
const mB = math.matrix([
  [5 ** 3, 3 * 5 ** 2, 10 ** 3, 300],
  [25, 10, 100, 20],
  [5, 1, 10, 1],
  [1, 0, 1, 0],
]);*/
var t = [10.20000002, 10.69999999+10.20000002];
var p = [0.05, 0.11];
var s = [4.901960776, 5.607476642];
const mA = math.matrix([[p[0], s[0], p[1], s[1]]]);
const mB = math.matrix([
  [t[0] ** 3, 3 * t[0] ** 2, t[1] ** 3, 3*t[1]**2],
  [t[0]**2, t[0]*2, t[1]**2, t[1]*2],
  [t[0], 1,t[1], 1],
  [1, 0, 1, 0],
]);
// Matrix Multiplication
const matrixMult = math.multiply(mA, math.inv(mB));
//console.log(mB);
console.log(matrixMult.valueOf()[0]);

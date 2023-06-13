/*const fs = require("fs");
var pos = require("./position");
var h = 100
var w = 150
var X = 75
var Y = 60
var x = pos.position(X , X + w, Y, Y, 100, 25 / 3);
console.log(x[0]);*/

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  //theta*=2;
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  return theta;
}
function angle360(cx, cy, ex, ey) {
  var theta = angle(cx, cy, ex, ey); // range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

var x=angle360(1,5,1,-5);
console.log(x);
/*let Controller = require("node-pid-controller");
function pid(s) {
    let ctr = new Controller({
      k_p: 1, //1
      k_i: 0.02, //0.05
      k_d: 0.01, //.002
      dt: 0, //0
    });
    ctr.setTarget(s); // 120km/h
    let output = Math.abs(5);
    let input = ctr.update(output);
    console.log(input);
}
pid(10);*/
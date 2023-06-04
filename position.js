function position(xstart,xstop,ystart,ystop,t,speed) {
  var xdistance = xstop - xstart; // mm
  var ydistance = ystop - ystart; // mm
  var x = [];
  var y = [];
  var x0 = xstart;
  var y0 = ystart;
  var x1 = xstop;
  var y1 = ystop;
  var d = Math.sqrt(xdistance ** 2 + ydistance ** 2);
  var dt = speed * t/1000; //mm
  var T = dt / d;
  x.push(xstart);
  y.push(ystart);
  do {
    x.push((1 - T) * x0 + T * x1);
    y.push((1 - T) * y0 + T * y1);
    dt += speed * t/1000; //mm
    T = dt / d;
  } while (x[x.length - 1] <= x1);
  x[x.length - 1] = x1;
  y[y.length - 1] = y1;

  return [x,y]
}

module.exports = { position };
function position(xstart, xstop, ystart, ystop, t, speed) {
  var xdistance = Math.abs(xstop - xstart); // mm
  var ydistance = Math.abs(ystop - ystart); // mm
  var x = [];
  var y = [];
  if (xstart < xstop) {
    var x0 = xstart;
    var x1 = xstop;
  } else if (xstart > xstop) {
    var x1 = xstart;
    var x0 = xstop;
  }
  else if (xstart == xstop) {
    var x1 = xstart;
    var x0 = xstop;
  }
  if (ystart < ystop) {
    var y0 = ystart;
    var y1 = ystop;
  } else if (ystart > ystop) {
    var y1 = ystart;
    var y0 = ystop;
  }
  else if (ystart == ystop) {
    var y1 = ystart;
    var y0 = ystop;
  }
  var d = Math.sqrt(xdistance ** 2 + ydistance ** 2);
  var dt = (speed * t) / 1000; //mm
  var T = dt / d;
  x.push(x0);
  y.push(y0);
  do {
    if (xstart == xstop) {
      x.push(xstart);
    } else if(xstart != xstop){
      x.push((1 - T) * x0 + T * x1);
    }
    if (ystart == ystop) {
      y.push(ystart);
    } else if (ystart != ystop){
      y.push((1 - T) * y0 + T * y1);
    }

    dt += (speed * t) / 1000; //mm
    T = dt / d;
  } while (x[x.length - 1] <= x1&&y[y.length - 1] <= y1);

  x[x.length - 1] = x1;
  y[y.length - 1] = y1;
  if (ystart > ystop) {
    y.reverse();
  }
  if (xstart > xstop) {
    x.reverse();
  }
  return [x, y];
}

module.exports = { position };

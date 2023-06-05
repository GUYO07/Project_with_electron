function position(center_x, center_y, radius, t, Speed ) {
  var c = 2 * Math.PI * radius;

  const numPoints = c / (Speed*t/1000);

  const angleStep = (2 * Math.PI) / numPoints;

  var X = [];
  var Y = [];

  // คำนวณหาตำแหน่งของจุดบนเส้นรอบวง
  for (let i = 0; i < numPoints; i++) {
    var theta = i * angleStep;
    var x = center_x + radius * Math.cos(theta);
    var y = center_y + radius * Math.sin(theta);
    X.push(x);
    Y.push(y);
  }

  return [X, Y];
}

module.exports = { position };

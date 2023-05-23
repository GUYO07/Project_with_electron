function position(center_x, center_y, radius, t, Speed ) {
  var c = 2 * Math.PI * radius;

  const numPoints = c / (Speed*t);

  const angleStep = (2 * Math.PI) / numPoints;

  var X = [];
  var Y = [];

  // คำนวณหาตำแหน่งของจุดบนเส้นรอบวง
  for (let i = 0; i < numPoints; i++) {
    const theta = i * angleStep;
    const x = center_x + radius * Math.cos(theta);
    const y = center_y + radius * Math.sin(theta);
    X.push(x);
    Y.push(y);
  }

  return [x, y];
}

module.exports = { position };

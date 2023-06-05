
const fs = require("fs");
var pos = require("./position_circle");
var x = pos.position(
  147,
  116,
  52,
  100,
  20 / 3
);
//console.log(x);
const jsonArray = [];
for (var i = 0; i <= x[0].length; i++) {
  var obj = {
    x: x[0][i],
    y: x[1][i],
  };
  jsonArray.push(obj);
}

const jsonData = JSON.stringify(jsonArray);

fs.writeFile("data.json", jsonData, "utf8", (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("JSON data saved to file.");
  }
});

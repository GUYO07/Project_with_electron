const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const port2 = new SerialPort({ path: "COM7", baudRate: 115200 });
const parser = port2.pipe(new ReadlineParser({ delimiter: "\r\n" }));
parser.on("data", (data) => {
  var str = data;
  var n = str.split(" ");
  var posiotion_x=n[0];
  var posiotion_y=n[1];
  var limit_x1=n[2];
  var limit_x2=n[3];
  var limit_x3=n[4];
  var limit_x4=n[5];
  console.log(data);
});

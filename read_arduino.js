const { SerialPort } = require("serialport");
const { ReadlineParser } = require('@serialport/parser-readline');
let port;

function read() {
  return new Promise((resolve, reject) => {
    var parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
    parser.on('data', console.log)
    parser.on("data", function (data) {
      resolve(data);
    });
  });
}
function set(p) {
  port = new SerialPort({
    path: p,
    baudRate: 115200,
  });
}
module.exports = { read, set };

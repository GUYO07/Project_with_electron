const { SerialPort } = require("serialport");
let port;
function send(input) {
  port.write(input.toString());
}
function set(p){
  port = new SerialPort({
    path: p,
    baudRate: 115200,
  });
}
module.exports = { send , set};
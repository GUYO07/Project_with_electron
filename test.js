const { SerialPort } = require("serialport");
const { ReadlineParser } = require('@serialport/parser-readline');
const port2 = new SerialPort({ path: 'COM4', baudRate: 9600 });
const parser = port2.pipe(new ReadlineParser({ delimiter: "\r\n" }));
parser.on("data", (data) => {
  console.log(data);
});

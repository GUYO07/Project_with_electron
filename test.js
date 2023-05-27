/*const { SerialPort } = require("serialport");
const { ReadlineParser } = require('@serialport/parser-readline');
const port2 = new SerialPort({ path: 'COM7', baudRate: 115200 });
const parser = port2.pipe(new ReadlineParser({ delimiter: "\r\n" }));
parser.on("data", (data) => {
  console.log(data);
});*/
var str = "รับเขียนเว็บ รับเขียนเว็บไซต์ รับสอนเขียนโปรแกรม รับทำเว็บไซต์";
var n = str.split(' ');
for( var i=0; i<n.length; i++ ) {
     
  console.log(n[i]);
 
}
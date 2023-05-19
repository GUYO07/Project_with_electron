const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
set();
function set(){
  dataArr=0;
}
function createSerialParser() {
  const port = new SerialPort({ path: 'COM6', baudRate: 115200 });
  const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

  // Create an array to store the received data
  parser.on('data', (data) => {
    dataArr=data;
    console.log(dataArr);
  });
  
  // Return the data array
  return dataArr;
}

// Call the function to create the parser and receive the data
const read = createSerialParser();

// Export the data array
module.exports = read;

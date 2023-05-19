const { SerialPort } = require('serialport')
const port = new SerialPort({
    path: 'COM3',
    baudRate: 115200,
  });

// Read the port data
port.on("open", () => {
  console.log('serial port open');
});
port.on('data', function (data) {
    console.log( data.toString())
})
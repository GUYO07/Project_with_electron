const x = require('serialport');
const fs = require('fs');
const getPortsList = () => {
  return x.SerialPort.list().then(ports => {
    const portsList = ports.map(port => port.path);
    return portsList;
  });
};

getPortsList()
  .then(result => console.log(result))
  .catch(error => console.error('Error:', error));

module.exports = {getPortsList};

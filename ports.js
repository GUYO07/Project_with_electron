const x = require('serialport');
const getPortsList = () => {
  return x.SerialPort.list().then(ports => {
    const portsList = ports.map(port => port.path);
    return portsList;
  });
};

module.exports = {getPortsList};

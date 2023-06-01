const arduino = require("./ports");
const send = require("./write_arduino");
const send2 = require("./write_arduino");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const position = require("./position");
const fs = require("fs");
arduino
  .getPortsList()
  .then((result) => {
    if (result.length > 0) {
      console.log(result);
      var select = document.getElementById("port1");
      var select2 = document.getElementById("port2");
      var select3 = document.getElementById("port_read1");
      var options = result;
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select2.appendChild(el);
      }
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select3.appendChild(el);
      }
    } else {
      console.log("No available ports found.");
      // Handle the case when no ports are found
    }
  })
  .catch((error) => console.error("Error:", error));

set_parameter();
function set_parameter() {
  s1 = -1;
  s2 = -1;
  c_1 = 0;
  c_2 = 0;
  ps = 0;
  posiotion_x = 0;
  posiotion_y = 0;
  limit_x1 = 0;
  limit_x2 = 0;
  limit_y3 = 0;
  limit_y4 = 0;
}

function port_select1() {
  var e = document.getElementById("port1");
  var value = e.value;
  document.getElementById("demo").innerHTML = value;
  send.set(value);
}
function port_read1() {
  var e = document.getElementById("port_read1");
  var value = e.value;
  const port2 = new SerialPort({ path: value, baudRate: 115200 });
  const parser = port2.pipe(new ReadlineParser({ delimiter: "\r\n" }));
  parser.on("data", (data) => {
    ps = data;
    var str = data;
    var n = str.split(" ");
    posiotion_x = Number(n[0]);
    posiotion_y = Number(n[1]);
    limit_x1 = Number(n[2]);
    limit_x2 = Number(n[3]);
    limit_y3 = Number(n[4]);
    limit_y4 = Number(n[5]);
    document.getElementById("position1").innerHTML = data;
    if (limit_x1 == 1) {
      send.send(4);
      setTimeout(() => {
        send.send(5);
      }, 1000);
    }
    if (limit_x2 == 1) {
      //port2.write('1');
      send.send(6);
      setTimeout(() => {
        send.send(5);
      }, 1000);
      port2.write('1', function(err) {
        if (err) {
          return console.log('Error on write: ', err.message)
        }
        console.log('message written 1')
      })
      setTimeout(() => {
        port2.write('0', function(err) {
          if (err) {
            return console.log('Error on write: ', err.message)
          }
          console.log('message written 0')
        })
      }, 3000);
      /*port2.write('0', function(err) {
        if (err) {
          return console.log('Error on write: ', err.message)
        }
        console.log('message written 0')
      })*/
    }
    if (limit_y3 == 1) {
      send2.send(604);
      setTimeout(() => {
        send2.send(5);
      }, 1000);
    }
    if (limit_y4 == 1) {
      send2.send(606);
      setTimeout(() => {
        send2.send(5);
      }, 1000);
    }
  });
}
function port_select2() {
  var e = document.getElementById("port2");
  var value = e.value;
  document.getElementById("demo2").innerHTML = value;
  p2 = value;
  send2.set(value);
}

c1();
function c1() {
  // Get the checkbox
  var checkBox = document.getElementById("c1");
  if (checkBox.checked == true) {
    c_1 = 6;
  } else {
    c_1 = 4;
  }
  cb1();
}

c2();
function c2() {
  // Get the checkbox
  var checkBox = document.getElementById("c2");
  if (checkBox.checked == true) {
    c_2 = 6;
  } else {
    c_2 = 4;
  }
  cb2();
}

const value1 = document.querySelector("#speed1");
const input1 = document.querySelector("#sp1");
value1.textContent = input1.value;
input1.addEventListener("input", (event) => {
  value1.textContent = event.target.value;
  if (event.target.value == 25) {
    s1 = 0;
  } else if (event.target.value == 24) {
    s1 = 10 * 30;
  } else if (event.target.value == 23) {
    s1 = 10 * 60;
  } else if (event.target.value == 22) {
    s1 = 10 * 90;
  } else if (event.target.value == 21) {
    s1 = 10 * 120;
  } else if (event.target.value == 20) {
    s1 = 10 * 150;
  } else if (event.target.value == 19) {
    s1 = 10 * 180;
  } else if (event.target.value == 18) {
    s1 = 10 * 230;
  } else if (event.target.value == 17) {
    s1 = 10 * 280;
  } else if (event.target.value == 16) {
    s1 = 10 * 330;
  } else if (event.target.value == 15) {
    s1 = 10 * 380;
  } else if (event.target.value == 14) {
    s1 = 10 * 450;
  } else if (event.target.value == 13) {
    s1 = 10 * 530;
  } else if (event.target.value == 12) {
    s1 = 10 * 630;
  } else if (event.target.value == 11) {
    s1 = 10 * 730;
  } else if (event.target.value == 10) {
    s1 = 10 * 830;
  } else if (event.target.value == 9) {
    s1 = 10 * 1000;
  } else if (event.target.value == 8) {
    s1 = 10 * 1200;
  } else if (event.target.value == 7) {
    s1 = 10 * 1400;
  } else if (event.target.value == 6) {
    s1 = 10 * 1700;
  } else if (event.target.value == 5) {
    s1 = 10 * 2500;
  } else if (event.target.value == 4) {
    s1 = 10 * 2800;
  } else {
    s1 = 10 * 28000;
  }
  cb1();
});

const value2 = document.querySelector("#speed2");
const input2 = document.querySelector("#sp2");
value2.textContent = input2.value;
input2.addEventListener("input", (event) => {
  value2.textContent = event.target.value;
  if (event.target.value == 25) {
    s2 = 10 * 60;
  } else if (event.target.value == 24) {
    s2 = 10 * 58;
  } else if (event.target.value == 23) {
    s2 = 10 * 55;
  } else if (event.target.value == 22) {
    s2 = 10 * 52;
  } else if (event.target.value == 21) {
    s2 = 10 * 49;
  } else if (event.target.value == 20) {
    s2 = 10 * 45;
  } else if (event.target.value == 19) {
    s2 = 10 * 42;
  } else if (event.target.value == 18) {
    s2 = 10 * 38;
  } else if (event.target.value == 17) {
    s2 = 10 * 34;
  } else if (event.target.value == 16) {
    s2 = 10 * 30;
  } else if (event.target.value == 15) {
    s2 = 10 * 27;
  } else if (event.target.value == 14) {
    s2 = 10 * 25;
  } else if (event.target.value == 13) {
    s2 = 10 * 22;
  } else if (event.target.value == 12) {
    s2 = 10 * 17;
  } else if (event.target.value == 11) {
    s2 = 10 * 13;
  } else if (event.target.value == 10) {
    s2 = 10 * 10;
  } else if (event.target.value == 9) {
    s2 = 10 * 9;
  } else if (event.target.value == 8) {
    s2 = 10 * 7;
  } else if (event.target.value == 7) {
    s2 = 10 * 6;
  } else if (event.target.value == 6) {
    s2 = 10 * 5;
  } else if (event.target.value == 5) {
    s2 = 10 * 3;
  } else if (event.target.value == 4) {
    s2 = 10 * 2;
  } else if (event.target.value == 3) {
    s2 = 10 * 1;
  } else if (event.target.value == 2) {
    s2 = 10 * 1;
  } else if (event.target.value == 1) {
    s2 = 10 * 1;
  }
  cb2();
});

function cb1() {
  // Get the checkbox
  var checkBox = document.getElementById("cb1");
  if (checkBox.checked == false) {
    console.log(s1 + c_1);
    send.send(s1 + c_1);
    //get_p();
    //get_p2();
  } else {
    console.log(5);
    if (s1 > -1 && c_1 > 0) {
      send.send(5);
    }
  }
}

function cb2() {
  var checkBox = document.getElementById("cb2");
  if (checkBox.checked == false) {
    if (c_2 == 4) {
      s2 - 3;
    }
    console.log(s2 + c_2);
    send2.send(s2 + c_2);
    //get_p3();
  } else {
    console.log(5);
    if (s2 > -1 && c_2 > 0) {
      send2.send(5);
    }
  }
}

function delayLog(value, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      //console.log(value);
      resolve();
    }, delay);
  });
}

async function get_p() {
  var x = [];
  var t = [];
  for (let i = 0; i >= 0; i++) {
    console.log(i);
    if (Number(ps) >= 10) {
      send.send(5);
    }
    if (((x[i - 1] - x[i - 2]) / t[i - 1]) * 1000 == 0) {
      break;
    }
    const start = performance.now();
    await delayLog(i, 10);
    x.push(ps);
    const end = performance.now();
    t.push(end - start);
  }
  console.log(x);

  //document.getElementById("time").innerHTML = x;

  const jsonArray = [];

  for (let i = 0; i < x.length; i++) {
    if (i > 0) {
      var s = ((x[i] - x[i - 1]) / t[i]) * 1000;
    } else {
      var s = 0;
    }
    const obj = {
      Sample_time: i,
      Position: x[i],
      Speed: s,
      Time: t[i],
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
}

async function get_p2() {
  var Speed = 18 / 3; // mm/s=rpm*20 mm /60 s
  var result = position.position(10, 20, 10, 20, 0.1, Speed);
  var x_rep = result[0];
  console.log(x_rep);
  console.log(typeof x_rep[0]);
  var x = [];
  var t = [];
  /*for (let i = 0; i >= 0; i++) {
    if (Number(ps) >= Number(x_rep[0])) {
      console.log("start");
      s1 = 2300;
      send.send(s1 + c_1);
      for (let i = 0; i >= 0; i++) {
        if (Number(ps) >= Number(x_rep[x_rep.length - 1])) {
          send.send(5);
          break;
        }
      }
      console.log("finish");
      break;
    }
  }*/
}
async function get_p3() {
  const start = performance.now();
  await delayLog(1, 2500);
  const end = performance.now();
  console.log(end - start);
  send2.send(5);
  console.log("finish");
}

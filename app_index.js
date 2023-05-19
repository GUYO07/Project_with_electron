const arduino = require("./ports");
const send = require("./write_arduino");
const send2 = require("./write_arduino");
const read = require("./read_arduino");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

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
  s1 = 0;
  s2 = 0;
  c_1 = 0;
  c_2 = 0;
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
    document.getElementById("position1").innerHTML = data;
  });

}
function port_select2() {
  var e = document.getElementById("port2");
  var value = e.value;
  document.getElementById("demo2").innerHTML = value;
  p2 = value;
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
    s2 = 10 * 8;
  } else if (event.target.value == 24) {
    s2 = 10 * 8;
  } else if (event.target.value == 23) {
    s2 = 10 * 9;
  } else if (event.target.value == 22) {
    s2 = 10 * 9;
  } else if (event.target.value == 21) {
    s2 = 10 * 10;
  } else if (event.target.value == 20) {
    s2 = 10 * 110;
  } else if (event.target.value == 19) {
    s2 = 10 * 110;
  } else if (event.target.value == 18) {
    s2 = 10 * 12;
  } else if (event.target.value == 17) {
    s2 = 10 * 13;
  } else if (event.target.value == 16) {
    s2 = 10 * 13;
  } else if (event.target.value == 15) {
    s2 = 10 * 14;
  } else if (event.target.value == 14) {
    s2 = 10 * 15;
  } else if (event.target.value == 13) {
    s2 = 10 * 16;
  } else if (event.target.value == 12) {
    s2 = 10 * 18;
  } else if (event.target.value == 11) {
    s2 = 10 * 19;
  } else if (event.target.value == 10) {
    s2 = 10 * 21;
  } else if (event.target.value == 9) {
    s2 = 10 * 23;
  } else if (event.target.value == 8) {
    s2 = 10 * 26;
  } else if (event.target.value == 7) {
    s2 = 10 * 30;
  } else if (event.target.value == 6) {
    s2 = 10 * 34;
  } else if (event.target.value == 5) {
    s2 = 10 * 42;
  } else if (event.target.value == 4) {
    s2 = 10 * 50;
  } else if (event.target.value == 3) {
    s2 = 10 * 65;
  }else if (event.target.value == 2) {
    s2 = 10 * 95;
  }else if (event.target.value == 1) {
    s2 = 10 * 155;
  }
});

function cb1() {
  // Get the checkbox
  var checkBox = document.getElementById("cb1");
  if (checkBox.checked == false) {
    console.log(s1 + c_1);
    send.send(s1 + c_1);
  } else {
    console.log(5);
    if (s1 > 0 && c_1 > 0) {
      send.send(5);
    }
  }
}

const arduino = require("./ports");
const send = require("./write_arduino");
const send2 = require("./write_arduino2");
const pos = require("./position");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const fs = require("fs");
const { Timer } = require("easytimer.js");
let Controller = require("node-pid-controller");
var timer = new Timer();
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
  position_x = 0;
  position_y = 0;
  limit_x1 = 0;
  limit_x2 = 0;
  limit_y3 = 0;
  limit_y4 = 0;
  status_motor1 = 0;
  status_motor2 = 0;
  rpm_1 = 0;
  test_start = 0;
  JSONdata = [];
  OBJdata = {
    Position: 0,
    Position_ref: 0,
    Speed: 0,
    Speed_ref: 0,
    Time: 0,
  };
}
function time_count() {
  timer.start({ precision: "seconds" });
  timer.addEventListener("secondsUpdated", function (e) {
    //console.log(timer.getTimeValues().seconds);
    document.getElementById("time").innerHTML =
      timer.getTotalTimeValues().seconds;
    document.getElementById("speed_mm_s").innerHTML =
      position_x / timer.getTotalTimeValues().seconds;
    document.getElementById("speed_rpm").innerHTML =
      (position_x / timer.getTotalTimeValues().seconds) * 3;
    rpm_1 = (position_x / timer.getTotalTimeValues().seconds) * 3;
    //pid();
  });
}
function port_select1() {
  var e = document.getElementById("port1");
  var value = e.value;
  document.getElementById("demo").innerHTML = value;
  send.set(value);
}
async function port_read1() {
  var e = document.getElementById("port_read1");
  var value = e.value;
  const port2 = new SerialPort({ path: value, baudRate: 115200 });
  const parser = port2.pipe(new ReadlineParser({ delimiter: "\r\n" }));
  var test_data = [];
  parser.on("data", (data) => {
    ps = data;
    var i = 0;
    var str = data;
    var n = str.split(" ");
    position_x = Number(n[0]);
    position_y = Number(n[1]);
    limit_x1 = Number(n[2]);
    limit_x2 = Number(n[3]);
    limit_y3 = Number(n[4]);
    limit_y4 = Number(n[5]);
    document.getElementById("position1").innerHTML = data;
    if (limit_x1 == 1 && status_motor1 == 1) {
      send.send(5);
      timer.stop();
      status_motor1 = 0;
      console.log("ชนจ้า");
    }
    if (limit_x2 == 1 && status_motor1 == 1) {
      send.send(5);
      timer.stop();
      status_motor1 = 0;
      port2.write("1", function (err) {
        if (err) {
          return console.log("Error on write: ", err.message);
        }
        console.log("message written 1");
      });
      setTimeout(() => {
        port2.write("0", function (err) {
          if (err) {
            return console.log("Error on write: ", err.message);
          }
          console.log("message written 0");
          status_motor1 = 0;
        });
      }, 3000);
    }
    if (limit_y3 == 1 && status_motor2 == 1) {
      send2.send(5);
      timer.stop();
      status_motor2 = 0;
      console.log("ชนจ้า");
      port2.write("2", function (err) {
        if (err) {
          return console.log("Error on write: ", err.message);
        }
        console.log("message written 2");
      });
      setTimeout(() => {
        port2.write("0", function (err) {
          if (err) {
            return console.log("Error on write: ", err.message);
          }
          console.log("message written 0");
          status_motor1 = 0;
        });
      }, 3000);
    }
    if (limit_y4 == 1 && status_motor2 == 1) {
      send2.send(5);
      timer.stop();
      status_motor2 = 0;
      console.log("ชนจ้า");
    }
    if (test_start == 1) {
      //await delayLog(i, 10);
      var obj = {
        x: position_x,
        y: position_y,
      };
      test_data.push(obj);
    } else if (test_start == 2) {
      var jsonData = JSON.stringify(test_data);

      fs.writeFile("data.json", jsonData, "utf8", (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log("JSON data saved to file.");
        }
      });
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

function pid(s) {
  let ctr = new Controller({
    k_p: 1, //1
    k_i: 0.05, //0.05
    k_d: 0.02, //.002
    dt: 0, //0
  });
  ctr.setTarget(s); // 120km/h
  let output = Math.abs(rpm_1);
  let input = ctr.update(output);
  //console.log(output);
  pid_con(Math.round(input));
  //console.log(Math.round(input));
}
function pid_con(x) {
  s1 = x * 10;
  send.send(s1 + c_1 + " ");
}
const value1 = document.querySelector("#speed1");
const input1 = document.querySelector("#sp1");
value1.textContent = input1.value;
input1.addEventListener("input", (event) => {
  value1.textContent = event.target.value;
  s1 = event.target.value * 10;
  //s1=Math.round(13604*event.target.value**(-0.98555))*10; //13604 * pow(x / 10, -0.9855)
  //console.log(s1);
  cb1();
});

const value2 = document.querySelector("#speed2");
const input2 = document.querySelector("#sp2");
value2.textContent = input2.value;
input2.addEventListener("input", (event) => {
  value2.textContent = event.target.value;
  s2 = event.target.value * 10;
  cb2();
});

function cb1() {
  // Get the checkbox
  //console.log(typeof Number(document.getElementById("speed1").innerHTML));
  var checkBox = document.getElementById("cb1");
  if (checkBox.checked == false) {
    if (limit_x1 == 0 && limit_x2 == 0) {
      status_motor1 = 1;
    } else if (limit_x1 == 1) {
      status_motor1 = 0;
      c_1 = 4;
    } else if (limit_x2 == 1) {
      status_motor1 = 0;
      c_1 = 6;
    }
    console.log(s1 + c_1);
    send.send(s1 + c_1 + " ");
    time_count();
    //get_p();
    setTimeout(() => {
      status_motor1 = 1;
      //pid();
    }, 1000);
  } else {
    console.log(5);
    if (s1 > -1 && c_1 > 0) {
      send.send(5);
      status_motor1 = 0;
      timer.stop();
    }
  }
}

function cb2() {
  var checkBox = document.getElementById("cb2");
  if (checkBox.checked == false) {
    if (c_2 == 4) {
      s2 - 3;
    }
    if (limit_y3 == 0 && limit_y4 == 0) {
      status_motor2 = 1;
    } else if (limit_y3 == 1) {
      status_motor1 = 0;
      c_2 = 4;
    } else if (limit_y4 == 1) {
      status_motor1 = 0;
      c_2 = 6;
    }
    console.log(s2 + c_2);
    send2.send(s2 + c_2 + " ");
    //get_p3();
    setTimeout(() => {
      status_motor2 = 1;
      //pid();
    }, 1000);
  } else {
    console.log(5);
    if (s2 > -1 && c_2 > 0) {
      send2.send(5);
      status_motor2 = 0;
    }
  }
}

function delayLog(value, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

async function get_p() {
  var x = [];
  var t = [];
  var n = 0;
  var x_ref = pos.position(
    10,
    20,
    0,
    0,
    10,
    Number(document.getElementById("speed1").innerHTML) / 3
  );
  var xf = x_ref[0];
  for (let i = 0; i >= 0; i++) {
    //pid();
    //console.log(i);
    if (position_x >= xf[xf.length - 1]) {
      send.send(5);
      status_motor1 = 0;
      timer.stop();
      break;
    }
    if (position_x < xf[0]) {
      pid(Number(document.getElementById("speed1").innerHTML));
    }
    if (position_x <= xf[n] && position_x >= xf[0]) {
      //send.send(s1 + c_1 + " ");
      var s = xf[n] - position_x * 100 * 3;
      // console.log(s);
      pid(s);
      status_motor1 = 1;
    }
    if (position_x >= xf[n]) {
      send.send(5);
      status_motor1 = 0;
      n++;
    }
    const start = performance.now();
    await delayLog(i, 10);
    x.push(position_x);
    const end = performance.now();
    //t.push(end - start);
    if (i == 0) {
      t.push(end - start);
    } else {
      t.push(end - start + t[i - 1]);
    }
  }
  console.log(x);

  const jsonArray = [];
  var obj = {
    Sample_time: 0,
    Position: 0,
    Position_ref: 0,
    Speed: 0,
    Speed_ref: 0,
    Time: 0,
  };
  var ci = 0;
  for (let i = 0; i < x.length; i++) {
    if (i > 0) {
      var s = (x[i] / t[i]) * 1000 * 3;
      if (x[i] >= 10) {
        var s_ref = (x_ref[0][i - ci] / t[i]) * 3000;
      }
    } else {
      var s = 0;
    }
    if (x[i] >= 10) {
      obj = {
        Sample_time: i,
        Position: x[i],
        Position_ref: x_ref[0][i - ci],
        Speed: s,
        Speed_ref: s_ref,
        Time: t[i],
      };
    } else {
      obj = {
        Sample_time: i,
        Position: x[i],
        Position_ref: 0,
        Speed: s,
        Speed_ref: 0,
        Time: t[i],
      };
      ci++;
    }
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

function savejson(){
  var jsonData = JSON.stringify(JSONdata);

  fs.writeFile("data.json", jsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("JSON data saved to file.");
    }
  });
}
async function square() {
  JSONdata = [];
  //test_start = 1;
  //1 50,50
  console.log("run 1");
  await go_to_target(72.3, 62.5);
  //2 150,50
  console.log("run 2");
  await go_to_target(215, 62.5);
  //3 150,150
  console.log("run 3");
  await go_to_target(215, 155.4);
  //4 50,150
  console.log("run 4");
  await go_to_target(72.3, 155.4);
  //5 50,50
  console.log("run 5");
  await go_to_target(72.3, 62.5);
  //test_start = 2;
  await savejson();
}

async function go_to_target(x, y) {
  console.log(x + "," + y);
  var dx = x - position_x;
  var dy = y - position_y;
  var a = 0;
  var b = 0;
  var x_ref = pos.position(
    position_x,
    x,
    position_x,
    y,
    10,
    Number(document.getElementById("speed1").innerHTML) / 3
  );
  var xf = x_ref[0];
  var yf = x_ref[1];
  if (dx > 0) {
    c_1 = 6;
  } else if (dx < 0) {
    c_1 = 4;
  }
  /*if (Math.abs((dx / x) * 100) <= 3) {
    c_1 = 5;
    a = 1;
  }*/
  if (dy > 0) {
    c_2 = 4;
  } else if (dy < 0) {
    c_2 = 6;
  }
  /*if (Math.abs((dy / y) * 100) <= 3) {
    c_2 = 5;
    b = 1;
  }*/
  if (limit_x1 == 0 && limit_x2 == 0) {
    status_motor1 = 1;
  } else if (limit_x1 == 1) {
    status_motor1 = 0;
    c_1 = 4;
  } else if (limit_x2 == 1) {
    status_motor1 = 0;
    c_1 = 6;
  }
  if (limit_y3 == 0 && limit_y4 == 0) {
    status_motor2 = 1;
  } else if (limit_y3 == 1) {
    status_motor1 = 0;
    c_2 = 4;
  } else if (limit_y4 == 1) {
    status_motor1 = 0;
    c_2 = 6;
  }
  send.send(s1 + c_1 + " ");
  send2.send(s2 + c_2 + " ");
  //send2.send(s2 + c_2 + " ");
  setTimeout(() => {
    status_motor1 = 1;
    status_motor2 = 1;
  }, 1000);
  for (let i = 0; i >= 0; i++) {
    if (dx > 0) {
      if (position_x > x) {
        send.send(5);
        status_motor1 = 0;
        a = 1;
        console.log("a stop");
      }
    } else if (dx < 0) {
      if (position_x < x) {
        send.send(5);
        status_motor1 = 0;
        a = 1;
        console.log("a stop");
      }
    }
    if (dy > 0) {
      if (position_y > y) {
        send2.send(5);
        status_motor2 = 0;
        b = 1;
        console.log("b stop");
      }
    } else if (dy < 0) {
      if (position_y < y) {
        send2.send(5);
        status_motor2 = 0;
        b = 1;
        console.log("b stop");
      }
    }
    if (a == 1 && b == 1) {
      break;
    }
    if (b == 0) {
      send2.send(s2 + c_2 + " ");
    }
    if (a == 0) {
      send.send(s1 + c_1 + " ");
    }
    OBJdata = {
      Position_x: position_x,
      Position_x_ref: xf[i],
      Position_y: position_y,
      Position_y_ref: yf[i],
      Speed_x: position_x / (10 * i),
      Speed_x_ref: xf[i]/(10*i),
      Speed_y: position_y / (10 * i),
      Speed_y_ref: yf[i]/(10*i),
      Time: 10 * i,
    };
    await delayLog(i, 10);
    JSONdata.push(OBJdata);
  }
}

async function go_to_target2(x, y, t) {
  console.log(x + "," + y);
  var dx = x - position_x;
  var dy = y - position_y;
  var a = 0;
  var b = 0;
  if (dx > 0) {
    c_1 = 6;
  } else if (dx < 0) {
    c_1 = 4;
  }
  /*if (Math.abs((dx / x) * 100) <= 3) {
    c_1 = 5;
    a = 1;
  }*/
  if (dy > 0) {
    c_2 = 4;
  } else if (dy < 0) {
    c_2 = 6;
  }
  /*if (Math.abs((dy / y) * 100) <= 3) {
    c_2 = 5;
    b = 1;
  }*/
  if (limit_x1 == 0 && limit_x2 == 0) {
    status_motor1 = 1;
  } else if (limit_x1 == 1) {
    status_motor1 = 0;
    c_1 = 4;
  } else if (limit_x2 == 1) {
    status_motor1 = 0;
    c_1 = 6;
  }
  if (limit_y3 == 0 && limit_y4 == 0) {
    status_motor2 = 1;
  } else if (limit_y3 == 1) {
    status_motor1 = 0;
    c_2 = 4;
  } else if (limit_y4 == 1) {
    status_motor1 = 0;
    c_2 = 6;
  }
  s1 = Math.round((Math.abs(x - position_x) * 3000) / t) * 10;
  s2 = Math.round((Math.abs(y - position_y) * 3000) / t) * 10;
  send.send(s1 + c_1 + " ");
  send2.send(s2 + c_2 + " ");
  setTimeout(() => {
    status_motor1 = 1;
    status_motor2 = 1;
  }, 2000);
  if (s2 < 10) {
    s2 = 50;
  }
  if (s1 < 10) {
    s1 = 50;
  }
  for (let i = 0; i >= 0; i++) {
    if (dx > 0) {
      if (position_x > x) {
        send.send(5);
        status_motor1 = 0;
        a = 1;
        console.log("a stop");
      }
    } else if (dx < 0) {
      if (position_x < x) {
        send.send(5);
        status_motor1 = 0;
        a = 1;
        console.log("a stop");
      }
    }
    if (dy > 0) {
      if (position_y > y) {
        send2.send(5);
        status_motor2 = 0;
        b = 1;
        console.log("b stop");
      }
    } else if (dy < 0) {
      if (position_y < y) {
        send2.send(5);
        status_motor2 = 0;
        b = 1;
        console.log("b stop");
      }
    }
    if (a == 1 && b == 1) {
      break;
    }
    if (b == 0) {
      send2.send(s2 + c_2 + " ");
    }
    if (a == 0) {
      send.send(s1 + c_1 + " ");
    }
    await delayLog(i, 10);
  }
}

async function get_p3() {
  const start = performance.now();
  await delayLog(1, 2500);
  const end = performance.now();
  console.log(end - start);
  send2.send(5);
  console.log("finish");
}

function home() {
  if (limit_x1 == 0 && limit_x2 == 0) {
    status_motor1 = 1;
    c_1 = 4;
  } else if (limit_x1 == 1) {
    status_motor1 = 0;
    c_1 = 4;
  } else if (limit_x2 == 1) {
    status_motor1 = 0;
    c_1 = 6;
  }
  if (limit_y3 == 0 && limit_y4 == 0) {
    status_motor2 = 1;
    c_2 = 6;
  } else if (limit_y3 == 1) {
    status_motor1 = 0;
    c_2 = 4;
  } else if (limit_y4 == 1) {
    status_motor1 = 0;
    c_2 = 6;
  }
  send2.send(s2 + c_2 + " ");
  send.send(s1 + c_1 + " ");

  setTimeout(() => {
    status_motor2 = 1;
    status_motor1 = 1;
  }, 1000);
}

async function test() {
  //time_count();
  //tri();
  square();
  //circle();
  //hex();
  //timer.stop();
}

async function tri() {
  var pos = require("./position");
  var pos_ref = pos.position(
    220,
    150,
    63,
    158,
    100,
    Number(document.getElementById("speed1").innerHTML) / 3
  );
  var x = pos_ref[0];
  var y = pos_ref[1];
  var pos_ref2 = pos.position(
    150,
    79,
    158,
    63,
    100,
    Number(document.getElementById("speed1").innerHTML) / 3
  );
  var x2 = pos_ref2[0];
  var y2 = pos_ref2[1];
  await go_to_target(79, 63);
  await go_to_target(220, 63);
  for (let i = 0; i >= 0; i++) {
    if (i == x.length) {
      break;
    }
    await go_to_target(x[i], y[i]);
  }
  for (let i = 0; i >= 0; i++) {
    if (i == x2.length) {
      break;
    }
    await go_to_target(x2[i], y2[i]);
  }
}

async function circle() {
  var pos = require("./position_circle");
  var pos_ref = pos.position(
    147,
    116,
    52,
    100,
    Number(document.getElementById("speed1").innerHTML) / 3
  );
  var x = pos_ref[0];
  var y = pos_ref[1];
  await go_to_target(x[0], y[0]);
  for (let i = 1; i >= 0; i++) {
    if (i == x.length) {
      break;
    }
    await go_to_target2(x[i], y[i], 100);
  }
}

async function hex() {
  var s = Number(document.getElementById("speed1").innerHTML);
  var pos = require("./position");
  var pos_ref = pos.position(187, 210, 63, 135, 100, s / 3);
  var x = pos_ref[0];
  var y = pos_ref[1];
  var pos_ref2 = pos.position(210, 147, 135, 180, 100, s / 3);
  var x2 = pos_ref2[0];
  var y2 = pos_ref2[1];
  var pos_ref3 = pos.position(147, 82, 180, 135, 100, s / 3);
  var x3 = pos_ref3[0];
  var y3 = pos_ref3[1];
  var pos_ref4 = pos.position(82, 110, 135, 63, 100, s / 3);
  var x4 = pos_ref4[0];
  var y4 = pos_ref4[1];
  await go_to_target(110, 63);
  for (let i = 0; i >= 0; i++) {
    if (i == x.length) {
      break;
    }
    await go_to_target(x[i], y[i]);
  }
  for (let i = 0; i >= 0; i++) {
    if (i == x2.length) {
      break;
    }
    await go_to_target(x2[i], y2[i]);
  }
  for (let i = 0; i >= 0; i++) {
    if (i == x3.length) {
      break;
    }
    await go_to_target(x3[i], y3[i]);
  }
  for (let i = 0; i >= 0; i++) {
    if (i == x4.length) {
      break;
    }
    await go_to_target(x4[i], y4[i]);
  }
}

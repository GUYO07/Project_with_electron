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
      var select4 = document.getElementById("port_read2");
      var select5 = document.getElementById("port_read3");
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
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select4.appendChild(el);
      }
      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select5.appendChild(el);
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
  d_1 = 0;
  d_2 = 0;
  ps = 0;
  position_x = 0;
  position_y = 0;
  position_x_en = 0;
  position_y_en = 0;
  limit_x1 = 0;
  limit_x2 = 0;
  limit_y3 = 0;
  limit_y4 = 0;
  limit_x = 0;
  limit_y = 0;
  status_motor1 = 0;
  status_motor2 = 0;
  rpm_1 = 0;
  test_start = 0;
  JSONdata = [];
  portx='';
  porty='';
  OBJdata = {
    Position: 0,
    Position_ref: 0,
    Speed: 0,
    Speed_ref: 0,
    Time: 0,
  };
  X = [];
  Y = [];
  X2 = [];
  Y2 = [];
  T = [];
  i = 0;
}
time_count();
timer.stop();
function time_count() {
  timer.start({ precision: "secondTenths" });

  timer.addEventListener("secondTenthsUpdated", function (e) {});
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
      send.send(5 + " ");
      status_motor1 = 0;
      console.log("ชนจ้า");
    }
    if (limit_x2 == 1 && status_motor1 == 1) {
      send.send(5 + " ");
      status_motor1 = 0;
      port2.write("1", function (err) {
        if (err) {
          return console.log("Error on write: ", err.message);
        }
        console.log("message written 1");
      });
      /*portx.write("1", function (err) {
        if (err) {
          return console.log("Error on write: ", err.message);
        }
        console.log("message written 11");
      });*/
      setTimeout(() => {
        port2.write("0", function (err) {
          if (err) {
            return console.log("Error on write: ", err.message);
          }
          console.log("message written 0");
          status_motor1 = 0;
        });
       /* portx.write("0", function (err) {
          if (err) {
            return console.log("Error on write: ", err.message);
          }
          console.log("message written 00");
        });*/
      }, 3000);
    }
    if (limit_y3 == 1 && status_motor2 == 1) {
      send2.send(5 + " ");
      status_motor2 = 0;
      console.log("ชนจ้า");
      port2.write("2", function (err) {
        if (err) {
          return console.log("Error on write: ", err.message);
        }
        console.log("message written 2");
      });
      /*porty.write("1", function (err) {
        if (err) {
          return console.log("Error on write: ", err.message);
        }
        console.log("message written 11");
      });*/
      setTimeout(() => {
        port2.write("0", function (err) {
          if (err) {
            return console.log("Error on write: ", err.message);
          }
          console.log("message written 0");
          status_motor1 = 0;
        });
       /* porty.write("0", function (err) {
          if (err) {
            return console.log("Error on write: ", err.message);
          }
          console.log("message written 00");
        });*/
      }, 3000);
    }
    if (limit_y4 == 1 && status_motor2 == 1) {
      send2.send(5 + " ");
      status_motor2 = 0;
      console.log("ชนจ้า");
    }
  });
}
async function port_read2() {
  var e = document.getElementById("port_read2");
  var value = e.value;
  portx = new SerialPort({ path: value, baudRate: 115200 });
  const parser = portx.pipe(new ReadlineParser({ delimiter: "\r\n" }));
  parser.on("data", (data) => {
    position_x_en = data;
    document.getElementById("position2").innerHTML = data;
  });
}
async function port_read3() {
  var e = document.getElementById("port_read3");
  var value = e.value;
  porty = new SerialPort({ path: value, baudRate: 115200 });
  const parser = porty.pipe(new ReadlineParser({ delimiter: "\r\n" }));
  parser.on("data", (data) => {
    position_y_en = data;
    document.getElementById("position3").innerHTML = data;
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

function pidx(s) {
  let ctr = new Controller({
    k_p: 1, //1
    k_i: 0.05, //0.05
    k_d: 0.02, //.002
    dt: 0, //0
  });
  ctr.setTarget(s); // 120km/h
  let output = position_x;
  let input = ctr.update(output);
  //console.log(output);
  return input;
}
function pidy(s) {
  let ctr = new Controller({
    k_p: 1, //1
    k_i: 0.05, //0.05
    k_d: 0.02, //.002
    dt: 0, //0
  });
  ctr.setTarget(s); // 120km/h
  let output = position_y;
  let input = ctr.update(output);
  //console.log(output);
  return input;
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
  //s1 = event.target.value * 10;
  s1 = Math.round(2000 * ((event.target.value * 20) / 60 / 20)) * 10;
  cb1();
});

const value2 = document.querySelector("#speed2");
const input2 = document.querySelector("#sp2");
value2.textContent = input2.value;
input2.addEventListener("input", (event) => {
  value2.textContent = event.target.value;
  //s2 = event.target.value * 10;
  s2 = Math.round(2000 * ((event.target.value * 20) / 60 / 20)) * 10;
  cb2();
});

function cb1() {
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
    setTimeout(() => {
      status_motor1 = 1;
    }, 1000);
  } else {
    console.log(5);
    if (s1 > -1 && c_1 > 0) {
      send.send(5 + " ");
      status_motor1 = 0;
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
      send2.send(5 + " ");
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
      send.send(5 + " ");
      status_motor1 = 0;
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
      send.send(5 + " ");
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

function reset() {
  X = [];
  Y = [];
  X2 = [];
  Y2 = [];
  T = [];
  i = 0;
}
function savejson() {
  var jsonData = JSON.stringify(JSONdata);
  timer.stop();
  fs.writeFile("data.json", jsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("JSON data saved to file.");
    }
  });
}
async function go_pid(x, y) {
  var X = await pidx(x);
  var Y = await pidy(y);
  console.log(x + "," + y);
  var f = 1;
  var dx = X;
  var dy = Y;
  var a = 0;
  var b = 0;
  var t = 1;
  if (dx > 0) {
    c_1 = 6;
  } else if (dx < 0) {
    c_1 = 4;
  }
  if (dy > 0) {
    c_2 = 4;
  } else if (dy < 0) {
    c_2 = 6;
  }
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
  s1 = X * 3;
  s2 = Y * 3;
  send.send(s1 + c_1 + " ");
  send2.send(s2 + c_2 + " ");
  setTimeout(() => {
    status_motor1 = 1;
    status_motor2 = 1;
  }, 1000);
  for (let i = 0; i >= 0; i++) {
    if (dx > 0) {
      if (position_x > (position_x + X) * f) {
        send.send(5 + " ");
        status_motor1 = 0;
        a = 1;
        console.log("a stop");
      }
    } else if (dx < 0) {
      if (position_x < (position_x + X) * (2 - f)) {
        send.send(5 + " ");
        status_motor1 = 0;
        a = 1;
        console.log("a stop");
      }
    }
    if (dy > 0) {
      if (position_y > (position_y + Y) * f) {
        send2.send(5 + " ");
        status_motor2 = 0;
        b = 1;
        console.log("b stop");
      }
    } else if (dy < 0) {
      if (position_y < (position_y + Y) * (2 - f)) {
        send2.send(5 + " ");
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
    if (b == 1) {
      send2.send(5 + " ");
    }
    if (a == 1) {
      send.send(5 + " ");
    }
    await delayLog(1, t);
  }
}
async function test_loop(x, y) {
  for (let i = 0; i >= 0; i++) {
    if (i == x.length) {
      break;
    }
    await set_fre(x[i], x[i + 1], y[i], y[i + 1]);
    await go_to_target2(x[i], y[i]);
    //await go_pid(x[i], y[i]);
  }
}
async function test_loop2(x, y) {
  for (let i = 0; i >= 0; i++) {
    if (i == x.length) {
      break;
    }
    await set_fre2(x[i], x[i + 1], y[i], y[i + 1]);
  }
}

function set_fre(x1, x2, y1, y2) {
  // 4111 pulse = 1 rev = 20 mm
  // x = 20 mm . v = 5 rpm = 100 mm/min == 100/60 mm/s
  // v == 10/6 mm/s -> t = 1 s -> x=10/6 mm -> Q = 1/12 rev -> 4111/12= 342.58 pulse
  //f= 343 Hz t=12 s
  x = Math.abs(x2 - x1); //mm
  vx = (x / 100) * 1000; //mm/s
  s1 = Math.round(2000 * (vx / x)) * 10;
  // 4163 pulse = 1 rev = 20 mm
  y = Math.abs(y2 - y1); //mms
  vy = (y / 100) * 1000; //mm/s
  s2 = Math.round(2000 * (vy / y)) * 10;
  var dx = x2 - x1;
  var dy = y2 - y1;
  if (dx > 0) {
    c_1 = 6;
  } else if (dx < 0) {
    c_1 = 4;
  }
  if (dy > 0) {
    c_2 = 4;
  } else if (dy < 0) {
    c_2 = 6;
  }
}
async function set_fre2(x1, x2, y1, y2) {
  //var plant = (20*4*Math.PI**2*1*0.112*0.0001)/();
  var T = 10;
  x = Math.abs(x2 - x1); //mm
  y = Math.abs(y2 - y1); //mms
  if (x > y) {
    vx = Number(document.getElementById("speed1").innerHTML) / 3; //mm/s
    vy = (vx / x) * y; //mm/s
  } else if (x < y) {
    vy = Number(document.getElementById("speed2").innerHTML) / 3; //mm/s
    vx = (vy / y) * x; //mm/s
  }

  //vx=x/100*1000;
  s1 = Math.round(2000 * (vx / 20)) * 10;
  tx = (x / vx) * 1000;
  s2 = Math.round(2000 * (vy / 20)) * 10;
 100

  ty = (y / vy) * 1000;
  console.log(x2 + " " + y2 + " " + tx);
  //console.log(s1 + " " + s2);
  console.log(tx + " " + ty);
  var dx = x2 - x1;
  var dy = y2 - y1;
  if (dx > 0) {
    c_1 = 6;
  } else if (dx < 0) {
    c_1 = 4;
  }else{
    c_1=5;
  }
  if (dy > 0) {
    c_2 = 4;
  } else if (dy < 0) {
    c_2 = 6;
  }else{
    c_2=5;
  }
  var pos = require("./position");
  var pos_ref = pos.position(x1, x2, y1, y2, T, Math.sqrt(vx ** 2 + vy ** 2));
  var X = pos_ref[0];
  var Y = pos_ref[1];
  send.send(s1 + c_1 + " ");
  send2.send(s2 + c_2 + " ");
  await setTimeout(() => {
    status_motor1 = 1;
    status_motor2 = 1;
  }, 10);
  var t = 0;
  for (var i = 0; i >= 0; i++) {
    /*x = Math.abs(x[i] - position_x); //mm
    y = Math.abs(y[i] - position_y); //mms
    if (x > y) {
      vx = (x / T) * 1000; //mm/s
      vy = (vx / x) * y; //mm/s
    } else if (x < y) {
      vy = (y / T) * 1000; //mm/s
      vx = (vy / y) * x; //mm/s
    }
    s1 = Math.round(2000 * (vx / 20)) * 10;
    s2 = Math.round(2000 * (vy / 20)) * 10;*/
    send.send(s1 + c_1 + " ");
    send2.send(s2 + c_2 + " ");
    await add_json(X[i], Y[i],t);
    await delayLog(1, T);
    t += T;
    //console.log(t);
    if (t >= tx || t >= ty) {
      break;
    }
  }
  //await delayLog(1, tx);
  await send.send(5 + " ");
  await send2.send(5 + " ");
}
async function go_to_target(x, y) {
  console.log(x + "," + y);
  var f = 1;
  var dx = x - position_x;
  var dy = y - position_y;
  var a = 0;
  var b = 0;
  var t = 1;
  //await set_fre(position_x, x, position_y, y);
  await send.send(s1 + c_1 + " ");
  await send2.send(s2 + c_2 + " ");
  //console.log(s2 +c_2);
  await setTimeout(() => {
    status_motor1 = 1;
    status_motor2 = 1;
  }, 10);
  await delayLog(1, 100);
  await send.send(5 + " ");
  await send2.send(5 + " ");
  await add_json(x, y);
  //await delayLog(1, 1500);
}
function add_json(x, y,t) {
  OBJdata = {
    Position_x: position_x,
    Position_y: position_y,
    //Position_x_en: position_x_en,
    //Position_y_en: position_y_en,
    Position_x_ref: x,
    Position_y_ref: y,
    time: t,
  };
  JSONdata.push(OBJdata);
}
async function go_to_target2(x, y) {
  console.log(x + "," + y);
  var f = 1;
  var dx = x - position_x;
  var dy = y - position_y;
  var a = 0;
  var b = 0;
  var t = 1;
  if (dx > 0) {
    c_1 = 6;
  } else if (dx < 0) {
    c_1 = 4;
  }
  if (dy > 0) {
    c_2 = 4;
  } else if (dy < 0) {
    c_2 = 6;
  }
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
  //s1=Math.abs(dx)/*3;
  //s2=Math.abs(dy)/*3;
  //console.log(Math.abs(dx)*30);
  send.send(s1 + c_1 + " ");
  send2.send(s2 + c_2 + " ");
  setTimeout(() => {
    status_motor1 = 1;
    status_motor2 = 1;
  }, 1000);
  for (let i = 0; i >= 0; i++) {
    if (dx > 0) {
      if (position_x > x * f) {
        send.send(5 + " ");
        status_motor1 = 0;
        a = 1;
        console.log("a stop");
      }
    } else if (dx < 0) {
      if (position_x < x * (2 - f)) {
        send.send(5 + " ");
        status_motor1 = 0;
        a = 1;
        console.log("a stop");
      }
    }
    if (dy > 0) {
      if (position_y > y * f) {
        send2.send(5 + " ");
        status_motor2 = 0;
        b = 1;
        console.log("b stop");
      }
    } else if (dy < 0) {
      if (position_y < y * (2 - f)) {
        send2.send(5 + " ");
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
    if (b == 1) {
      send2.send(5 + " ");
    }
    if (a == 1) {
      send.send(5 + " ");
    }
    await delayLog(1, t);
  }
}

async function get_p3() {
  const start = performance.now();
  await delayLog(1, 2500);
  const end = performance.now();
  console.log(end - start);
  send2.send(5 + " ");
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
  var x = document.getElementById("test_type").value;
  if (x == 1) {
    tri();
  } else if (x == 2) {
    square();
  } else if (x == 3) {
    pen();
  } else if (x == 4) {
    circle();
  } else if (x == 5) {
    xtest();
  }else if (x == 6) {
    ytest();
  }
}
async function xtest() {
  var d = Number(document.getElementById("x_d").value);
  var X = Number(document.getElementById("x_x").value);
  var Y = Number(document.getElementById("x_y").value);
  await go_to_target2(X, Y);
  //await go_to_target2(X+d, Y);
  await delayLog(1, 1000);
  reset();
  JSONdata = [];
  await timer.start({ precision: "secondTenths" });
  await set_fre2(X, X+d,Y, Y);
  await savejson();
}
async function ytest() {
  var d = Number(document.getElementById("y_d").value);
  var X = Number(document.getElementById("y_x").value);
  var Y = Number(document.getElementById("y_y").value);
  await go_to_target2(X, Y);
 // await go_to_target2(X, Y+d);
 await delayLog(1, 1000);
  reset();
  JSONdata = [];
  await timer.start({ precision: "secondTenths" });
  await set_fre2(X,X,Y,Y+d);
  await savejson();
}
async function square() {
  var h = Number(document.getElementById("sq_h").value);
  var w = Number(document.getElementById("sq_w").value);
  var X = Number(document.getElementById("sq_x").value);
  var Y = Number(document.getElementById("sq_y").value);
  console.log(h + " " + w + " " + X + " " + Y);
  reset();
  var pos = require("./position");
  var pos_ref = pos.position(
    X,
    X + w,
    Y,
    Y,
    100,
    Number(document.getElementById("speed1").innerHTML) / 3
  );
  var x = pos_ref[0];
  var y = pos_ref[1];
  var pos_ref2 = pos.position(
    X + w,
    X + w,
    Y,
    Y + h,
    100,
    Number(document.getElementById("speed1").innerHTML) / 3
  );
  var x2 = pos_ref2[0];
  var y2 = pos_ref2[1];
  var pos_ref3 = pos.position(
    X + w,
    X,
    Y + h,
    Y + h,
    100,
    Number(document.getElementById("speed1").innerHTML) / 3
  );
  var x3 = pos_ref3[0];
  var y3 = pos_ref3[1];
  var pos_ref4 = pos.position(
    X,
    X,
    Y + h,
    Y,
    100,
    Number(document.getElementById("speed1").innerHTML) / 3
  );
  var x4 = pos_ref4[0];
  var y4 = pos_ref4[1];
  console.log("run 1");
  await go_to_target2(X, Y);
  //2 150,50
  JSONdata = [];
  //await time_count();
  reset();
  await set_fre(x[0], x[1], y[0], y[1]);
  await timer.start({ precision: "secondTenths" });
  /*await test_loop(x, y);
  await test_loop(x2, y2);
  await test_loop(x3, y3);
  await test_loop(x4, y4);*/
  await set_fre2(position_x, X + w, position_y, Y);
  await set_fre2(position_x, X + w, position_y, Y + h);
  await set_fre2(position_x, X, position_y, Y + h);
  await set_fre2(position_x, X, position_y, Y);
  await savejson();
}
async function tri() {
  var h = Number(document.getElementById("tri_h").value);
  var w = Number(document.getElementById("tri_w").value);
  var X = Number(document.getElementById("tri_x").value);
  var Y = Number(document.getElementById("tri_y").value);
  var pos = require("./position");
  var pos_ref = pos.position(
    X + w,
    X + w / 2,
    Y,
    Y + h,
    100,
    Number(document.getElementById("speed1").innerHTML) / 3
  );
  var x = pos_ref[0];
  var y = pos_ref[1];
  var pos_ref2 = pos.position(
    X + w / 2,
    X,
    Y + h,
    Y,
    100,
    Number(document.getElementById("speed1").innerHTML) / 3
  );
  var x2 = pos_ref2[0];
  var y2 = pos_ref2[1];
  var pos_ref0 = pos.position(
    X,
    X + w,
    Y,
    Y,
    100,
    Number(document.getElementById("speed1").innerHTML) / 3
  );
  var x0 = pos_ref0[0];
  var y0 = pos_ref0[1];
  await go_to_target2(X, Y);
  JSONdata = [];
  //await time_count();
  reset();
  await timer.start({ precision: "secondTenths" });
  /*await test_loop2(x0, y0);
  await test_loop2(x, y);
  await test_loop2(x2, y2);*/
  /*await set_fre2(X, X + w, Y, Y);
  await set_fre2(X + w, X + w / 2, Y, Y + h);
  await set_fre2(X + w / 2, X, Y + h, Y);*/
  await set_fre2(position_x, X + w, position_y, Y);
  await set_fre2(position_x, X + w / 2, position_y, Y + h);
  await set_fre2(position_x, X, position_y, Y);
  await savejson();
}

async function circle() {
  var r = Number(document.getElementById("c_r").value);
  var X = Number(document.getElementById("c_x").value);
  var Y = Number(document.getElementById("c_y").value);
  var pos = require("./position_circle");
  var pos_ref = pos.position(
    X,
    Y,
    r,
    100,
    Number(document.getElementById("speed1").innerHTML) / 3
  );
  var x = pos_ref[0];
  var y = pos_ref[1];
  await go_to_target2(x[0], y[0]);
  JSONdata = [];
  //await time_count();
  reset();
  await timer.start({ precision: "secondTenths" });
  for (let i = 1; i >= 0; i++) {
    if (i == x.length) {
      break;
    }
    await go_to_target2(x[i], y[i]);
  }
  await savejson();
}

async function pen() {
  var d = Number(document.getElementById("p_d").value);
  var X = Number(document.getElementById("p_x").value);
  var Y = Number(document.getElementById("p_y").value);
  var s = Number(document.getElementById("speed1").innerHTML);
  var p1 = {
    x: 108, //X,
    y: 60, //Y
  };

  var p2 = {
    x: 188, //X+d,
    y: 60, //Y
  };
  var p3 = {
    x: 212.72, //p2.x+d*Math.cos(72),
    y: 136.08, //Y+d*Math.sin(72)
  };

  var p4 = {
    x: 148, //p3.x-d*Math.sin(72),
    y: 183.11, //p3.y+d*Math.cos(72)
  };
  var p5 = {
    x: 83.28, //X-d*Math.cos(72),
    y: 136.08, //Y+d*Math.sin(72)
  };

  var pos = require("./position");
  var pos_ref0 = pos.position(p1.x, p2.x, p2.y, p2.y, 100, s / 3);
  var x0 = pos_ref0[0];
  var y0 = pos_ref0[1];
  var pos_ref = pos.position(p2.x, p3.x, p2.y, p3.y, 100, s / 3);
  var x = pos_ref[0];
  var y = pos_ref[1];
  var pos_ref2 = pos.position(p3.x, p4.x, p3.y, p4.y, 100, s / 3);
  var x2 = pos_ref2[0];
  var y2 = pos_ref2[1];
  var pos_ref3 = pos.position(p4.x, p5.x, p4.y, p5.y, 100, s / 3);
  var x3 = pos_ref3[0];
  var y3 = pos_ref3[1];
  var pos_ref4 = pos.position(p5.x, p1.x, p5.y, p1.y, 100, s / 3);
  var x4 = pos_ref4[0];
  var y4 = pos_ref4[1];
  await go_to_target2(p1.x, p1.y);
  //await go_to_target(p2.x, p2.y);
  JSONdata = [];
  //await time_count();
  reset();
  await timer.start({ precision: "secondTenths" });
  /*await test_loop(x0, y0);
  await test_loop(x, y);
  await test_loop(x2, y2);
  await test_loop(x3, y3);
  await test_loop(x4, y4);*/
  await set_fre2(position_x, p2.x, position_y, p2.y);
  await set_fre2(position_x, p3.x, position_y, p3.y);
  await set_fre2(position_x, p4.x, position_y, p4.y);
  await set_fre2(position_x, p5.x, position_y, p5.y);
  await set_fre2(position_x, p1.x, position_y, p1.y);
  await savejson();
}

closePopup1.addEventListener("click", function () {
  myPopup1.classList.remove("show");
});
closePopup2.addEventListener("click", function () {
  myPopup2.classList.remove("show");
});
closePopup3.addEventListener("click", function () {
  myPopup3.classList.remove("show");
});
closePopup4.addEventListener("click", function () {
  myPopup4.classList.remove("show");
});
closePopup5.addEventListener("click", function () {
  myPopup5.classList.remove("show");
});
closePopup6.addEventListener("click", function () {
  myPopup6.classList.remove("show");
});

async function test_t() {
  var x = document.getElementById("test_type").value;
  if (x == 1) {
    myPopup1.classList.add("show");
  } else if (x == 2) {
    myPopup2.classList.add("show");
  } else if (x == 3) {
    myPopup3.classList.add("show");
  } else if (x == 4) {
    myPopup4.classList.add("show");
  }else if (x == 5) {
    myPopup5.classList.add("show");
  }else if (x == 6) {
    myPopup6.classList.add("show");
  }
  
}

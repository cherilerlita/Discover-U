// MQTT subscriber
var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://dikry:dikry2022@iot.ngoprekradio.com:1883");
var topic1 = "dikry/locator/A_SIG";
var topic2 = "dikry/locator/B_SIG";
var topic3 = "dikry/locator/C_SIG";
var topic4 = "dikry/locator/D_SIG";
var namefile1 = "A_SIG.txt";
var namefile2 = "A_SIG.txt";
var namefile3 = "A_SIG.txt";
var namefile4 = "A_SIG.txt";
var namefile_all = "../js/ALL_SIG.txt";
var fs = require("fs");
var data;
client.on("message", (topic1, message1) => {
  data = "";
  data = message1.toString() + "\r\n";
  console.log(data);
  fs.appendFile(namefile1, data, function (err) {
    if (err) throw err;
  });
});
client.on("message", (topic2, message2) => {
  data = "";
  data = message2.toString() + "\r\n";
  console.log(data);

  fs.appendFile(namefile2, data, function (err) {
    if (err) throw err;
  });
});
client.on("message", (topic3, message3) => {
  data = "";
  data = message3.toString() + "\r\n";

  console.log(data);
  fs.appendFile(namefile2, data, function (err) {
    if (err) throw err;
  });
});
client.on("message", (topic4, message4) => {
  data = "";
  data = message4.toString() + "\r\n";

  console.log(data);
  fs.appendFile(namefile_all, data, function (err) {
    if (err) throw err;
  });
});

client.on("connect", () => {
  client.subscribe(topic1);
  client.subscribe(topic2);
  client.subscribe(topic3);
  client.subscribe(topic4);
});

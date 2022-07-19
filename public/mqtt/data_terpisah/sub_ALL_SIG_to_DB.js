// MQTT subscriber
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://dikry:dikry2022@iot.ngoprekradio.com:1883');
var topic1 = 'dikry/locator/A_SIG';
var topic2 = 'dikry/locator/B_SIG';
var topic3 = 'dikry/locator/C_SIG';
var topic4 = 'dikry/locator/D_SIG';
var namefile1 = 'A_SIG.txt';
var namefile2 = 'A_SIG.txt';
var namefile3 = 'A_SIG.txt';
var namefile4 = 'A_SIG.txt';
var namefile_all = 'ALL_SIG.txt';


// client.on('message', (topic, message) => {
// message = message.toString();
// include node fs module
// var fs = require('fs');
// var data = message + "\r\n";

// write data to file sample.html
// fs.appendFile(namefile, data,
//     // callback function that is called after writing file is done
//     function(err) {
//         if (err) throw err;

//         console.log('Data A' + message);
//         console.log("Data is written to file successfully.")
//     });
// console.log('Data A' + message);
// })

client.on('message', (topic1, message1) => {
    message1 = message1.toString();

});
client.on('message', (topic2, message2) => {
    message2 = message2.toString();

});
client.on('message', (topic3, message3) => {
    message3 = message3.toString();

});
client.on('message', (topic4, message4) => {
    message4 = message4.toString();
    // console.log('Data A' + message1);
    // console.log('Data B' + message2);
    // console.log('Data C' + message3);
    console.log('Data' + message4);
    // console.log('put to file == ');

    // include node fs module
    var fs = require('fs');
    var data = message4 + "\r\n";

    // write data to file sample.html
    fs.appendFile(namefile_all, data,
        // callback function that is called after writing file is done
        function(err) {
            if (err) throw err;
            // console.log("Data is written to file successfully.") 
        });
});




client.on('connect', () => {
    client.subscribe(topic1);
    client.subscribe(topic2);
    client.subscribe(topic3);
    client.subscribe(topic4);
})
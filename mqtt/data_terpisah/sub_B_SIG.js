// MQTT subscriber
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://dikry:dikry2022@iot.ngoprekradio.com:1883');
var topic = 'dikry/locator/B_SIG';
var namefile = 'B_SIG.txt';


client.on('message', (topic, message) => {
    message = message.toString();
    // include node fs module
    var fs = require('fs');
    var data = message + "\r\n";

    // write data to file sample.html
    fs.appendFile(namefile, data,
        // callback function that is called after writing file is done
        function(err) {
            if (err) throw err;

            console.log('Data B' + message);
            console.log("Data is written to file successfully.")
        });

})

client.on('connect', () => {
    client.subscribe(topic);
})
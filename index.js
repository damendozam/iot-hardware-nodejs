//const mqtt = require('./mqtt')

var fs = require('fs');
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost')
var json
let {PythonShell} = require('python-shell')
let pyshell = new PythonShell('src/index.py');


client.on("connect",function(){
      console.log("Connected");
})

client.subscribe('/UMA/hum', function (err) {
        if (!err) {
            console.log("Subscribed");
        }
})


client.subscribe('/UMA/temp', function (err) {
        if (!err) {
             console.log("Subscribed");
        }
})


pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    json = JSON.parse(message);
    //console.log(json.hum.toString());
    //console.log(json.temp.toString());


    if( json != undefined){
        client.publish('/UMA/hum', json.hum.toString());
        client.publish('/UMA/temp', json.temp.toString());
    }


   

});

client.on('message', function (topic, message) {
    // message is Buffer
   console.log(topic.toString());
   console.log(message.toString());
   
}) 
//module.exports = client;
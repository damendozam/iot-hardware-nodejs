const fs = require('fs');
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost')
const json
const argument

if(process.argv[2] === undefined){
    argument="sample1.json" 
}
else{
    argument=process.argv[2]
}

fs.readFile(argument, (err, data) => {
    if (err){
      console.log(err);
    }
    else {
      json = JSON.parse(data);
    console.log(json);
    }
   
})


client.on("connect",function(){
  console.log("Connected");
})


client.subscribe('/UMA/hum', function (err) {
    if (!err) {
      client.publish('/UMA/hum', json.hum.toString());
    }
})


client.subscribe('/UMA/temp', function (err) {
    if (!err) {
      client.publish('/UMA/temp', json.temp.toString());
    }
})



client.on('message', function (topic, message) {
   // message is Buffer
   console.log(topic.toString());
   console.log(message.toString());
   client.end();
})    

module.exports = client;
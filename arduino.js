var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/cu.usbmodem1411' }
  },

  devices: {
    sensor1: { driver: "analogSensor", pin: 0, upperLimit: 100, lowerLimit: 0 },
    sensor2: { driver: "analogSensor", pin: 1, upperLimit: 100, lowerLimit: 0 },
    button: { driver: "button", pin: 0 }

  },

  work: function(my) {
    var value = 0;
    /*every((1).second(), function() {
     my.pin.digitalWrite(value);
     value = (value == 0) ? 1 : 0;
     });*/

    my.button.on("push", function (val) {
      //console.log("button pressed!");
      console.log("sensor1 read value:", val);
    });

    my.sensor1.on("analogRead", function (val) {
      console.log("sensor1 read value:", val);
      console.log("sensor1 read value:", my.sensor1.analogRead());
    });

    my.sensor2.on("analogRead", function (val) {
      console.log("sensor2 read value:", val);
      console.log("sensor2 read value:", my.sensor2.analogRead());
    });
  }
}).start();

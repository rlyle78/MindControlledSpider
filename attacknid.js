"use strict";

var Cylon = require('cylon');

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'ble', uuid: 'a98a2ab2fdab403784e00c80c5de28b8' }
  },

  devices: {
    battery: { driver: 'ble-battery-service' }
  },

  work: function(my) {
    my.battery.getBatteryLevel(function(err, data) {
      if (!!err) {
        console.log("Error: ", err);
        return;
      }

      console.log("Data: ", data);
    });
  }
}).start();

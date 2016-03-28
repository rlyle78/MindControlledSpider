var Cylon = require('cylon');
var move = false;
var shoot = false;

var Barcli = require("barcli");

var attentionGraph = new Barcli({
  label: "Attention Graph",
  range: [0, 100],
});

var meditationGraph = new Barcli({
  label: "Meditation Graph",
  range: [0, 100],
});


var commands = {};
commands["forward"] = "71:00:02:80:80:80:80:01";
commands["backward"] = "71:00:82:80:80:80:80:02";

commands["left"] = "71:00:80:82:80:80:80:08";
commands["right"] = "71:00:80:02:80:80:80:04";

commands["down"] = "71:00:80:80:02:80:80:10";
commands["up"] = "71:00:80:80:82:80:80:20";

commands["light"] = "71:00:80:80:80:80:02:40";
commands["fire"] = "71:00:80:80:80:80:82:80";

var selectedCommand = commands["forward"];
/*
71:00:02:80:80:80:80:01 - forward
71:00:82:80:80:80:80:02 - backward

71:00:80:82:80:80:80:08 - left
71:00:80:02:80:80:80:04 - right

71:00:80:80:02:80:80:10 - down
71:00:80:80:82:80:80:20 - up

71:00:80:80:80:80:02:40 - light
71:00:80:80:80:80:82:80 - fire
*/

Cylon.robot({
  connections: {
    keyboard: { adaptor: 'keyboard' },
    neurosky: { adaptor: 'neurosky', port: '/dev/cu.MindWaveMobile-DevA' },
 
  },

   devices: {
      keyboard: { driver: "keyboard" },
      headset: { driver: "neurosky" }
  },

  work: function(my) {
    /* my.headset.on("signal", function(data) {
      console.log("signal:" + data);
     });*/
     
  
    
    my.headset.on("blink", function(data) {
      console.log("blink:" + data);
      /*if (data > 128)
      {
        moveForward = true;
      } else
      {
        moveForward = false;
      }*/
    });
    
    my.headset.on("attention", function(data) {
      console.log("attention:" + data);
      
      if (data != 128)
      {
        attentionGraph.update(data);
        if (data > 80) {
          move = true;
        } else
        {
          move = false;
        }  
      } else
      {
        move = false;
      }
      
      console.log('move:' + move );
      
      console.log('command:' + selectedCommand );
    });

    my.headset.on("meditation", function(data) {
      console.log("meditation:" + data);
      
      /*if (data != 0)
      {
        meditationGraph.update(data);
        if (data > 80) {
          shoot = true;
        } else
        {
          shoot = false;
        }
      } else
      {
        shoot = false;
      }
      console.log('shoot:' + shoot );*/
    });
  }
  
  /*work: function(my) {
    my.headset.on("eeg", function(data) {
      console.log("Data:", data);
    });
  }*/
  /*
   work: function(my) {
    my.headset.on("packet", function(packet) {
      console.log("packet:", packet);
    });
  }*/
}).start();

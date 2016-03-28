var Cylon = require('cylon');
var shoot = false;

var shootCommand = '7100808080808280';

var Barcli = require("barcli");

var attentionGraph = new Barcli({
    label: "Attention Graph",
    range: [0, 100],
});


var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort(); 
btSerial.on('found', function(address, name) {
    console.log(address);
    btSerial.findSerialPortChannel(address, function(channel) {
        btSerial.connect(address, channel, function() {
            console.log(address);
            console.log('connected');
 
            /*btSerial.write(new  Buffer('7100028080808001','hex'), function(err, bytesWritten) {
                if (err) console.log(err);
            });*/
 
            btSerial.on('data', function(buffer) {
                //console.log(buffer);
                
                if (shoot)
                {
                 btSerial.write(new  Buffer(shootCommand,'hex'), function(err, bytesWritten) {
                        if (err) console.log(err);
                 });
                }
                //console.log(buffer.toString('utf-8'));
            });
        }, function () {
            console.log('cannot connect');
        });
 
        // close the connection when you're ready 
        btSerial.close();
    }, function() {
        console.log('found nothing');
    });
});
 
btSerial.inquire();


function SendCommand(command) {
    if (btSerial.isOpen()) {
        btSerial.write(new Buffer(command, 'hex'), function (err, bytesWritten) {
            if (err) console.log(err);
        });
    }
}

Cylon.robot({
  connections: {
    neurosky: { adaptor: 'neurosky', port: '/dev/cu.MindWaveMobile-DevA' }
  },

   devices: {
    headset: { driver: "neurosky" }
  },

  work: function(my) {
     /*my.headset.on("signal", function(data) {
      console.log("signal:" + data);
     });*/
     
    my.headset.on("blink", function(data) {
      //console.log("blink:" + data);
      /*if (data > 128)
      {
        moveForward = true;
      } else
      {
        moveForward = false;
      }*/
    });
    
    my.headset.on("attention", function(data) {
      //console.log("attention:" + data);
        if (data <= 100)
        {
            attentionGraph.update(data);
            if (data > 85) {
             shoot = true;
            }
        } else
        {
            shoot = false;
        }
    });

    my.headset.on("meditation", function(data) {
      //console.log("meditation:" + data);
      
      /*if (data > 128)
      {
        moveForward = true;
      } else
      {
        moveForward = false;
      }*/
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

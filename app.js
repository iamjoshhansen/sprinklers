console.log("All the Sprinklers!!!!1!!");

var Gpio  = require('onoff').Gpio;
var Relay = require('./components/relay.js');
var relay = new Relay([4,14,17,15,27,18,22,23,10,24,9,25,11,8,5,7]);

// setInterval(function () {
// 	relay.next();
// }, 1000);


var green_button = new Gpio(21, 'out');



var port = 2235;
var io = require('socket.io')(port);

var connection_count = 0;

io.on('connection', function (socket) {
	console.log('We have a new connection!');

	connection_count++;
	green_button.writeSync(1);

	socket.on('activate-zone', function (zone_index) {
		console.log('Activating zone ', zone_index);
		relay.setActive(zone_index);
	});

	socket.on('disconnect', function () {
		console.log('user disconnected');
		connection_count--;

		if (connection_count < 1) {
			green_button.writeSync(0);
		}
	});
});

console.log('io.path(): ', io.path());
console.log('Listening on port `' + port + '`');

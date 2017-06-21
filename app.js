console.log("All the Sprinklers!!!!1!!");

var Relay = require('./components/relay.js');
var relay = new Relay([12,16,20,21]);

// setInterval(function () {
// 	relay.next();
// }, 1000);


var port = 2235;
var io = require('socket.io')(port);

io.on('connection', function (socket) {
	console.log('We have a new connection!');

	socket.on('activate-zone', function (zone_index) {
		console.log('Activating zone ', zone_index);
		relay.setActive(zone_index);
	});

	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
});

console.log('io.path(): ', io.path());
console.log('Listening on port `' + port + '`');

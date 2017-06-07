console.log("All the Sprinklers!!!!1!!");

var Relay = require('./components/relay.js');
var relay = new Relay([12,16,20,21]);

setInterval(function () {

	relay.next();

}, 1000);

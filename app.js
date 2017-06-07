console.log("All the Sprinklers!!!!1!!");

import Relay from './components/relay-2';

var relay = new Relay([12,16,20,21]);

setInterval(function () {

	relay.next();

}, 1000);

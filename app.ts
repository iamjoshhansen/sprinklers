console.log("All the Sprinklers!!!!1!!");

import Relay from './components/relay';

let relay:Relay = new Relay({
	"front": 12,
	"back-0": 16,
	"back-1": 20,
	"planter": 21
});

setInterval(function () {

	relay.setActiveZone("front");

	setTimeout(function () {
		relay.setActiveZone("back-0");
	}, 1000);

	setTimeout(function () {
		relay.setActiveZone("back-1");
	}, 2000);

	setTimeout(function () {
		relay.setActiveZone("planter");
	}, 3000);

}, 4000);

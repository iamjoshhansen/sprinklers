console.log("All the Sprinklers!!!!1!!");

import Relay from './components/relay';

let relay:Relay = new Relay({
	"front": 12,
	"back-0": 16,
	"back-1": 20,
	"planter": 21
});

setInterval(function () {

	relay.setLabeledZone("front", true);

	setTimeout(function () {
		relay.setLabeledZone("back-0", true);
	}, 1000);

	setTimeout(function () {
		relay.setLabeledZone("back-1", true);
	}, 2000);

	setTimeout(function () {
		relay.setLabeledZone("planter", true);
	}, 3000);

}, 4000);

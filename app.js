console.log("All the Sprinklers!!!!1!!");

var Gpio = require('onoff').Gpio,
	led = new Gpio(18, 'out'),
	val = false;

setInterval(function () {

	val = ! val;

	console.log('writing value: ' + val);
	led.writeSync(val ? 1 : 0);

}, 1000);

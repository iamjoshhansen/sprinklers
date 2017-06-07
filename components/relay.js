var Gpio = require('onoff').Gpio,
	_ = require('lodash');

module.exports = Relay;

function Relay (pins) {

	var self = this;

	this._pins = pins;
	Object.defineProperty(self, 'pins', {
		get: function () {
			return self._pins
		}
	});

	this._outs = _.map(pins, function (n) {
		return new Gpio(n, 'out');
	});

	this._active_index = null;


	Object.defineProperty(self, 'length', {
		get: function () {
			return self._pins.length
		}
	});

}

Relay.prototype.getActive = function () {

	return this._active_index;

};

Relay.prototype.setActive = function (zone) {

	if (this._active_index !== null) {
		console.log('Turning off zone ' + this._active_index);
		this._outs[this._active_index].writeSync(0);
	}

	this._active_index = zone;

	if (zone !== null) {

		if (zone < 0) {
			throw new Error('zone cannot be < 0');
		}

		if (zone > this.length - 1) {
			throw new Error('zone cannot be beyond the range of pins (' + (this.length - 1) + ')');
		}

		console.log('Turning on zone ' + this._active_index);
		this._outs[this._active_index].writeSync(1);
	}

	return this;

};


Relay.prototype.next = function () {

	if (this._active_index === null) {
		this.setActive(0);
	} else {
		this.setActive( (this._active_index+1) % this.length );
	}

	return this;

};

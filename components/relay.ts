import { Gpio } from 'onoff';
import * as _ from 'lodash';

interface ZoneMap {
	[label:string]:number
}




export default class Relay {

	_zone_map     : ZoneMap;
	_outs         : {[pin:number]:Gpio.Gpio};
	_active_pin : number|null;
	length        : number;

	constructor (zone_map:ZoneMap) {

		let self = this;

		this._zone_map = zone_map;
		Object.defineProperty(self, 'zone_map', {
			get: function () {
				return self._zone_map
			}
		});

		this._outs = _.map(zone_map, function (pin:number, label:string) {
			return new Gpio(pin, 'out');
		});

		this._active_pin = null;


		Object.defineProperty(self, 'length', {
			get: function () {
				return _.keys(self._zone_map).length
			}
		});

	}



	getActiveZone ():null|string {

		let label:string;
		let active_pin:number = this._active_pin;

		_.each(this._zone_map, function (pin:number, label:string) {

			if (pin === active_pin) {
				return label;
			}

		});

		return null;
	}



	setActiveZone (label:string|null):this {

		/*
		if (this._active_pin !== null) {
			console.log('Turning off zone ' + this._active_pin);
			this._outs[this._active_pin].writeSync(0);
		}
		*/

		if (label === null) {

			if (this._active_pin !== null) {
				console.log('Shutting off "' + this.getActiveZone() + '"');
				this._outs[this._active_pin].writeSync(0);
				this._active_pin = null;
			}

		} else {
			this._active_pin = this._zone_map[label] || null;

			if (this._active_pin) {
				console.log('Turning on "' + this.getActiveZone() + '"');
				this._outs[this._active_pin].writeSync(1);
			}
		}

		return this;

	}



}

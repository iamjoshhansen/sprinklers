import Gpio from 'onoff';
import * as _ from 'lodash';

interface ZoneMap {
	[label:string]:number
}




export default class Relay {

	_zone_map     : ZoneMap;
	_outs         : Array<Gpio.Gpio>;
	_active_index : number|null;
	length        : number;

	constructor (zone_map:ZoneMap) {

		let self = this;

		this._zone_map = zone_map;
		Object.defineProperty(self, 'zone_map', {
			get: function () {
				return self._zone_map
			}
		});

		this._outs = _.values(_.map(zone_map, function (pin:number, label:string) {
			return new Gpio(pin, 'out');
		}));

		this._active_index = null;


		Object.defineProperty(self, 'length', {
			get: function () {
				return _.keys(self._zone_map).length
			}
		});

	}



	getActive ():null|number {
		return this._active_index;
	}



	setActive (zone:number):Relay {

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

	}


	next ():Relay {

		if (this._active_index === null) {
			this.setActive(0);
		} else {
			this.setActive( (this._active_index+1) % this.length );
		}

		return this;

	}



	setLabeledZone (label:string, active:boolean):this {

		if (active) {
			let pin:number = this._zone_map[label];
			this.setActive(pin);
		} else {
			this.setActive(null);
		}

		return this;

	}



}

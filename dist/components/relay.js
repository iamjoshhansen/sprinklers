"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var onoff_1 = require("onoff");
var _ = require("lodash");
var Relay = (function () {
    function Relay(zone_map) {
        var self = this;
        this._zone_map = zone_map;
        Object.defineProperty(self, 'zone_map', {
            get: function () {
                return self._zone_map;
            }
        });
        this._outs = _.map(zone_map, function (pin, label) {
            return new onoff_1.Gpio(pin, 'out');
        });
        this._active_pin = null;
        Object.defineProperty(self, 'length', {
            get: function () {
                return _.keys(self._zone_map).length;
            }
        });
    }
    Relay.prototype.getActiveZone = function () {
        var label;
        var active_pin = this._active_pin;
        _.each(this._zone_map, function (pin, label) {
            if (pin === active_pin) {
                return label;
            }
        });
        return null;
    };
    Relay.prototype.setActiveZone = function (label) {
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
        }
        else {
            this._active_pin = this._zone_map[label] || null;
            if (this._active_pin) {
                console.log('Turning on "' + this.getActiveZone() + '"');
                this._outs[this._active_pin].writeSync(1);
            }
        }
        return this;
    };
    return Relay;
}());
exports.default = Relay;

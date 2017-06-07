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
        this._outs = _.values(_.map(zone_map, function (pin, label) {
            return new onoff_1.default.Gpio(pin, 'out');
        }));
        this._active_index = null;
        Object.defineProperty(self, 'length', {
            get: function () {
                return _.keys(self._zone_map).length;
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
        }
        else {
            this.setActive((this._active_index + 1) % this.length);
        }
        return this;
    };
    Relay.prototype.setLabeledZone = function (label, active) {
        if (active) {
            var pin = this._zone_map[label];
            this.setActive(pin);
        }
        else {
            this.setActive(null);
        }
        return this;
    };
    return Relay;
}());
exports.default = Relay;

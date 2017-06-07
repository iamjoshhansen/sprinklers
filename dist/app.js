"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("All the Sprinklers!!!!1!!");
var relay_1 = require("./components/relay");
var relay = new relay_1.default({
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

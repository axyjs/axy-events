"use strict";
/**
 * An event emitter implementation
 *
 * The default export of the es6-module is Emitter.
 * The additional export designed for TypeScript typing.
 *
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 * @license MIT
 */
/* tslint:disable:no-unused-variable */
var Emitter_1 = require("./lib/Emitter");
var SingleEmitter_1 = require("./lib/SingleEmitter");
exports.SingleEmitter = SingleEmitter_1.default;
var Event_1 = require("./lib/Event");
exports.Event = Event_1.default;
var Listener_1 = require("./lib/Listener");
exports.Listener = Listener_1.default;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Emitter_1.default;

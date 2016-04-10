/**
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 */
"use strict";
var Listener_1 = require("./Listener");
var Event_1 = require("./Event");
/**
 * Emitter of single event
 */
var SingleEmitter = (function () {
    /**
     * The constructor
     */
    function SingleEmitter(options) {
        this.options = options;
        this.listeners = [];
    }
    /**
     * Adds event listener
     *
     * @param handler
     *        the event handler
     * @param [data]
     *        bound data (available in the handler by event.data)
     * @returns {Listener}
     *          the listener object
     * @throws {Error}
     *         the specified event type is not found
     */
    SingleEmitter.prototype.add = function (handler, data) {
        if (data === void 0) { data = null; }
        return this.addOnce(handler, data, 0);
    };
    /**
     * Adds event listener with limited number of calls
     *
     * @param handler
     *        the event handler
     * @param [data]
     *        bound data (available in the handler by event.data)
     * @param [count]
     *        the limit of calls
     * @returns {Listener}
     *          the listener object
     */
    SingleEmitter.prototype.addOnce = function (handler, data, count) {
        if (data === void 0) { data = null; }
        if (count === void 0) { count = 1; }
        var listener = new Listener_1.default(handler, data, count);
        this.listeners.push(listener);
        return listener;
    };
    /**
     * Emits an event
     *
     * @param [event]
     *        an event instance or the dictionary of event fields
     * @returns {Event}
     *          target event object
     * @throws {Error}
     *         the specified event type is not found
     */
    SingleEmitter.prototype.emit = function (e) {
        if (e === void 0) { e = null; }
        var event;
        if (e instanceof Event_1.default) {
            event = e;
        }
        else {
            event = this.createEvent(e);
        }
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener.call(event);
            if (event.isPropagationStopped()) {
                break;
            }
        }
        return event;
    };
    /**
     * Clears all listeners of this event
     */
    SingleEmitter.prototype.clear = function () {
        this.listeners = [];
    };
    /**
     * Creates an event object
     *
     * @param [data]
     *        the dictionary of event field
     * @returns {Event}
     *          an instance of specified class for this event type
     * @throws {Error}
     *         the specified event type is not found
     */
    SingleEmitter.prototype.createEvent = function (data) {
        if (data === void 0) { data = null; }
        return new this.options.ClassEvent(this.options.type, data);
    };
    /**
     * Returns full type of event
     *
     * @returns {string}
     */
    SingleEmitter.prototype.getType = function () {
        return this.options.type;
    };
    /**
     * Returns short type (without prefix) of event
     *
     * @returns {string}
     */
    SingleEmitter.prototype.getShortType = function () {
        return this.options.shortType;
    };
    return SingleEmitter;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SingleEmitter;

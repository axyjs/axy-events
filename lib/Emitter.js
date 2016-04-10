"use strict";
var IOptions_1 = require("./IOptions");
var Event_1 = require("./Event");
var SingleEmitter_1 = require("./SingleEmitter");
/**
 * Event emitter aggregates a few types of events.
 */
var Emitter = (function () {
    /**
     * The constructor
     */
    function Emitter(options) {
        if (options === void 0) { options = null; }
        this.nested = {};
        this.options = IOptions_1.normalizeOptions(options);
    }
    /**
     * Adds event listener
     *
     * @param eventType
     *        the short event type (without the emitter prefix)
     * @param handler
     *        the event handler
     * @param [data]
     *        bound data (available in the handler by event.data)
     * @returns {Listener}
     *          the listener object
     * @throws {Error}
     *         the specified event type is not found
     */
    Emitter.prototype.add = function (eventType, handler, data) {
        if (data === void 0) { data = null; }
        return this.getSingle(eventType).add(handler, data);
    };
    /**
     * Adds event listener with limited number of calls
     *
     * @param eventType
     *        the short event type (without the emitter prefix)
     * @param handler
     *        the event handler
     * @param [data]
     *        bound data (available in the handler by event.data)
     * @param [count]
     *        the limit of calls
     * @returns {Listener}
     *          the listener object
     * @throws {Error}
     *         the specified event type is not found
     */
    Emitter.prototype.addOnce = function (eventType, handler, data, count) {
        if (data === void 0) { data = null; }
        if (count === void 0) { count = 1; }
        return this.getSingle(eventType).addOnce(handler, data, count);
    };
    /**
     * Emits an event
     *
     * @param eventType
     *        the short event type
     * @param [event]
     *        an event instance or the dictionary of event fields
     * @returns {Event}
     *          target event object
     * @throws {Error}
     *         the specified event type is not found
     */
    Emitter.prototype.emit = function (eventType, event) {
        if (event === void 0) { event = null; }
        return this.getSingle(eventType).emit(event);
    };
    /**
     * Creates an event object
     *
     * @param eventType
     *        the short event type
     * @param [data]
     *        the dictionary of event field
     * @returns {Event}
     *          an instance of specified class for this event type
     * @throws {Error}
     *         the specified event type is not found
     */
    Emitter.prototype.createEvent = function (eventType, data) {
        if (data === void 0) { data = null; }
        return this.getSingle(eventType).createEvent(data);
    };
    /**
     * Clears all listeners for all events
     */
    Emitter.prototype.clear = function () {
        var nested = this.nested;
        for (var k in nested) {
            if (nested.hasOwnProperty(k)) {
                nested[k].clear();
            }
        }
    };
    /**
     * Checks if a event type is exists in this emitter
     *
     * @param eventType
     *        the short event type
     * @returns {boolean}
     *          is the event type exist
     */
    Emitter.prototype.isExists = function (eventType) {
        var options = this.options;
        if (options.events.hasOwnProperty(eventType)) {
            return true;
        }
        return options.notFixed;
    };
    /**
     * Returns a signle emitter of specified event
     *
     * @param eventType
     *        the short event type
     * @returns {SingleEmitter}
     *          the single event emitter
     * @throws {Error}
     *         the specified event type is not found
     */
    Emitter.prototype.getSingle = function (eventType) {
        var nested = this.nested, options = this.options;
        if (!eventType) {
            if (!options.default) {
                throw new Error("No default event");
            }
            eventType = options.default;
        }
        if (!nested[eventType]) {
            var params = options.events[eventType];
            if (!params) {
                if (!options.notFixed) {
                    throw new Error("Event " + eventType + " not found");
                }
            }
            nested[eventType] = new SingleEmitter_1.default({
                type: options.prefix + eventType,
                shortType: eventType,
                ClassEvent: params ? params.ClassEvent : Event_1.default,
            });
        }
        return nested[eventType];
    };
    return Emitter;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Emitter;
